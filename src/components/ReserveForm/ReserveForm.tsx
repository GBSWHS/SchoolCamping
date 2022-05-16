import { faArrowRight, faHome, faPaperPlane, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StaticImage } from 'gatsby-plugin-image'
import React, { FormEvent, FormEventHandler, Fragment, KeyboardEventHandler, useState } from 'react'
import * as style from './ReserveForm.module.css'
import ReactDatePicker from 'react-datepicker'
import { Link } from 'gatsby'

const ReserveForm = () => {
  const [step, setStep] = useState(0)
  const [error, setError] = useState('')
  const [teacher, setTeacher] = useState('')
  const [mates, setMates] = useState<string[]>([])
  const [password, setPassword] = useState('')
  const [date, setDate] = useState(new Date())

  const leaderConfirm = () => {
    if (!mates[0]?.trim()) {
      setError('값을 입력해주세요.')
      return
    }

    setError('')
    setStep(1)
  }

  const onEnterLeader: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      leaderConfirm()
    }
  }

  const teacherConfirm = () => {
    if (!teacher.trim()) {
      setError('값을 입력해주세요.')
      return
    }

    setError('')
    setStep(3)
  }

  const onEnterTeacher: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      teacherConfirm()
    }
  }

  const onChangeTeacher: FormEventHandler = (e) => {
    setTeacher((e.target as HTMLInputElement).value)
  }

  const onChangeLeader: FormEventHandler = (e) => {
    mates[0] = (e.target as HTMLInputElement).value
    setMates([...mates])
  }

  const passwordConfirm = () => {
    if (!password.trim()) {
      setError('값을 입력해주세요.')
      return
    }

    if (password.trim().length < 4) {
      setError('5자 이상입력해 주세요.')
      return
    }

    setError('')
    setStep(4)
  }

  const onEnterPassword: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      passwordConfirm()
    }
  }

  const onChangePassword: FormEventHandler = (e) => {
    setPassword((e.target as HTMLInputElement).value)
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

  const onSubmit = () => {
    setStep(5)
  }

  return (
    <Fragment>
      <div className={style.bgouter}>
        <StaticImage
          className={style.background}
          alt="스쿨캠핑 전경"
          src="./images/1650976973855-3.jpg"
          placeholder="dominantColor" />
      </div>
      <motion.div
        initial={{ opacity: 0, translateY: 50 }}
        animate={{ opacity: 1, translateY: 0 }}
        className={style.outer}>
        <div className={style.inner}>
          <h1 className={style.title}>스쿨캠핑 예약</h1>
          {step === 0 && (
            <>
              <p>대표자 이름을 입력해 주세요.</p>
              <input
                placeholder="대표자"
                className={style.input}
                onKeyDown={onEnterLeader}
                onChange={onChangeLeader}/>
              {error && <p>{error}</p>}
              <button onClick={leaderConfirm}>
                다음&nbsp;
                <FontAwesomeIcon icon={faArrowRight}/>
              </button>
            </>
          )}

          {step === 1 && (
            <>
              <p>참가자 목록을 작성해 주세요.</p>
              {mates.slice(1).map((v, i) => (
                <div key={i} className={style.mateList}>
                  <input
                    value={v}
                    onInput={setMate(i + 1)}
                    className={style.input}
                    placeholder="여기를 눌러 예약자 이름을 작성하세요." />
                  <button
                    className={style.deletemate}
                    onClick={deleteMate(i + 1)}>
                    <FontAwesomeIcon
                      icon={faTrashAlt}/>
                  </button>
                 </div>
              ))}
              {mates.length < 6 &&
                <button className={style.addmate} onClick={addMate}>
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp;참가자 추가
                </button>
              }
              <button onClick={() => setStep(2)}>
                다음&nbsp;
                <FontAwesomeIcon icon={faArrowRight}/>
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <p>동행하는 선생님 성함을 입력해 주세요.</p>
              <input
                placeholder="동행교사"
                className={style.input}
                onKeyDown={onEnterTeacher}
                onChange={onChangeTeacher}/>
              {error && <p>{error}</p>}
              <button onClick={teacherConfirm}>
                다음&nbsp;
                <FontAwesomeIcon icon={faArrowRight}/>
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <p>예약 변경/취소 시 사용할 비밀번호를 입력해 주세요.</p>
              <input
                type="password"
                placeholder="비밀번호"
                className={style.input}
                onKeyDown={onEnterPassword}
                onChange={onChangePassword}/>
              {error && <p>{error}</p>}
              <button onClick={passwordConfirm}>
                다음&nbsp;
                <FontAwesomeIcon icon={faArrowRight}/>
              </button>
            </>
          )}

          {step === 4 && (
            <>
              <p>스쿨캠핑 날짜를 선택해 주세요.</p>
              <ReactDatePicker
                dateFormat="yyyy-MM-dd"
                selected={date}
                onChange={(date) => setDate(date!)}
                className={style.input}/>
              <button onClick={onSubmit}>
                제출&nbsp;
                <FontAwesomeIcon icon={faPaperPlane}/>
              </button>
            </>
          )}

          {step === 5 && (
            <>
              <p>예약이 완료 되었습니다.</p>
              <Link to="/">
                돌아가기&nbsp;
                <FontAwesomeIcon icon={faHome}/>
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </Fragment>
  )
}
export default ReserveForm