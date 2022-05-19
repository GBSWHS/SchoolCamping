import React, { createRef, FormEvent, MouseEventHandler, useState } from 'react'
import moment from 'moment'
import { motion } from 'framer-motion'
import * as style from './AdminEditModal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-datepicker/dist/react-datepicker.css'
import { faPlus, faTrashAlt, faX } from '@fortawesome/free-solid-svg-icons'
import ReactDatePicker, { CalendarContainer } from 'react-datepicker'
import { StaticImage } from 'gatsby-plugin-image'

const AdminEditModal = ({ onFinish, data }: any) => {
  const ref = createRef<HTMLDivElement>()
  const [mates, setMates] = useState<string[]>(data.mates.split(' '))
  const [teacher, setTeacher] = useState<string>(data.teacher)
  const [date, setDate] = useState<Date>(new Date(data.reservedAt))
  const [error, setError] = useState<string>('')

  const onClickHandler: MouseEventHandler = (e) => {
    const target = e.target as HTMLDivElement
    if (target.className === style.modal) {
      onFinish()
    }
  }

  const addMate = () => {
    setMates(mates.concat(''))
  }

  const setMate = (i: number) => (e: FormEvent<HTMLInputElement>) => {
    mates[i] = (e.target as HTMLInputElement).value
    setMates([...mates])
  }

  const deleteMate = (i: number) => () => {
    mates.splice(i, 1)
    setMates([...mates])
  }

  const onSubmit = async () => {
    const res = await fetch('/api/admin/reserve?id=' + data.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teacher,
        mates: mates.join(' '),
        date: moment(date).format('YYYY-MM-DD')
      })
    }).then(res => res.json())
      .catch(err => setError(err.message))

    if (!res.success) {
      setError(res.message)
      return
    }

    setError('수정되었습니다.')
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
          <h3>{data.mates.split(' ')[0]}님의 캠핑을 수정합니다.</h3>
          <button onClick={onFinish}>
            <FontAwesomeIcon icon={faX}/>
          </button>
        </div>
        <div className={style.body}>
          <div>
            <p className={style.label}>예약자 목록</p>
            {mates.map((v, i) => (
              <div key={i} className={style.mateList}>
                <input
                  value={v}
                  onInput={setMate(i)}
                  className={style.input}
                  placeholder="여기를 눌러 예약자 이름을 작성하세요." />
                <button
                  className={style.deletemate}
                  onClick={deleteMate(i)}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}/>
                </button>
               </div>
            ))}
            {mates.length < 6 &&
              <button className={style.addmate} onClick={addMate}>
                <FontAwesomeIcon icon={faPlus} />
                예약자 추가
              </button>
            }
          </div>
          <div>
            <p className={style.label}>동행 선생님</p>
            <ul>
              <li>
                <input
                  onInput={(e) =>
                    setTeacher((e.target as HTMLInputElement).value)}
                  value={teacher}
                  placeholder="여기를 눌러 선생님 이름을 작성하세요."
                  className={style.input} />
                선생님
              </li>
            </ul>
          </div>
          <div>
            <p className={style.label}>예약 날짜</p>
            <ReactDatePicker
              dateFormat="yyyy-MM-dd"
              selected={date}
              onChange={(date) => setDate(date!)}
              className={style.input}/>
          </div>
          <div>
            { error && <p>{error}</p> }
            <button className={style.submit} onClick={onSubmit}>
              저장
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

export default AdminEditModal
