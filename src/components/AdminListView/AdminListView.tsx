import React, { useState } from 'react'
import useSWR from 'swr'
import moment from 'moment'

import * as style from './AdminListview.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence } from 'framer-motion'
import ViewModal from '../ViewModal/ViewModal'

const fetcher = (url: string) => fetch(url).then((r) => r.json())
const AdminListView = () => {
  const { data, error } = useSWR('https://mocki.io/v1/201d8bfc-c0cc-4427-8fa7-ab7579bf50bc', fetcher)
  const [infoModalOpend, setInfoModalOpend] = useState(false)
  const [selected, setSelected] = useState(0)

  const handleDetail =
    (id: number) => (e: any) => {
      if (!['TD', 'TR'].includes(e.target.tagName)) {
        return
      }

      setSelected(id)
      setInfoModalOpend(true)
    }

  return (
    <div className={style.outer}>
      <div className={style.inner}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>대표자</th>
              <th>동행교사</th>
              <th>예약일</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {!data && !error && 'Loading...'}
            {!data && error && 'Error! ' + error}
            {data && !data.success && 'Error! ' + data.message}
            {data && data.success && data.data.map((v: any) => (
              <tr key={v.id} onClick={ handleDetail(v.id)}>
                <td>{v.mates.split(' ')[0]}</td>
                <td>{v.teacher}</td>
                <td>{moment(v.reservedAt).format('MM/DD')}</td>
                <td className={style.actions}>
                  <FontAwesomeIcon icon={faEdit}/>
                  <FontAwesomeIcon icon={faTrash}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AnimatePresence>
        { infoModalOpend &&
          <ViewModal
            onFinish={() => setInfoModalOpend(false)}
            data={data.data.find((v: any) =>
              v.id === selected)}
          />
        }
      </AnimatePresence>
    </div>
  )
}

export default AdminListView
