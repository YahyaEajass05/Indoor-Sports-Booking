import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCreditCard,
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiShield,
  FiLock,
  FiDollarSign,
  FiCalendar,
  FiUser,
  FiMapPin,
  FiAlertCircle,
  FiStar,
  FiMoreVertical,
  FiX,
  FiZap,
  FiTrendingUp
} from 'react-icons/fi';
import { SiVisa, SiMastercard, SiAmericanexpress, SiPaypal, SiApplepay, SiGooglepay } from 'react-icons/si';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

const PaymentMethods = ({ paymentMethods = [], onAdd, onEdit, onDelete, onSetDefault }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  
  // Form state for new/edit payment method
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    cardType: 'visa'
  });

  const getCardIcon = (type) => {
    const icons = {
      visa: SiVisa,
      mastercard: SiMastercard,
      amex: SiAmericanexpress,
      paypal: SiPaypal,
      applepay: SiApplepay,
      googlepay: SiGooglepay
    };
    return icons[type?.toLowerCase()] || FiCreditCard;
  };

  const getCardGradient = (type) => {
    const gradients = {
      visa: 'from-blue-500 via-blue-600 to-blue-700',
      mastercard: 'from-red-500 via-orange-500 to-yellow-500',
      amex: 'from-cyan-500 via-blue-500 to-indigo-600',
      paypal: 'from-blue-600 via-blue-700 to-indigo-800',
      applepay: 'from-gray-700 via-gray-800 to-black',
      googlepay: 'from-green-500 via-blue-500 to-purple-600'
    };
    return gradients[type?.toLowerCase()] || 'from-gray-600 via-gray-700 to-gray-800';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2');
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditModalOpen && selectedMethod) {
      onEdit?.({ ...selectedMethod, ...formData });
      setIsEditModalOpen(false);
    } else {
      onAdd?.(formData);
      setIsAddModalOpen(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
      city: '',
      zipCode: '',
      cardType: 'visa'
    });
    setSelectedMethod(null);
  };

  const handleEdit = (method) => {
    setSelectedMethod(method);
    setFormData({
      cardNumber: method.cardNumber,
      cardholderName: method.cardholderName,
      expiryDate: method.expiryDate,
      cvv: '***',
      billingAddress: method.billingAddress || '',
      city: method.city || '',
      zipCode: method.zipCode || '',
      cardType: method.cardType
    });
    setIsEditModalOpen(true);
    setMenuOpen(null);
  };

  const handleDelete = (methodId) => {
    onDelete?.(methodId);
    setShowDeleteConfirm(null);
    setMenuOpen(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -90 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      rotateY: 5,
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.98
    }
  };

  const floatingIconVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Payment Methods</h2>
          <p className="text-gray-600 flex items-center gap-2">
            <FiShield className="text-green-500" />
            Your payment information is encrypted and secure
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 via-primary-600 to-purple-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
        >
          <FiPlus className="text-xl" />
          Add New Method
        </motion.button>
      </div>

      {/* Statistics Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-2xl border border-primary-200/50 mb-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FiCreditCard className="text-2xl text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Cards</p>
              <p className="text-2xl font-bold text-gray-900">{paymentMethods.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="text-2xl text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">
                {paymentMethods.reduce((sum, m) => sum + (m.transactions || 0), 0)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <FiZap className="text-2xl text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Default Method</p>
              <p className="text-2xl font-bold text-gray-900">
                {paymentMethods.find(m => m.isDefault)?.cardType?.toUpperCase() || 'None'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment Methods Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {paymentMethods.map((method, index) => {
          const CardIcon = getCardIcon(method.cardType);
          const gradient = getCardGradient(method.cardType);

          return (
            <motion.div
              key={method.id || index}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group"
              style={{ perspective: '1000px' }}
            >
              {/* Card */}
              <div className={`relative h-56 rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-2xl overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl transform translate-x-10 -translate-y-10" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl transform -translate-x-10 translate-y-10" />
                </div>

                {/* Chip */}
                <motion.div
                  animate={hoveredCard === index ? { rotateY: 360 } : {}}
                  transition={{ duration: 0.6 }}
                  className="absolute top-6 left-6 w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-lg shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #f4e89a 0%, #f0d66e 50%, #e3b936 100%)'
                  }}
                />

                {/* Card Type Icon */}
                <div className="absolute top-6 right-6">
                  <CardIcon className="text-4xl opacity-90" />
                </div>

                {/* Default Badge */}
                {method.isDefault && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-6 left-24 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    <FiStar className="text-yellow-300 fill-yellow-300" />
                    <span className="text-xs font-semibold">Default</span>
                  </motion.div>
                )}

                {/* Card Number */}
                <div className="absolute bottom-20 left-6 right-6">
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-mono tracking-wider"
                  >
                    {method.cardNumber}
                  </motion.p>
                </div>

                {/* Cardholder Name and Expiry */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <p className="text-xs opacity-70 mb-1">CARDHOLDER</p>
                    <p className="text-sm font-semibold uppercase">{method.cardholderName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs opacity-70 mb-1">EXPIRES</p>
                    <p className="text-sm font-semibold">{method.expiryDate}</p>
                  </div>
                </div>

                {/* Menu Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(menuOpen === index ? null : index);
                  }}
                  className="absolute top-6 right-6 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
                >
                  <FiMoreVertical />
                </button>

                {/* Actions Menu */}
                <AnimatePresence>
                  {menuOpen === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      className="absolute top-16 right-6 bg-white rounded-xl shadow-2xl overflow-hidden z-20 min-w-[160px]"
                    >
                      {!method.isDefault && (
                        <button
                          onClick={() => {
                            onSetDefault?.(method.id);
                            setMenuOpen(null);
                          }}
                          className="w-full px-4 py-3 text-left text-gray-700 hover:bg-primary-50 transition-colors flex items-center gap-2"
                        >
                          <FiStar className="text-primary-500" />
                          <span className="text-sm font-medium">Set Default</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(method)}
                        className="w-full px-4 py-3 text-left text-gray-700 hover:bg-primary-50 transition-colors flex items-center gap-2"
                      >
                        <FiEdit2 className="text-blue-500" />
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(method.id)}
                        className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <FiTrash2 />
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Card Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 glass p-4 rounded-xl border border-gray-200/50"
              >
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Last used</span>
                  <span className="font-semibold text-gray-900">{method.lastUsed || 'Never'}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2">
                  <span className="text-gray-600">Transactions</span>
                  <span className="font-semibold text-gray-900">{method.transactions || 0}</span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Add New Card Placeholder */}
        <motion.button
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsAddModalOpen(true)}
          className="h-56 glass rounded-2xl border-2 border-dashed border-primary-300 flex flex-col items-center justify-center gap-4 hover:border-primary-500 hover:bg-primary-50/50 transition-all group"
        >
          <motion.div
            variants={floatingIconVariants}
            animate="float"
            className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center group-hover:shadow-xl transition-shadow"
          >
            <FiPlus className="text-3xl text-white" />
          </motion.div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900 mb-1">Add Payment Method</p>
            <p className="text-sm text-gray-600">Quick and secure setup</p>
          </div>
        </motion.button>
      </motion.div>

      {/* Empty State */}
      {paymentMethods.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-12 rounded-2xl border border-gray-200/50 text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full mb-6">
            <FiCreditCard className="text-5xl text-primary-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Payment Methods Yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Add your first payment method to make booking courts quick and convenient
          </p>
          <Button
            variant="primary"
            size="lg"
            icon={FiPlus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Payment Method
          </Button>
        </motion.div>
      )}

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 glass p-6 rounded-2xl border border-green-200/50 bg-gradient-to-r from-green-50/50 to-emerald-50/50"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <FiLock className="text-2xl text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <FiShield className="text-green-600" />
              Your Security is Our Priority
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              All payment information is encrypted using bank-level security (PCI DSS compliant).
              We never store your CVV and use tokenization for all transactions.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Add/Edit Payment Method Modal */}
      <AnimatePresence>
        {(isAddModalOpen || isEditModalOpen) && (
          <Modal
            isOpen={isAddModalOpen || isEditModalOpen}
            onClose={() => {
              setIsAddModalOpen(false);
              setIsEditModalOpen(false);
              resetForm();
            }}
            title={isEditModalOpen ? 'Edit Payment Method' : 'Add Payment Method'}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Type</label>
                <select
                  name="cardType"
                  value={formData.cardType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleInputChange}
                  placeholder="JOHN DOE"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent uppercase"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="***"
                    maxLength="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required={!isEditModalOpen}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
                <input
                  type="text"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    resetForm();
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  icon={FiCheck}
                  className="flex-1"
                >
                  {isEditModalOpen ? 'Update' : 'Add'} Card
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <Modal
            isOpen={!!showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(null)}
            title="Delete Payment Method"
          >
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <FiAlertCircle className="text-3xl text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Are you sure?</h3>
              <p className="text-gray-600 mb-6">
                This payment method will be permanently deleted. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  icon={FiTrash2}
                  onClick={() => handleDelete(showDeleteConfirm)}
                  className="flex-1"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PaymentMethods;
