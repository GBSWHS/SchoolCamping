import useSWR from 'swr'
import moment from 'moment'
import React, { useState } from 'react'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence } from 'framer-motion'

import ViewModal from '../ViewModal/ViewModal'
import * as style from './ListView.module.css'
import EditModal from '../EditModal/EditModal'
import DeleteModal from '../DeleteModal/DeleteModal'
import useOffline from '../../hooks/useOffline'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ListView = () => {
  const isOffline = useOffline()
  const [selected, setSelected] = useState(0)
  const [viewModalOpened, setViewModalOpend] = useState(false)
  const [editModalOpened, setEditModalOpend] = useState(false)
  const [deleteModalOpened, setDeleteModalOpend] = useState(false)
  const { data, error, mutate } = useSWR('/api/Camping/reserves', fetcher)

  if (isOffline) {
    return (
      <div className={style.outer}>
        오프라인 모드에서는 예약 목록을 불러올 수 없습니다.
      </div>
    )
  }

  const handleDetail =
    (id: number) => (e: any) => {
      if (!['TR', 'TD'].includes(e.target.tagName)) {
        return
      }

      setSelected(id)
      setViewModalOpend(true)
    }

  const handleEdit =
    (id: number) => () => {
      setSelected(id)
      setEditModalOpend(true)
    }

  const handleDelete =
    (id: number) => () => {
      setSelected(id)
      setDeleteModalOpend(true)
    }

  const onEditModalFinished = () => {
    mutate()
    setEditModalOpend(false)
  }

  const onDeleteModalFinished = () => {
    mutate()
    setDeleteModalOpend(false)
  }

  return (
    <div className={style.outer} id="reserves">
      <div className={style.inner}>
        <h2 className={style.title}>
          Reserves.
        </h2>

        <div className={style.tableFrame}>
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
                  <td>{moment(v.reservedAt).format('MM/DD')}</td>
                  <td className={style.actions}>
                    <FontAwesomeIcon
                      onClick={handleEdit(v.id)}
                      className={style.editBtn}
                      icon={faEdit}/>
                    <FontAwesomeIcon
                      onClick={handleDelete(v.id)}
                      className={style.deleteBtn}
                      icon={faTrash}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {viewModalOpened &&
          <ViewModal
            onFinish={() => setViewModalOpend(false)}
            data={data.data.find((v: any) =>
              v.id === selected)}/>}
      </AnimatePresence>

      <AnimatePresence>
        {editModalOpened &&
           <EditModal
            onFinish={onEditModalFinished}
            data={data.data.find((v: any) =>
              v.id === selected)}/>}
      </AnimatePresence>

      <AnimatePresence>
        {deleteModalOpened &&
          <DeleteModal
            data={data.data.find((v: any) =>
              v.id === selected)}
            onFinish={onDeleteModalFinished}/>}
      </AnimatePresence>
    </div>
  )
}

export default ListView
