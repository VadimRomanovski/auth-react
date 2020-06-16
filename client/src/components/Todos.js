
import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hook/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {TodoItem} from './TodoItem'

export const Todos = () => {
  const [todo, setTodos] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fetchTodos = useCallback(async () => {
    try {
      const fetched = await request('/api/todo/todos', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      console.log(fetched)
      setTodos(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <TodoItem todo={todo} />}
    </>
  )
}