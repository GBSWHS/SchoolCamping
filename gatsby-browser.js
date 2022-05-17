import './src/styles/global.css'

import 'moment/locale/ko'
import '@fortawesome/react-fontawesome/'
import '@fortawesome/fontawesome-svg-core/styles.css'

import React from 'react'
import moment from 'moment'
import { config } from '@fortawesome/fontawesome-svg-core'
import { AnimatePresence } from 'framer-motion'

config.autoAddCss = false

moment().locale('ko')

export const wrapPageElement = ({ element }) => (
  <AnimatePresence exitBeforeEnter>
    {element}
  </AnimatePresence>
)
