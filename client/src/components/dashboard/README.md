# Dashboard Components Library

## Overview
A comprehensive collection of 15+ advanced dashboard components with modern animations, responsive design, and rich features for your indoor sports booking system.

## 🎨 Design Philosophy
- **Modern & Futuristic**: Gradient backgrounds, glassmorphism effects, and smooth animations
- **Highly Responsive**: Mobile-first design that scales beautifully
- **Theme Support**: Full dark mode compatibility
- **Performance Optimized**: Framer Motion animations with proper optimization
- **Accessible**: Keyboard navigation and ARIA support

## 📦 Components

### Layout Components

#### 1. **DashboardLayout**
Main dashboard wrapper with sidebar, header, and content areas.

**Features:**
- Responsive sidebar (collapsible on desktop, drawer on mobile)
- Sticky header with parallax effects
- Command palette integration (⌘K)
- Scroll-to-top button
- Floating particle effects
- Role-based routing

**Usage:**
```jsx
import { DashboardLayout } from '@/components/dashboard';

<DashboardLayout userRole="user" user={userData}>
  <Outlet />
</DashboardLayout>
```

#### 2. **DashboardHeader**
Advanced header with search, notifications, and user menu.

**Features:**
- Global search with suggestions
- Real-time notification dropdown
- User profile menu
- Theme toggle
- Command palette trigger
- Responsive design

#### 3. **DashboardSidebar**
Collapsible navigation sidebar with role-based menus.

**Features:**
- Role-specific menu items (admin/owner/user)
- Submenu support with animations
- Active route highlighting
- Collapse/expand functionality
- Badge notifications
- Tooltips for collapsed state

### Data Display Components

#### 4. **StatCard**
Animated statistics card with trend indicators.

**Features:**
- Gradient backgrounds
- Animated counter effect
- Trend indicators (up/down/neutral)
- Icon support
- Multiple size variants
- Hover effects

**Usage:**
```jsx
<StatCard
  title="Total Bookings"
  value="1,234"
  icon={FiCalendar}
  trend="up"
  trendValue="+12.5%"
  color="from-blue-500 to-cyan-500"
/>
```

#### 5. **DataTable**
Feature-rich data table with sorting, filtering, and pagination.

**Features:**
- Column sorting
- Global search
- Per-column filtering
- Pagination
- Row selection
- Bulk actions
- Row action menu
- Export to CSV
- Responsive design

**Usage:**
```jsx
<DataTable
  data={bookings}
  columns={[
    { key: 'id', label: 'ID' },
    { key: 'court', label: 'Court' },
    { key: 'date', label: 'Date' },
  ]}
  onEdit={(row) => handleEdit(row)}
  onDelete={(row) => handleDelete(row)}
  searchable
  paginated
/>
```

#### 6. **ChartCard**
Animated data visualization component.

**Features:**
- Multiple chart types (bar, line, area, donut)
- Animated entrance
- Gradient fills
- Interactive tooltips
- Legend support
- Grid lines

**Chart Types:**
```jsx
// Bar Chart
<ChartCard type="bar" data={chartData} title="Monthly Revenue" />

// Line Chart
<ChartCard type="line" data={chartData} title="Booking Trends" />

// Donut Chart
<ChartCard type="donut" data={chartData} title="Court Distribution" />

// Area Chart
<ChartCard type="area" data={chartData} title="User Growth" />
```

#### 7. **ActivityTimeline**
Real-time activity feed with grouping.

**Features:**
- Date grouping
- Activity type filtering
- Animated entries
- Icon-based types
- Time ago formatting
- Infinite scroll support
- Empty states

### Interactive Components

#### 8. **QuickActions**
Animated quick action buttons.

**Features:**
- Role-based actions
- Grid/List layouts
- Hover animations
- Icon rotation effects
- Gradient backgrounds

**Usage:**
```jsx
<QuickActions userRole="user" variant="grid" />
```

#### 9. **SearchBar**
Advanced search with suggestions and filters.

**Features:**
- Real-time suggestions
- Recent searches (localStorage)
- Keyboard navigation (↑↓, Enter)
- Categories/filters
- Trending searches
- Loading states

#### 10. **FilterPanel**
Multi-filter panel with various input types.

**Features:**
- Checkbox filters
- Radio buttons
- Range sliders
- Date pickers
- Active filter chips
- Reset functionality
- Collapsible sections

**Usage:**
```jsx
<FilterPanel
  filters={[
    {
      id: 'sport',
      label: 'Sport Type',
      type: 'checkbox',
      options: [
        { label: 'Basketball', value: 'basketball', count: 12 },
        { label: 'Tennis', value: 'tennis', count: 8 },
      ],
    },
    {
      id: 'price',
      label: 'Price Range',
      type: 'range',
      min: 0,
      max: 100,
      prefix: '$',
    },
  ]}
  activeFilters={activeFilters}
  onFilterChange={setActiveFilters}
/>
```

#### 11. **CommandPalette**
Keyboard-driven command interface (⌘K).

**Features:**
- Fuzzy search
- Keyboard navigation
- Recent commands
- Role-based commands
- Categories grouping
- Keyboard shortcuts

#### 12. **EmptyState**
Beautiful empty state component.

**Features:**
- Multiple presets (search, bookings, payments, etc.)
- Custom icons
- Animated entrance
- Action buttons
- Decorative elements

**Presets:**
```jsx
<EmptyState variant="bookings" action={handleBookCourt} />
<EmptyState variant="search" />
<EmptyState variant="error" />
```

### Progress & Status Components

#### 13. **ProgressTracker**
Milestone-based progress visualization.

**Features:**
- Horizontal/Vertical layouts
- Step states (completed/current/pending)
- Animated progress line
- Milestone details
- Custom icons per step
- Current step card

**Usage:**
```jsx
<ProgressTracker
  steps={[
    { title: 'Select Court', icon: FiGrid, description: 'Choose your court' },
    { title: 'Pick Time', icon: FiClock, description: 'Select time slot' },
    { title: 'Payment', icon: FiCreditCard, description: 'Complete payment' },
    { title: 'Confirmed', icon: FiCheck, description: 'Booking confirmed' },
  ]}
  currentStep={1}
  orientation="horizontal"
/>
```

#### 14. **NotificationCenter**
Comprehensive notification management.

**Features:**
- Category filtering
- Mark as read/unread
- Bulk actions
- Date grouping
- Search functionality
- Action buttons per notification
- Unread badges

### Container Components

#### 15. **DashboardWidget**
Customizable widget container.

**Features:**
- Expandable to fullscreen
- Refresh functionality
- Custom actions menu
- Loading states
- Draggable (with react-grid-layout)
- Remove functionality

**Usage:**
```jsx
<DashboardWidget
  title="Recent Bookings"
  subtitle="Last 7 days"
  icon={FiCalendar}
  onRefresh={fetchBookings}
  color="from-blue-500 to-cyan-500"
>
  <BookingsList />
</DashboardWidget>
```

## 🎨 Color Palette
The components use a consistent gradient color system:

- **Primary**: `from-blue-500 to-cyan-500`
- **Secondary**: `from-purple-500 to-pink-500`
- **Success**: `from-green-500 to-emerald-500`
- **Warning**: `from-yellow-500 to-orange-500`
- **Danger**: `from-red-500 to-pink-500`
- **Info**: `from-indigo-500 to-purple-500`

## ⌨️ Keyboard Shortcuts

- **⌘K / Ctrl+K**: Open command palette
- **⌘B / Ctrl+B**: Toggle sidebar
- **ESC**: Close modals/dropdowns
- **↑↓**: Navigate lists
- **Enter**: Select item
- **Tab**: Navigate form fields

## 🎭 Animation Features

All components use Framer Motion for smooth animations:
- **Entrance animations**: Fade in, slide up, scale
- **Hover effects**: Scale, lift, glow
- **Loading states**: Spin, pulse, shimmer
- **Page transitions**: Fade, slide
- **Micro-interactions**: Button press, icon rotation

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌙 Dark Mode

All components fully support dark mode using Tailwind's dark: prefix:
- Automatic color adjustments
- Proper contrast ratios
- Smooth transitions

## 🚀 Performance Tips

1. **Lazy load heavy components**: Use React.lazy() for charts
2. **Virtualize long lists**: Use react-window for tables with 100+ rows
3. **Optimize images**: Use next/image or similar
4. **Memoize expensive calculations**: Use useMemo/useCallback
5. **Debounce search inputs**: Prevent excessive API calls

## 📄 File Structure

```
client/src/components/dashboard/
├── ActivityTimeline.jsx       # Real-time activity feed
├── ChartCard.jsx              # Data visualization charts
├── CommandPalette.jsx         # Keyboard command interface
├── DashboardHeader.jsx        # Top navigation header
├── DashboardLayout.jsx        # Main layout wrapper
├── DashboardSidebar.jsx       # Side navigation menu
├── DashboardWidget.jsx        # Widget container
├── DataTable.jsx              # Advanced data table
├── EmptyState.jsx             # Empty state component
├── FilterPanel.jsx            # Multi-filter panel
├── NotificationCenter.jsx     # Notification management
├── ProgressTracker.jsx        # Progress milestone tracker
├── QuickActions.jsx           # Quick action buttons
├── SearchBar.jsx              # Advanced search
├── StatCard.jsx               # Statistics card
├── index.js                   # Component exports
└── README.md                  # This file
```

## 🔧 Dependencies

- **react**: ^18.0.0
- **react-router-dom**: ^6.0.0
- **framer-motion**: ^10.0.0
- **react-icons**: ^4.0.0
- **tailwindcss**: ^3.0.0

## 💡 Usage Example

```jsx
import {
  DashboardLayout,
  StatCard,
  QuickActions,
  ActivityTimeline,
  DataTable,
  ChartCard,
} from '@/components/dashboard';

function UserDashboard() {
  return (
    <DashboardLayout userRole="user" user={currentUser}>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Bookings"
            value="24"
            icon={FiCalendar}
            trend="up"
            trendValue="+12%"
          />
          <StatCard
            title="Total Spent"
            value="$1,240"
            icon={FiDollarSign}
            trend="up"
            trendValue="+8%"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions userRole="user" />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard type="bar" data={bookingData} title="Monthly Bookings" />
          <ChartCard type="line" data={spendingData} title="Spending Trend" />
        </div>

        {/* Activity Timeline */}
        <ActivityTimeline activities={recentActivities} />
      </div>
    </DashboardLayout>
  );
}
```

## 🎓 Best Practices

1. **Use appropriate components**: Don't use DataTable for 5 rows
2. **Provide meaningful empty states**: Help users understand what to do
3. **Show loading states**: Keep users informed during async operations
4. **Use consistent colors**: Stick to the predefined color palette
5. **Add proper ARIA labels**: Ensure accessibility
6. **Test responsive design**: Check on multiple screen sizes
7. **Optimize performance**: Profile and optimize heavy components

## 🐛 Troubleshooting

### Common Issues

**Issue**: Animations not working
**Solution**: Ensure framer-motion is installed and imported correctly

**Issue**: Dark mode colors not showing
**Solution**: Add `dark` class to root element or use ThemeProvider

**Issue**: Sidebar not collapsing
**Solution**: Check window width detection and state management

**Issue**: Table performance slow with many rows
**Solution**: Implement pagination or virtualization

## 📚 Additional Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Router Docs](https://reactrouter.com/)

## 🎉 Features Summary

✅ **15+ Production-ready components**
✅ **100+ Lines of code per component**
✅ **Advanced animations with Framer Motion**
✅ **Full dark mode support**
✅ **Responsive design (mobile/tablet/desktop)**
✅ **Keyboard navigation**
✅ **Role-based access control**
✅ **TypeScript-ready structure**
✅ **Comprehensive error handling**
✅ **Loading states**
✅ **Empty states**
✅ **Accessibility features**

## 🚀 Next Steps

1. Import components into your dashboard pages
2. Customize colors and themes
3. Add your business logic
4. Implement API integration
5. Add analytics tracking
6. Optimize for production

---

**Built with ❤️ for Indoor Sports Booking System**
