import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import Card from '../UI/Card'
import { useNavigate } from 'react-router-dom';
const NotFound = () => {
    const navigate = useNavigate();
    const backToHomepageHandler = () =>{
        navigate("/");
    }
    return (
        <Card>
            <div className="centered">
                <h2 className="centered">Page not Found.</h2>
                <button className='btn' onClick={backToHomepageHandler}><FaArrowLeft />
                    <span style={{ marginLeft: "0.5rem" }}>back to homepage</span>
                </button>
            </div>
        </Card>
    )
}

export default NotFound
