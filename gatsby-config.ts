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
        name: '스쿨캠핑 - 스쿨캠핑 예약을 쉽고 빠르게',
        short_name: '스쿨캠핑',
        start_url: '/',
        background_color: '#212121',
        theme_color: '#212121',
        display: 'standalone',
        icon: 'src/images/icon.png',
        scope: '/',
        orientation: 'portrait',
        description: '경북소프트웨어고 스쿨캠핑 예약을 위한 웹 애플리케이션입니다.',
        lang: 'ko-KR',
        screenshots: [
          {
            src: 'screenshots/screenshot1.webp',
            sizes: '1080x2171',
            type: 'image/webp',
            platform: 'narrow',
            label: '홈 화면'
          },
          {
            src: 'screenshots/screenshot2.webp',
            sizes: '1080x2171',
            type: 'image/webp',
            platform: 'narrow',
            label: '스쿨캠핑 예약 화면'
          },
          {
            src: 'screenshots/screenshot3.webp',
            sizes: '1080x2171',
            type: 'image/webp',
            platform: 'narrow',
            label: '예약 정보 목록 및 조회 화면'
          },
          {
            src: 'screenshots/screenshot4.webp',
            sizes: '1080x2171',
            type: 'image/webp',
            platform: 'narrow',
            label: '관리자 화면'
          }
        ]
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
