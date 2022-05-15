import React from 'react'
import { motion } from 'framer-motion'
import * as style from './ViewModal.module.css'

const ViewModal = ({ onFinish, data }: any) =>
  <motion.div
    onClick={onFinish}
    className={style.modal}
    initial={{ opacity: 0, translateY: -10 }}
    animate={{ opacity: 1, translateY: 0 }}
    exit={{ opacity: 0, translateY: -10 }}>

    {JSON.stringify(data)}

  </motion.div>

export default ViewModal
