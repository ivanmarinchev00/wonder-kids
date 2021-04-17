import React, { useState } from 'react'
import firebase from 'firebase/app'
import { withRouter } from "react-router";


const LoginComponent = (props) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const db = firebase.firestore()

  const handleSubmit = async e => {


    e.preventDefault();


    const user = await firebase.auth().signInWithEmailAndPassword(email, password)
    const userRef = db.collection("users").doc(user.user.uid)
    const doc = await userRef.get()
    sessionStorage.setItem("uid",user.user.uid)
    sessionStorage.setItem("score",doc.data().score)
    props.history.push("/menu")


  }


  return (

    <div className="container">
      <div className="text-center">
        <img src="/assets/icon-256x256.png" className="rounded" alt="Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group row justify-content-md-center justify-content-center">
          <div className="col-lg-12 mt-4 col-sm-8 col-md-8">
            <input type="email" className="form-control" id="inputEmail3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="form-group row justify-content-md-center justify-content-center">
          <div className="col-lg-12 mt-4 col-sm-8 col-md-8">
            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </div>
        </div>

        <div className="form-group row justify-content-md-center justify-content-center">
          <div className="col-12 mt-4">
            <button type="submit" className="btn btn-primary btn-lg mx-auto d-block">Login</button>
          </div>
        </div>

        <div className="form-group row justify-content-md-center justify-content-center">
          <div className="col-lg-12 mt-4">
            <a href="/register" className="link-primary text-center">You don't have an account. Then register!</a>
          </div>
        </div>
      </form>
    </div>

  )
}

export default withRouter(LoginComponent);