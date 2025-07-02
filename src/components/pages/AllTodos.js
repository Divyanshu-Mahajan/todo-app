import React, { useEffect } from 'react'
import useApi from '../hooks/use-api'
import { getAllTodos } from '../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner';
import Card from '../UI/Card';
import SingleTodo from '../todos/SingleTodo';

const AllTodos = () => {
  
  const { sendRequestForApi,status,data,error } = useApi(getAllTodos,true);

  useEffect(() => {
    sendRequestForApi(); // fetch all todos.
  } ,[sendRequestForApi])
  
  if(status === "pending" && !error){
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if(error){
    return (
      <Card>
        {error}
      </Card>
    )
  }

  if(status !== "pending" && (!data || data.length === 0)){
    return(
      <Card>
        <h2 className='card-heading centered'>No todos found.</h2>
      </Card>
    )
  }

  return (
    <Card>
      <h2 className='card-heading centered'>All Todos</h2>
      <ul style={{listStyle : "none",textDecoration : "none"}}>
        {
          data.map((todo) => (
            <SingleTodo key ={todo.id} id = {todo.id} todo={todo}/>
          ))
        }
      </ul>
    </Card>
  )
}

export default AllTodos
