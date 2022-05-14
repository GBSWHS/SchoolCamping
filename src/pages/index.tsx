import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import TopNav from '../components/TopNav/TopNav'
import Jumbotron from '../components/Jumbotron/Jumbotron'

const IndexPage = () =>
  <Fragment>
    <div id="top" />
    <Helmet
      title="스쿨캠핑 - 스쿨캠핑 예약을 쉽고 빠르게" />

    <TopNav />
    <Jumbotron />
    {/* Content */}
  </Fragment>

export default IndexPage
