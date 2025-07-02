import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useApi from '../hooks/use-api';
import { deleteTodo, getSingleTodo, updateTodo, toggleTodo } from '../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import Card from '../UI/Card';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import styles from './TodoDetails.module.css'

const TodoDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const { id: todoId } = params;
    const inputRef = useRef(null);
    const { sendRequestForApi, status, data, error } = useApi(getSingleTodo, true);
    const [inputValid,setInputValid] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState('');

    useEffect(() => {
        sendRequestForApi(todoId);
    }, [sendRequestForApi, todoId])

    const todoChangeHandler = (event) => {
        const value = inputRef.current.value
        setEditedText(event.target.value);
        setInputValid(value.length > 0);
    }

    const startEditHandler = () => {
        setIsEditing(true);
        setEditedText(data.todo);
    }

    const todoSaveHandler = async () => {
        const trimmedText = editedText.trim();

        if(trimmedText.length === 0){
            setInputValid(false);
            toast.error("Empty todo cannot be saved.")
            return;
        }
        try {
            await updateTodo(todoId, trimmedText);
            toast.success("Todo updated successfully")
            setIsEditing(false);
            sendRequestForApi(todoId)
        } catch (error) {
            toast.error(error.message || "Could not update the todo.")
        }
    }

    const toggleStatusHandler = async () => {
        try {
            await toggleTodo(todoId, !data.completed);
            sendRequestForApi(todoId);
            toast.success("Status updated!");
        } catch (err) {
            toast.error(err.message || "Could not toggle todo.");
        }
    };

    const backClickHandler = () => {
        navigate("/all-todos");
    }

    const todoDeleteHandler = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
        if (!confirmDelete) return;

        try {
            await deleteTodo(todoId);
            toast.success("Todo deleted successfully")
            navigate('/all-todos')
        } catch (error) {
            toast.error(error.message || "Could not delete the todo.")
        }

    }


    if (status === "pending" && !error) {
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        )
    }
    if (error) {
        return (
            <h2 className='centered'>{error}</h2>
        )
    }
    if (!data) {
        return (
            <Card>
                <h2 className='card-heading centered'>No todo found.</h2>
            </Card>
        )
    }
    return (
        <Card>
            <h2 className='card-heading centered' style={{font : "large"}}>Todo Detail</h2>
            <div className={styles.details}>
                {
                    isEditing ? (
                        <>
                            <input
                            className={`${styles["form-input"]} ${!inputValid ? styles.invalid : ''}`}  
                            type='text' value={editedText} onChange={todoChangeHandler} ref={inputRef}/>
                            <button className='btn' onClick={todoSaveHandler} disabled={!inputValid}>Save</button>
                        </>
                    ) : (
                        <p><strong>Task:</strong> {data.todo}</p>
                    )
                }

                <p><strong>Status:</strong> {data.completed ? '✅ Completed' : '❌ Pending'}</p>
                <p><strong>Created:</strong> {new Date(data.createdAt).toLocaleString()}</p>
            </div>

            <div className={styles.buttons}>
                {
                    !isEditing && (
                        <button className="btn" onClick={startEditHandler}>Edit</button>
                    )
                }

                <button className="btn" onClick={toggleStatusHandler}>
                    Mark as {data.completed ? 'Pending ❌' : 'Completed ✅'}
                </button>

                <button className='btn' onClick={todoDeleteHandler}>Delete</button>

                <button className='btn' onClick={backClickHandler}><FaArrowLeft />
                    <span style={{ marginLeft: '0.5rem' }}>Back</span>
                </button>
            </div>
        </Card>
    )
}

export default TodoDetails
