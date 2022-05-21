import React, { Fragment, FormEvent, useState, useEffect, useRef } from 'react'

import * as style from './AdminPasswordForm.module.css'
import { motion } from 'framer-motion'
import useOffline from '../../hooks/useOffline'

interface Props {
  onFinished: () => void
}

const AdminPasswordForm = ({ onFinished }: Props) => {
  const isOffline = useOffline()
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('관리자 비밀번호를 입력해주세요.')

  if (isOffline) {
    return (
      <div className={style.outer}>
        오프라인 모드에서는 관리자메뉴를 사용 할 수 없습니다.<br />
        학교 교내 WIFI에 연결되어 있는지 확인하세요.
      </div>
    )
  }

  const passwordInput = useRef<HTMLInputElement | null>(null)

  useEffect(() => passwordInput.current?.focus(), [])

  const handleSubmit = async () => {
    setMessage('정보 확인중입니다.')
    const res = await fetch('/api/auth/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    }).then(res => res.json())
      .catch(_ => {
        setMessage('정보를 확인하는데 실패했습니다.')
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
