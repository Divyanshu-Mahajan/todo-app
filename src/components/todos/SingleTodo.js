import React from 'react'
import Card from '../UI/Card'
import { useNavigate } from 'react-router-dom'
import styles from './SingleTodo.module.css'

const SingleTodo = (props) => {
    const navigate = useNavigate();
    const clickHandler = () =>{
        navigate(`/all-todos/${props.id}`); 
    }
    return (
        <Card>
            <li className={styles.list} onClick={clickHandler}>
                <p>{props.todo.todo}</p>
                <p>Status: {props.todo.completed ? '✅ Completed' : '❌ Pending'}</p>
                <p>Created: {new Date(props.todo.createdAt).toLocaleString()}</p>
            </li>
        </Card>
    )
}

export default SingleTodo
