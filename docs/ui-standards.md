# Admin Interface UI/UX Standards

## Overview
This document defines the design standards and patterns for the Admin Dashboard to ensure consistency, usability, and maintainability across all interfaces.

## Color Palette

### Primary Colors
- **Brand Navy**: `#1A2D40` - Primary brand color, main buttons, headers
- **Brand Brown**: `#D4A373` - Accent color, focus states, highlights  
- **Cream**: `#FDFBF5` - Background color for sections

### Status Colors
- **Success Green**: `#10B981` - Success messages, positive actions
- **Error Red**: `#EF4444` - Error messages, destructive actions
- **Warning Orange**: `#F59E0B` - Warning messages, alerts
- **Info Blue**: `#3B82F6` - Information messages, neutral actions

### Neutral Colors
- **Gray 50**: `#F9FAFB` - Light backgrounds, table headers
- **Gray 100**: `#F3F4F6` - Card backgrounds, subtle dividers
- **Gray 200**: `#E5E7EB` - Borders, inactive elements
- **Gray 400**: `#9CA3AF` - Placeholder text, icons
- **Gray 600**: `#4B5563` - Secondary text
- **Gray 800**: `#1F2937` - Primary text
- **Gray 900**: `#111827` - Headers, emphasized text

## Typography

### Font Hierarchy
- **H1 (Page Titles)**: `text-3xl font-bold text-gray-900` (Dashboard main title)
- **H2 (Section Headers)**: `text-xl font-semibold text-gray-800` (Card titles)
- **H3 (Subsection)**: `text-lg font-medium text-gray-700` (Form sections)
- **Body Text**: `text-sm text-gray-600` (Regular content)
- **Small Text**: `text-xs text-gray-500` (Meta information, timestamps)

## Button Standards

### Button Variants
```tsx
// Primary Action - Main CTA, form submissions
<Button variant="default">Save Changes</Button>

// Secondary Action - Cancel, alternative actions  
<Button variant="outline">Cancel</Button>

// Destructive Action - Delete, remove operations
<Button variant="destructive">Delete Item</Button>

// Neutral Action - Additional options
<Button variant="secondary">View Details</Button>

// Link Action - Navigation, less emphasis
<Button variant="link">Learn More</Button>
```

### Button Sizes
```tsx
// Default size for most actions
<Button size="default">Standard Button</Button>

// Small size for compact interfaces, table actions
<Button size="sm">Small Button</Button>
```

### Loading States
```tsx
// Always provide loading states with appropriate text
{isPending ? 'Saving...' : 'Save Changes'}
```

## Form Standards

### Input Components
- **Standard Input**: Use `Input` component with consistent padding and focus states
- **Textarea**: Use `Textarea` for multi-line content with appropriate rows
- **Select**: Use `Select` component for dropdown choices
- **Rich Text**: Use `RichTextEditor` for content that needs formatting

### Form Layout
```tsx
<form className="space-y-6">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Field Label
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <Input />
    {description && (
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    )}
    {error && (
      <p className="text-red-500 text-sm mt-1">{error}</p>
    )}
  </div>
</form>
```

### Validation and Error States
- **Required fields**: Red asterisk (*) next to label
- **Error messages**: Red text below input with specific error
- **Success states**: Green border and checkmark for successful validation
- **Field descriptions**: Gray helper text below input

## Table Standards

### Table Structure
```tsx
<DataTable 
  columns={columns} 
  data={data} 
  totalCount={totalCount} 
  pageCount={pageCount} 
  pageSize={pageSize} 
/>
```

### Table Features
- **Sorting**: Clickable headers with sort indicators
- **Search**: Global search input above table
- **Pagination**: Previous/Next with page numbers
- **Row Actions**: Edit/Delete buttons in consistent positions
- **Empty States**: Centered message for no data

## Modal Standards

### Modal Structure
```tsx
<Modal isOpen={isOpen} onClose={onClose} title="Modal Title">
  <div className="space-y-4">
    {/* Modal content */}
  </div>
  <div className="flex justify-end space-x-4 pt-4 border-t">
    <Button variant="outline" onClick={onClose}>Cancel</Button>
    <Button onClick={onConfirm}>Confirm</Button>
  </div>
</Modal>
```

### Modal Guidelines
- **ESC key**: Always closes modal
- **Click outside**: Closes modal
- **Title**: Clear, descriptive title
- **Actions**: Right-aligned with Cancel on left, Primary on right
- **Loading states**: Disable buttons and show loading text during actions

## Card Standards

### Card Structure
```tsx
<Card className="hover:shadow-md transition-shadow">
  <CardHeader>
    <CardTitle className="flex items-center space-x-2">
      <FontAwesomeIcon icon={icon} className="text-gray-600" />
      <span>Card Title</span>
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

### Card Guidelines
- **Consistent padding**: Use CardHeader and CardContent for structure
- **Hover effects**: Subtle shadow increase on hover
- **Icons**: Consistent icon usage in headers
- **Transitions**: Smooth hover and state transitions

## Toast Notifications

### Toast Types and Usage
```tsx
// Success - Completed actions
toast.success('Item saved successfully!');

// Error - Failed actions, validation errors
toast.error('Failed to save item. Please try again.');

// Warning - Important notices
toast.warning('This action cannot be undone.');

// Info - General information
toast.info('Changes have been auto-saved.');
```

### Toast Guidelines
- **Position**: Top-right corner of screen
- **Duration**: 4 seconds for most messages
- **Actions**: Clear, actionable messages
- **Persistence**: Errors stay longer, success messages shorter

## Layout Standards

### Page Structure
```tsx
<>
  <PageHeader title="Page Title" subtitle="Optional description">
    {/* Action buttons */}
  </PageHeader>
  
  {/* Main content */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Content sections */}
  </div>
</>
```

### Spacing and Layout
- **Section spacing**: `space-y-8` between major sections
- **Card spacing**: `gap-6` for card grids
- **Form spacing**: `space-y-6` for form fields
- **Button spacing**: `space-x-4` for button groups

## Icon Standards

### Icon Library
- **Font Awesome**: Primary icon library
- **Consistent sizing**: Use appropriate size classes (`text-sm`, `text-lg`, etc.)
- **Color consistency**: Match icon colors with text colors
- **Semantic usage**: Icons should reinforce meaning, not distract

### Common Icons
- **Products**: `faBoxOpen`
- **Categories**: `faTags`
- **Partners**: `faHandshake`
- **Contact**: `faEnvelope`
- **Content**: `faFileAlt`
- **Edit**: `faEdit`
- **Delete**: `faTrash`
- **Add**: `faPlus`

## Responsive Design

### Breakpoints
- **Mobile**: `< 768px` - Single column layouts
- **Tablet**: `768px - 1024px` - Two column layouts
- **Desktop**: `> 1024px` - Three+ column layouts

### Grid Systems
```tsx
// Responsive grid patterns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Content with sidebar
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
```

## Accessibility Standards

### Key Requirements
- **Keyboard navigation**: All interactive elements accessible via keyboard
- **ARIA labels**: Proper labeling for screen readers
- **Color contrast**: Minimum 4.5:1 ratio for text
- **Focus indicators**: Visible focus states for all interactive elements
- **Alt text**: Descriptive alt text for images and icons

### Implementation
```tsx
// Proper button accessibility
<Button aria-label="Delete item" onClick={onDelete}>
  <FontAwesomeIcon icon={faTrash} />
</Button>

// Form accessibility
<label htmlFor="email" className="sr-only">Email Address</label>
<Input id="email" type="email" placeholder="Enter email" />
```

## Animation and Transitions

### Standard Transitions
- **Hover effects**: `transition-colors`, `transition-shadow`
- **Modal animations**: Fade in/out with scale
- **Loading states**: Smooth opacity changes
- **Button states**: Color and shadow transitions

### Performance Guidelines
- **CSS transitions**: Prefer CSS over JavaScript animations
- **Duration**: Keep animations short (200-300ms)
- **Easing**: Use `ease-in-out` for most transitions
- **Reduced motion**: Respect user preferences

## Data Display Standards

### Status Indicators
```tsx
// Status badges with consistent styling
<span className={`px-2 py-1 rounded-full text-xs font-medium ${
  isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
}`}>
  {isActive ? 'Active' : 'Inactive'}
</span>
```

### Date and Time Display
- **Format**: Use Vietnamese locale for dates
- **Relative time**: "2 giờ trước" for recent items
- **Consistent formatting**: DD/MM/YYYY HH:mm for timestamps

## Error Handling Standards

### Error States
- **Form validation**: Inline errors below fields
- **API errors**: Toast notifications for user feedback
- **Loading errors**: Error boundaries with retry options
- **Network errors**: Graceful degradation with retry mechanisms

### User Feedback
- **Loading states**: Visual indicators for all async operations
- **Empty states**: Helpful messages and actions for empty data
- **Success feedback**: Confirmation of completed actions
- **Error recovery**: Clear paths to resolve errors

## Implementation Checklist

### Before Creating New Components
- [ ] Check existing UI components for reusability
- [ ] Follow established color palette
- [ ] Use consistent spacing and typography
- [ ] Implement proper accessibility features
- [ ] Include loading and error states
- [ ] Test responsive behavior
- [ ] Add appropriate animations/transitions

### Component Review Criteria
- [ ] Consistent with design system
- [ ] Accessible to all users
- [ ] Responsive across devices
- [ ] Performant animations
- [ ] Clear user feedback
- [ ] Proper error handling
- [ ] Keyboard navigation support 