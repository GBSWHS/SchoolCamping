import React from 'react'
import useSWR from 'swr'
import * as style from './ListView.module.css'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ListView = () => {
  const { data, error } = useSWR('https://mocki.io/v1/201d8bfc-c0cc-4427-8fa7-ab7579bf50bc', fetcher)

  return (
    <div className={style.outer}>
      <div className={style.inner}>
        <h2 className={style.title}>
          Reserves.&nbsp;
          <span>예약목록.</span>
        </h2>

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
                <td>{v.reserved_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
     </div>
   </div>
  )
}

export default ListView