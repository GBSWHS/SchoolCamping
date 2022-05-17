import { AnimatePresence } from 'framer-motion'
import React, { Fragment, useState } from 'react'
import { Helmet } from 'react-helmet'
import AdminListView from '../components/AdminListView/AdminListView'
import AdminPasswordForm from '../components/AdminPasswordForm/AdminPasswordForm'
import TopNav from '../components/TopNav/TopNav'

const AdminPage = () => {
  const [logined, setLogined] = useState(false)

  return (
    <Fragment>
      <div id="top" />
      <Helmet
        title="스쿨캠핑 - 관리자 페이지" />

      <TopNav />
      <AnimatePresence>
        {!logined &&
          <AdminPasswordForm
            onFinished={() => setLogined(true)} />}
      </AnimatePresence>
      <AnimatePresence>
        {logined && <AdminListView />}
      </AnimatePresence>

    </Fragment>
  )
}

export default AdminPage
