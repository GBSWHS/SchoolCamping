import { StaticImage } from 'gatsby-plugin-image'
import React, { Fragment } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faPencil, faScroll, faScrollTorah } from '@fortawesome/free-solid-svg-icons'
import * as style from './Jumbotron.module.css'
import { Link } from 'gatsby'

const Jumbotron = () =>
  <Fragment>
    <div className={style.bgouter}>
      <StaticImage
        className={style.background}
        alt="스쿨캠핑 전경"
        src="./images/1652532764760.jpg"
        placeholder="dominantColor" />
    </div>
    <div className={style.outer}>
      <div />
      <div className={style.inner}>
        <motion.div
          initial={{ rotate: '90deg' }}
          animate={{ rotate: '0deg' }}>
          <StaticImage
            placeholder="blurred"
            width={100}
            height={100}
            alt="스쿨캠핑 로고"
            src="../../images/icon.png" />
        </motion.div>

        <h1 className={style.title}>
          스쿨캠핑
        </h1>
        <p className={style.description}>
          스쿨캠핑 예약을 쉽고 빠르게
        </p>

        <Link to="/reserve">
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className={style.goSubmit}>
            <FontAwesomeIcon icon={faPencil} />
            &nbsp;
            신청하기
          </motion.button>
        </Link>
      </div>
      <Link to="#reserves" className={style.downArrow}>
        <FontAwesomeIcon icon={faArrowDown}/>
        예약 목록 보기
        <FontAwesomeIcon icon={faArrowDown}/>
      </Link>
    </div>
  </Fragment>

export default Jumbotron
