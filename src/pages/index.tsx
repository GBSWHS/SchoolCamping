import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import Jumbotron from '../components/Jumbotron/Jumbotron'

const IndexPage = () =>
  <Fragment>
    <Helmet
      title="스쿨캠핑 - 스쿨캠핑 예약을 쉽고 빠르게" />

    <Jumbotron />
    {/* Content */}
  </Fragment>

export default IndexPage
