export default {
  colors: {
    text: '#000411',        // Corrected hex code (6 digits or 3 digits)
    background: '#fff',
    primary: '#160C28',
    logo: '#AB7823',
    secondary: '#3f3f46',  // Added secondary color -  good practice
    gray: [              // Added gray scale (VERY IMPORTANT)
      '#f8f9fa',
      '#e9ecef',
      '#dee2e6',
      '#ced4da',
      '#adb5bd',
      '#6c757d',
      '#495057',
      '#343a40',
      '#212529'
    ],
    white: '#fff',         // Explicitly define white
  },
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Merriweather, Georgia, serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96], // Define font sizes
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512], // Define spacing (padding/margin)
  sizes: {
    container: 1024,
  },
  radii: {  // VERY IMPORTANT - defines border radii
    md: '4px',
    xl: '12px',
    full: '9999px',
  },
  shadows: { // VERY IMPORTANT - defines box shadows
        sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        xl: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        '0 4px 8px rgba(0,0,0,0.1)': '0 4px 8px rgba(0,0,0,0.1)' //the shadow you use
  },
  styles: {
    slide: { // You can keep this if you're using it elsewhere
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    root: {  // Applies to the root element (usually <html>)
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
  },
};