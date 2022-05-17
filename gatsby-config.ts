import type { GatsbyConfig } from 'gatsby'

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'SchoolCamping',
    siteUrl: 'https://camping.gbsw.hs.kr'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: 'schoolcamping-frontend',
        protocol: 'https',
        hostname: 'camping.gbsw.hs.kr'
      }
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-pnpm',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'SchoolCamping',
        short_name: '스쿨캠핑',
        start_url: '/',
        background_color: '#fafafa',
        theme_color: '#212121',
        display: 'standalone',
        icon: 'src/images/icon.png'
      }
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/*']
      }
    },
    'gatsby-plugin-react-helmet'
  ]
}

export default config
