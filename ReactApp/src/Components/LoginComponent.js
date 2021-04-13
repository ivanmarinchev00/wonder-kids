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

    <div>
      <div class="text-center">
        <img src="/assets/icon-256x256.png" class="rounded" alt="Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <div class="form-group row justify-content-md-center justify-content-center">
          <div class="col-6 mt-4 col-sm-6 col-md-4 col-lg-3">
            <input type="email" class="form-control" id="inputEmail3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          </div>
        </div>
        <div class="form-group row justify-content-md-center justify-content-center">
          <div class="col-6 mt-4 col-sm-6 col-md-4 col-lg-3">
            <input type="password" class="form-control" id="inputPassword3" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </div>
        </div>

        <div class="form-group row justify-content-md-center justify-content-center">
          <div class="col-5 mt-4">
            <button type="submit" class="btn btn-primary btn-lg mx-auto d-block">Login</button>
          </div>
        </div>

        <div class="form-group row justify-content-md-center justify-content-center">
          <div class="col-8 mt-4">
            <a href="/register" class="link-primary text-center">You don't have an account. Then register!</a>
          </div>
        </div>
      </form>
    </div>

  )
}

export default withRouter(LoginComponent);