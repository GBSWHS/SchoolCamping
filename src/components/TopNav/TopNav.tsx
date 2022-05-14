import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import * as style from './TopNav.module.css'

const TopNav = () =>
  <div className={style.outer}>
    <div className={style.inner}>
      <Link to="/#top" className={style.logo}>
        <StaticImage
          width={30}
          height={30}
          placeholder="blurred"
          src="../../images/icon.png"
          alt="스쿨캠핑 로고"/>
      </Link>
      <Link to="/admin" className={style.admin}>
        <FontAwesomeIcon icon={faUser}/>
        &nbsp;
        관리자
      </Link>
    </div>
  </div>

export default TopNav
