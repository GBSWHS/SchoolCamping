import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'
import Jumbotron from '../components/Jumbotron/Jumbotron'
import ListView from '../components/ListView/ListView'

const IndexPage = () =>
  <motion.div>
    <div id="top" />
    <Helmet
      title="스쿨캠핑 - 스쿨캠핑 예약을 쉽고 빠르게" />

    <Jumbotron />
    <ListView />
  </motion.div>

export default IndexPage
