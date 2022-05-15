import React from 'react'
import useSWR from 'swr'
import moment from 'moment'

import * as style from './AdminListview.module.css'

const fetcher = (url: string) => fetch(url).then((r) => r.json())
const AdminListView = () => {
  const { data, error } = useSWR('http://192.168.0.8:3001/api/camping/reserves', fetcher)
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
              <tr key={v.id}>
                <td>{v.mates.split(' ')[0]}</td>
                <td>{v.teacher}</td>
                <td>{moment(v.reservedAt).format('MM/DD')}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminListView
