const Booking = require('../models/Booking');
const Court = require('../models/Court');

/**
 * Booking Service
 * Business logic for booking operations
 */

/**
 * Check if time slot is available
 */
const checkAvailability = async (courtId, date, startTime, endTime) => {
  // Parse times
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;
  
  // Find conflicting bookings
  const conflicts = await Booking.find({
    court: courtId,
    date: new Date(date),
    status: { $in: ['confirmed', 'pending'] },
    deletedAt: { $exists: false }
  });
  
  // Check for time overlap
  for (const booking of conflicts) {
    const [bStartHour, bStartMinute] = booking.startTime.split(':').map(Number);
    const [bEndHour, bEndMinute] = booking.endTime.split(':').map(Number);
    
    const bStartMinutes = bStartHour * 60 + bStartMinute;
    const bEndMinutes = bEndHour * 60 + bEndMinute;
    
    // Check for overlap with buffer
    const bufferMinutes = parseInt(process.env.BOOKING_BUFFER_MINUTES) || 15;
    
    const hasOverlap = (
      (startMinutes >= bStartMinutes - bufferMinutes && startMinutes < bEndMinutes + bufferMinutes) ||
      (endMinutes > bStartMinutes - bufferMinutes && endMinutes <= bEndMinutes + bufferMinutes) ||
      (startMinutes <= bStartMinutes && endMinutes >= bEndMinutes)
    );
    
    if (hasOverlap) {
      return {
        available: false,
        conflict: {
          bookingId: booking.bookingId,
          startTime: booking.startTime,
          endTime: booking.endTime
        }
      };
    }
  }
  
  return { available: true };
};

/**
 * Calculate booking price
 */
const calculatePrice = async (courtId, date, startTime, endTime, duration) => {
  const court = await Court.findById(courtId);
  
  if (!court) {
    throw new Error('Court not found');
  }
  
  const bookingDate = new Date(date);
  const dayOfWeek = bookingDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  
  // Check if it's peak hour
  let isPeakHour = false;
  if (court.pricing.peakHours && court.pricing.peakHours.length > 0) {
    const peakHour = court.pricing.peakHours.find(ph => ph.day === dayOfWeek);
    if (peakHour) {
      const [startHour] = startTime.split(':').map(Number);
      const [peakStartHour] = peakHour.startTime.split(':').map(Number);
      const [peakEndHour] = peakHour.endTime.split(':').map(Number);
      
      if (startHour >= peakStartHour && startHour < peakEndHour) {
        isPeakHour = true;
      }
    }
  }
  
  // Calculate rate
  const hourlyRate = isPeakHour && court.pricing.peakHourRate 
    ? court.pricing.peakHourRate 
    : court.pricing.hourlyRate;
  
  const subtotal = hourlyRate * duration;
  
  // Calculate platform fee
  const platformFeePercentage = parseFloat(process.env.PLATFORM_FEE_PERCENTAGE) || 10;
  const platformFee = (subtotal * platformFeePercentage) / 100;
  
  // Calculate tax (8% example)
  const taxPercentage = 8;
  const tax = ((subtotal + platformFee) * taxPercentage) / 100;
  
  const totalAmount = subtotal + platformFee + tax;
  
  return {
    hourlyRate,
    isPeakHour,
    subtotal: parseFloat(subtotal.toFixed(2)),
    platformFee: parseFloat(platformFee.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    currency: court.pricing.currency || 'USD'
  };
};

/**
 * Get available time slots for a court on a specific date
 */
const getAvailableSlots = async (courtId, date) => {
  const court = await Court.findById(courtId);
  
  if (!court) {
    throw new Error('Court not found');
  }
  
  const bookingDate = new Date(date);
  const dayOfWeek = bookingDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  
  const dayAvailability = court.availability[dayOfWeek];
  
  if (!dayAvailability || dayAvailability.closed) {
    return { available: false, slots: [], message: 'Court is closed on this day' };
  }
  
  // Get existing bookings for this date
  const bookings = await Booking.find({
    court: courtId,
    date: bookingDate,
    status: { $in: ['confirmed', 'pending'] },
    deletedAt: { $exists: false }
  }).sort({ startTime: 1 });
  
  // Generate all possible slots (30-minute intervals)
  const slots = [];
  const [openHour, openMinute] = dayAvailability.open.split(':').map(Number);
  const [closeHour, closeMinute] = dayAvailability.close.split(':').map(Number);
  
  const openMinutes = openHour * 60 + openMinute;
  const closeMinutes = closeHour * 60 + closeMinute;
  
  const minimumDuration = court.pricing.minimumBookingHours || 1;
  const slotInterval = 30; // 30-minute intervals
  
  for (let time = openMinutes; time < closeMinutes; time += slotInterval) {
    const hour = Math.floor(time / 60);
    const minute = time % 60;
    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    // Check if this slot is available
    const endTime = time + (minimumDuration * 60);
    const endHour = Math.floor(endTime / 60);
    const endMinute = endTime % 60;
    const endTimeString = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
    
    const { available } = await checkAvailability(courtId, date, timeString, endTimeString);
    
    if (available) {
      slots.push({
        startTime: timeString,
        endTime: endTimeString,
        available: true
      });
    }
  }
  
  return { available: true, slots, totalSlots: slots.length };
};

module.exports = {
  checkAvailability,
  calculatePrice,
  getAvailableSlots
};
