import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import Jumbotron from '../components/Jumbotron/Jumbotron'
import ListView from '../components/ListView/ListView'
import TopNav from '../components/TopNav/TopNav'

const IndexPage = () =>
  <Fragment>
    <div id="top" />
    <Helmet
      title="스쿨캠핑 - 스쿨캠핑 예약을 쉽고 빠르게" />

    <TopNav />
    <Jumbotron />
    <ListView />
  </Fragment>

export default IndexPage
