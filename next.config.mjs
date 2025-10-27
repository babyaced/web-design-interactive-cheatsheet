import nextra from 'nextra'
 
// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
})
 
// Export the final Next.js config with Nextra included
export default withNextra({
  // ... Add regular Next.js options here
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js', // emit JS so you can import the SVG as a component
      },
    },
  },
  env:{
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  }
})