import React, { useEffect } from 'react'
import useApi from '../hooks/use-api'
import { getAllTodos } from '../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner';
import Card from '../UI/Card';
import SingleTodo from '../todos/SingleTodo';

const CompletedTodos = () => {

  const { sendRequestForApi, status, data, error } = useApi(getAllTodos, true);

  useEffect(() => {
    sendRequestForApi();
  }, [sendRequestForApi]);

  const completedTodo = data?.filter((singleTodo) => singleTodo.completed === false) || [];
  if (status === "pending" && !error) {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className='centered'>
        {error}
      </div>
    )
  }
  if (completedTodo.length === 0) {
    return (
      <Card>
        <h2>There is no completed todo.</h2>
      </Card>
    )
  }
  return (
    <Card>
      <div className='card-heading centered'>
        <h2>Pending Todos</h2>
      </div>
      <ul style={{ listStyle: "none", textDecoration: "none" }}>
        {
          completedTodo.map((eachTodo) => (
            <SingleTodo key={eachTodo.id} id={eachTodo.id} todo={eachTodo} />
          ))
        }
      </ul>
    </Card>
  )
}

export default CompletedTodos
