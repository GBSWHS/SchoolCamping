import React, { createRef, MouseEventHandler, useState } from 'react'
import { motion } from 'framer-motion'
import * as style from './DeleteModal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { StaticImage } from 'gatsby-plugin-image'

const DeleteModal = ({ onFinish, data }: any) => {
  const ref = createRef<HTMLDivElement>()
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const onClickHandler: MouseEventHandler = (e) => {
    const target = e.target as HTMLDivElement
    if (target.className === style.modal) {
      onFinish()
    }
  }

  const onSubmit = async () => {
    const res = await fetch(`/api/camping/reserve?id=${data.id}&passcode=${password}`, {
      method: 'DELETE'
    }).then(res => res.json())
      .catch(err => setError(err.message))

    if (!res.success) {
      setError(res.message)
      return
    }

    setError('삭제되었습니다.')
    onFinish()
  }

  return (
    <motion.div
      ref={ref}
      onClick={onClickHandler}
      className={style.modal}
      initial={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -10 }}>

      <div className={style.front}>
        <div className={style.titlebar}>
          <h3>{data.mates.split(' ')[0]}님의 캠핑을 삭제합니다.</h3>
          <button onClick={onFinish}>
            <FontAwesomeIcon icon={faX}/>
          </button>
        </div>
        <div className={style.body}>
          <div>
            <p className={style.label}>비밀번호</p>
            <input
              type="password"
              value={password}
              className={style.input}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="여기를 눌러 입력하세요" />
          </div>
          <div>
            { error && <p>{error}</p> }
            <button className={style.submit} onClick={onSubmit}>
              삭제
            </button>
          </div>

          <StaticImage
            className={style.background}
            width={100}
            height={100}
            placeholder="blurred"
            alt="스쿨캠핑 로고"
            src="../../images/icon.png"/>
        </div>
      </div>
    </motion.div>
  )
}

export default DeleteModal
