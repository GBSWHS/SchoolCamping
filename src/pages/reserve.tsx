import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import ReserveForm from '../components/ReserveForm/ReserveForm'

const ReservePage = () =>
  <Fragment>
    <div id="top" />
    <Helmet
      title="스쿨캠핑 - 예약하기" />

    <ReserveForm />
  </Fragment>

export default ReservePage
