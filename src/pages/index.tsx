import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import TopNav from '../components/TopNav/TopNav'
import Jumbotron from '../components/Jumbotron/Jumbotron'
import ListView from '../components/ListView/ListView'

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
