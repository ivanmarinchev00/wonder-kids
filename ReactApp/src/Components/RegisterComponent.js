import React, { useState } from 'react'
import firebase from 'firebase/app'
import auth from 'firebase/auth'
import firestore from 'firebase/firestore'
import { withRouter } from "react-router";


const RegisterComponent = props => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const db = firebase.firestore()

    const handleSubmit = async e => {

        setLoading(true)
        e.preventDefault();
       
        if (password !== cPassword) {
            setPassword("")
            setCPassword("")
            setLoading(false);
            return alert("Please make sure your passwords match");

        }
        
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(res=>{

                const data={
                    score: 0
                }
                sessionStorage.setItem("uid",res.user.uid)
                sessionStorage.setItem("score", 0)
                db.collection('users').doc(res.user.uid).set(data);


                props.history.push("/menu")
            })

        
    }


    return (
        <div className="container">
            <div class="text-center">
                <img src="/assets/icon-192x192.png" class="rounded" alt="Logo" />
            </div>
            <form onSubmit={handleSubmit}>
                <div class="form-group row justify-content-md-center justify-content-center">
                    <div class="col-lg-12 mt-4 col-sm-6 col-md-10">
                        <input type="email" class="form-control" id="inputEmail3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>
                <div class="form-group row justify-content-md-center justify-content-center">
                    <div class="col-lg-12 mt-4 col-sm-6 col-md-10">
                        <input type="password" class="form-control" id="inputPassword3" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </div>
                </div>

                <div class="form-group row justify-content-md-center justify-content-center">
                    <div class="col-lg-12 mt-4 col-sm-6 col-md-10">
                        <input type="password" class="form-control" id="inputPassword3" placeholder="Conf Password" onChange={e => setCPassword(e.target.value)} />
                    </div>
                </div>

                <div class="form-group row justify-content-md-center justify-content-center">
                    <div class="col-lg-12 mt-4">
                        <button type="submit" disabled={loading} class="btn btn-primary btn-lg mx-auto d-block" >Register</button>
                    </div>
                </div>

                <div class="form-group row justify-content-md-center justify-content-center">
                    <div class="col-12 mt-4">
                        <a href="/" class="link-primary text-center">You have an account. Then login!</a>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default withRouter(RegisterComponent);
