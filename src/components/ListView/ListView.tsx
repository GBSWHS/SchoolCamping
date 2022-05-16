import useSWR from 'swr'
import moment from 'moment'
import React, { useState } from 'react'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence } from 'framer-motion'

import ViewModal from '../ViewModal/ViewModal'
import * as style from './ListView.module.css'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ListView = () => {
  const [selected, setSelected] = useState(0)
  const [viewModalOpened, setViewModalOpend] = useState(false)
  const { data, error } = useSWR('https://mocki.io/v1/201d8bfc-c0cc-4427-8fa7-ab7579bf50bc', fetcher)

  const handleDetail =
    (id: number) => () => {
      setSelected(id)
      setViewModalOpend(true)
    }

  return (
    <div className={style.outer} id="reserves">
      <div className={style.inner}>
        <h2 className={style.title}>
          Reserves.
        </h2>

        <table className={style.table}>
          <thead>
            <tr>
              <th>대표자</th>
              <th>동행교사</th>
              <th>예약일</th>
              <th>설정</th>
            </tr>
          </thead>
          <tbody>
            {!data && !error && 'Loading...'}
            {!data && error && 'Error! ' + error}
            {data && !data.success && 'Error! ' + data.message}
            {data && data.success && data.data.map((v: any) => (
              <tr key={v.id} onClick={handleDetail(v.id)}>
                <td>{v.mates.split(' ')[0]}</td>
                <td>{v.teacher}</td>
                <td>{moment(v.reserved_at).format('MM/DD')}</td>
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
        {viewModalOpened &&
          <ViewModal
            onFinish={() => setViewModalOpend(false)}
            data={data.data.find((v: any) =>
              v.id === selected)}/>}
      </AnimatePresence>
   </div>
  )
}

export default ListView
