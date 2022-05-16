import './src/styles/global.css'
import 'moment/locale/ko'

import React from 'react'
import moment from 'moment'
import TopNav from './src/components/TopNav/TopNav'
import { AnimatePresence } from 'framer-motion'

moment().locale('ko')

export const wrapPageElement = ({ element }) => (
  <AnimatePresence exitBeforeEnter>
    <TopNav />
    {element}
  </AnimatePresence>
)
