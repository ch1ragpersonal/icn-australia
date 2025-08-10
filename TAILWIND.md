# Tailwind CSS Implementation Guide

## Overview

This project has been refactored to use Tailwind CSS for styling. Tailwind CSS is a utility-first CSS framework that allows for rapid UI development with pre-defined utility classes.

## Setup

The following packages have been installed:
- `tailwindcss`
- `postcss`
- `autoprefixer`
- `gatsby-plugin-postcss`

## Configuration Files

- **tailwind.config.js**: Contains Tailwind configuration including custom colors
- **postcss.config.js**: PostCSS configuration for Tailwind
- **src/styles/global.css**: Contains Tailwind directives
- **src/styles/vendor-overrides.css**: Contains overrides for third-party libraries

## Color Scheme

The color scheme has been aligned with the existing theme-ui configuration:

```js
// Primary colors
primary: '#3490dc',    // Blue
secondary: '#ffed4a',  // Yellow
danger: '#e3342f',     // Red

// Legacy ICN Australia colors
'icn-green': '#004225',
'icn-gold': '#FFB000',
```

## Usage Guidelines

### Basic Utility Classes

- Use utility classes directly in JSX elements:
  ```jsx
  <div className="p-4 text-center bg-white rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-icn-green mb-4">Title</h1>
    <p className="text-gray-700">Content</p>
  </div>
  ```

### Responsive Design

- Use responsive prefixes for different screen sizes:
  ```jsx
  <div className="w-full md:w-1/2 lg:w-1/3">
    {/* Full width on mobile, half width on medium screens, one-third on large screens */}
  </div>
  ```

### Hover, Focus, and Other States

- Use state variants:
  ```jsx
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Button
  </button>
  ```

### Custom Components

For frequently used UI patterns, consider creating reusable components with consistent Tailwind classes.

## Transition from Theme UI

Theme UI is still configured in the project, but new components should use Tailwind CSS. The Theme UI configuration has been updated to align with Tailwind colors for consistency.

## CSS Files

- **global.css**: Contains Tailwind directives
- **vendor-overrides.css**: Contains overrides for third-party libraries like Swiper

## Best Practices

1. **Consistency**: Use the same spacing, colors, and typography scales across the site
2. **Mobile-first**: Design for mobile first, then use responsive prefixes for larger screens
3. **Avoid custom CSS**: Try to use Tailwind utilities before writing custom CSS
4. **Component extraction**: Extract repeated patterns into reusable components

## Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)