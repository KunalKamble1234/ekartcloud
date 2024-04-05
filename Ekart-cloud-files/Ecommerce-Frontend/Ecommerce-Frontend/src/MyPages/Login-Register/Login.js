import React from "react"
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "../../Auth";

import styles from './Login-Register.module.css';

const Login=()=>{
    const user={
        constructor(
            username,
            password,
            first_name,
            last_name,
            mobile_no,
            email,
            address,
            balance,
            total_orders
        ) {
            this.username = username;
            this.password = password;
            this.first_name = first_name;
            this.last_name = last_name;
            this.mobile_no = mobile_no;
            this.email = email;
            this.address = address;
            this.balance = balance;
            this.total_orders = total_orders;
        }

    }
    const [email11, setEmail11] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(<p></p>);
    const navigate = useNavigate();

    const verified = ()=>{
        const s='http://localhost:8081/customers/'+email11;
        axios.get(s)
        .then(response =>{
            let aaa = response.data;
            setLoggedInUser(aaa);
        })
        navigate('/chome');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(email11 === "manager" && password === "1234")
        {
            navigate('/mhome');
        }
        axios.post('http://localhost:8081/customers/login', {
            username: email11,
            password: password
        })
        .then(response => {
            const isValidCustomer = response.data;

            if (isValidCustomer) {
                verified();
            }
            else
            {
                // Showing error message for invalid details
                setErrorMessage(
                    <p class="emessage">Wrong username and password</p>
                );
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    return(
        <div>
            <Helmet>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>E-Mart</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Preahvihear&display=swap" rel="stylesheet"/>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous"/>
            </Helmet>
            <div className={styles.body3}>
            <form onSubmit={handleSubmit}>
                <div class={`${styles.container} d-flex gap-3`}>
                    <h2>Login to E-Mart</h2>
                    <div class={styles.main_inp}>
                        <div className="d-flex">
                            <div class={`${styles.labels} col-4`}>
                                <label for="username">Username</label>
                                <label for="password">Password</label>
                            </div>
                            <div class={styles.inputs}>
                                <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(e) => setEmail11(e.target.value)} required/>
                                <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                        </div>
                    </div>
                    <button className={`btn btn-outline-light fw-bold border-2 ${styles.btn1}`} type="submit">Sign in</button>
                    {errorMessage}
                    <p class={styles.p}>New to E-Mart ? <Link to={"/register"}>Sign Up</Link></p>
                </div>
                </form>
            </div>
        </div>
    )
}
export default Login;