import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useOffline from '../../hooks/useOffline'

import * as style from './TopNav.module.css'

const TopNav = () => {
  const isOffline = useOffline()

  return (
    <div className={style.frame}>
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
      {isOffline && (
        <div className={style.offline}>
          오프라인 모드입니다. 교내 WIFI에 연결해주세요.
        </div>
      )}
    </div>
  )
}
export default TopNav
