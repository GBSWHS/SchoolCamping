import { StaticImage } from 'gatsby-plugin-image'
import React, { Fragment } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import * as style from './Jumbotron.module.css'

const Jumbotron = () =>
  <Fragment>
    <StaticImage
      className={style.background}
      alt="스쿨캠핑 전경"
      src="./images/1652532764760.jpg"
      placeholder="dominantColor" />

    <div className={style.outer}>
      <div className={style.inner}>
        <StaticImage
          placeholder="blurred"
          width={100}
          height={100}
          alt="스쿨캠핑 로고"
          src="../../images/icon.png" />

        <h1 className={style.title}>
          스쿨캠핑
        </h1>
        <p className={style.description}>
          스쿨캠핑 예약을 쉽고 빠르게
        </p>

        <motion.button
          className={style.goSubmit}>
          <FontAwesomeIcon icon={faPencil} />
          &nbsp;
          신청하기
        </motion.button>
      </div>
    </div>
  </Fragment>

export default Jumbotron
