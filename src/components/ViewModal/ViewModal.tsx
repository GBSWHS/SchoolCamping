import React, { createRef, MouseEventHandler } from 'react'
import { motion } from 'framer-motion'
import * as style from './ViewModal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import { StaticImage } from 'gatsby-plugin-image'

const ViewModal = ({ onFinish, data }: any) => {
  const ref = createRef<HTMLDivElement>()

  const onClickHandler: MouseEventHandler = (e) => {
    const target = e.target as HTMLDivElement
    if (target.className === style.modal) {
      onFinish()
    }
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
          <h3>{data.mates.split(' ')[0]}님의 캠핑</h3>
          <button onClick={onFinish}>
            <FontAwesomeIcon icon={faX}/>
          </button>
        </div>
        <div className={style.body}>
          <div>
            <p>예약자 목록</p>
            <ul className={style.list}>
              {data.mates.split(' ').map((v: string, i: number) => (
                <li key={i}>{v}{i < 1 && '(대표)'}</li>
              ))}
            </ul>
          </div>
          <div>
            <p>동행 선생님</p>
            <ul className={style.list}>
              <li>{data.teacher} 선생님</li>
            </ul>
          </div>
          <div>
            <p>예약 날짜</p>
            <i>{moment(data.reservedAt).format('YYYY년 MM월 DD일 (dd)')}</i>
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

export default ViewModal
