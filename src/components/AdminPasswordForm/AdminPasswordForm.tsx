import React, { Fragment, FormEvent, useState, useEffect, useRef } from 'react'

import * as style from './AdminPasswordForm.module.css'
import { StaticImage } from 'gatsby-plugin-image'
import { motion } from 'framer-motion'

interface Props {
  onFinished: () => void
}

const AdminPasswordForm = ({ onFinished }: Props) => {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('관리자 비밀번호를 입력해주세요.')
  const passwordInput = useRef<HTMLInputElement | null>(null)

  useEffect(() => passwordInput.current?.focus(), [])

  const handleSubmit = async () => {
    setMessage('정보 확인중입니다.')
    const res = await fetch('https://mocki.io/v1/2babbadb-d54c-4c4d-8fbb-152742f18bb1', {
      method: 'GET'
    }).then(res => res.json())
    if (!res.success) {
      setMessage(res.message)
    }

    onFinished()
  }

  return (
    <Fragment>
      <div className={style.outer}>
        <div className={style.inner}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='items-center text-center'>
            <div className={style.title}>
              <StaticImage
                alt="Admin Password Form"
                src="./images/lockemoji.svg"
                />
              <h1>{message}</h1>
            </div>
            <input
              className={style.input}
              type='password'
              value={password}
              ref={passwordInput}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}/>
          </motion.div>
        </div>
      </div>
    </Fragment>
  )
}

export default AdminPasswordForm
