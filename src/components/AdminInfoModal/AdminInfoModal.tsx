import React from 'react'
import { motion } from 'framer-motion'
import * as style from './AdminInfoModal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const AdminInfoModal = ({ onFinish, data }: any) =>
  <motion.div
    onClick={(e: any) => console.log(e.target.classname)}
    className={style.modal}
    initial={{ opacity: 0, translateY: -10 }}
    animate={{ opacity: 1, translateY: 0 }}
    exit={{ opacity: 0, translateY: -10 }}>
    <div className={style.window}>
      <div className={style.head}>
        <h1>{data.id}번째 캠핑</h1>
        <FontAwesomeIcon icon={faClose} onClick={onFinish} />
      </div>
      <div className={style.bottom}>
        hi
      </div>
    </div>
  </motion.div>

export default AdminInfoModal
