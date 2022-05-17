import './src/styles/global.css'

import 'moment/locale/ko'
import '@fortawesome/react-fontawesome/'
import '@fortawesome/fontawesome-svg-core/styles.css'

import React from 'react'
import moment from 'moment'
import { config } from '@fortawesome/fontawesome-svg-core'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { AnimatePresence } from 'framer-motion'

config.autoAddCss = false

moment().locale('ko')

export const wrapPageElement = ({ element }) => (
  <GoogleReCaptchaProvider reCaptchaKey='6LeovNkfAAAAACrZ9t20HGmOti6sJjBGkcntGNLu'>
    <AnimatePresence exitBeforeEnter>
      {element}
    </AnimatePresence>
  </GoogleReCaptchaProvider>
)
