import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'SchoolCamping',
    siteUrl: 'https://www.yourdomain.tld'
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-pnpm'
  ]
}

export default config
