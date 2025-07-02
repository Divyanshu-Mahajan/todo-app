import React, { useRef, useState } from 'react'
import Card from '../UI/Card'
import styles from './AddTodo.module.css'
import { useNavigate } from 'react-router-dom'
import useApi from '../hooks/use-api'
import { addTodo } from '../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner'
import { toast } from 'react-toastify';

const AddTodo = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  // const [inputTodo, setInputTodo] = useState('');
  const [inputValid, setInputValid] = useState(true);
  const [wasSubmitted, setWasSubmitted] = useState(false);


  const { sendRequestForApi, status, error } = useApi(addTodo);

  const inputChangeHandler = () => {
    const value = inputRef.current.value.trim();
    if (wasSubmitted) {
      setInputValid(value.length > 0);
    }
  };


  const formSubmitHandler = async (event) => {
    event.preventDefault();
    setWasSubmitted(true);

    const enteredText = inputRef.current.value.trim();

    if (enteredText.length === 0) {
      setInputValid(false);
      return;
    }

    setInputValid(true)
    try {
      await sendRequestForApi({
        todo: enteredText,
        createdAt: new Date().toISOString(),
        completed: false
      })

      //Reset the input
      // console.log(inputTodo);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      setWasSubmitted(false);
      toast.success("Todo added successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Could not add Todos.")
    }
  }


  if (status === "pending" && !error) {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }
  return (
    <Card>
      <form className='centered' onSubmit={formSubmitHandler}>
        <input className={`${styles["form-input"]} ${!inputValid && wasSubmitted ? styles.invalid : ''}`}
          type='text'
          placeholder='Enter Todo...'
          ref={inputRef}
          onChange={inputChangeHandler} />
        <button className='btn' type='submit'>Add Todo</button>
      </form>
    </Card>
  )
}

export default AddTodo
