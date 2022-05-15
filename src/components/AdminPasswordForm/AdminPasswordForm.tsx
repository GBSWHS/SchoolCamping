import React, { Fragment, FormEvent, useState, useEffect, useRef } from 'react'

import * as style from './AdminPasswordForm.module.css'
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
    const res = await fetch('http://192.168.0.8:3001/api/auth/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    }).then(res => res.json())
      .catch(err => {
        setMessage('정보를 확인하는데 실패했습니다.')
        return err
      })
    if (!res.success) {
      setMessage(res.message)
      return
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
            <h1 className={style.title}>{message}</h1>
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
