import React from "react";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import styles from './Login-Register.module.css';

const Register = ()=>{
    const navigate= useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword]=useState('');
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [errorMessage, setErrorMessage] = useState(<p></p>);

    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:8081/customers',{
            username: username,
            email: email,
            password: password,
            mobile_no: mobileno,
            address: address,
            first_name: fname,
            last_name: lname
        })
        .then(response=>{
            const isDone = response.data;

            if(isDone===1){
                navigate('/rlogin');
            }
            else if(isDone===2)
            {
                setErrorMessage(
                    <p class="emessage">Already registered, go to login page</p>
                );
            }
            else{
                setErrorMessage(
                    <p class="emessage">Error while registration, try again</p>
                );
            }
        })
        .catch(error => {
            console.log(error);
            setErrorMessage(
                <p class="emessage">Error while registration, try again</p>
            );
        })
    }

    return(
        <div>
            <Helmet>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Preahvihear&display=swap" rel="stylesheet"/>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/>
                {/* <link rel="stylesheet" href="style.css"/> */}
            </Helmet>
            <div className={styles.body3}>
                <form onSubmit={handleSubmit}>
                <div class="container">
                    <h3>New to E-Mart! Register Now</h3>
                    <div class={styles.main_inp}>
                        <div class={`${styles.labels} col-4`}>
            		        <label for="username">Username</label>
                            <label for="fname">First Name</label>
                            <label for="lname">Last Name</label>
                            <label for="mno">Mobile No</label>
                            <label for="addr">Address</label>
                            <label for="email">Email</label>
                            <label for="password">Password</label>
                        </div>
                        <div class={styles.inputs}>
            		        <input type="text" name="username" placeholder="Enter a username" onChange={(e) => setUsername(e.target.value)} required/>
                            <input type="text" name="fname" placeholder="Enter your first name" onChange={(e) => setFname(e.target.value)} required/>
                            <input type="text" name="lname" placeholder="Enter your last name" onChange={(e) => setLname(e.target.value)} required/>
                            <input type="text" name="mno" placeholder="Enter your mobile no." onChange={(e) => setMobileno(e.target.value)} required />
                            <input type="text" name="addr" placeholder="Enter your Address" onChange={(e) => setAddress(e.target.value)} required/>
                            <input type="email" name="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required/>
                            <input type="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                    </div>
                    {errorMessage}
                    <button className={`btn btn-outline-light fw-bold border-2 ${styles.btn1}`} type="submit">Register</button>
                    <p class={styles.p}>Already an E-Mart user?<Link to={"/login"}>Sign In</Link></p>
                    <p>By creating an account or logging in, you agree to E-Mart'sPrivacy Policy and Conditions</p>
                    <p>&copy 2003-2023 E-Mart.com, Inc</p>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Register;