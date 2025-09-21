/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      // Enable experimental features for v4
      experimental: {
        optimizeUniversalDefaults: true,
      }
    },
    autoprefixer: {},
  },
}

export default config
