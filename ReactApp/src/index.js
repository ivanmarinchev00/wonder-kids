import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app'


var firebaseConfig = {
  apiKey: "AIzaSyAekwzq8e6ztoE_5JEvQDH0HCJC9mk1sQ8",
  authDomain: "wonderkids-465d9.firebaseapp.com",
  projectId: "wonderkids-465d9",
  storageBucket: "wonderkids-465d9.appspot.com",
  messagingSenderId: "674437246798",
  appId: "1:674437246798:web:ceab67b4ebf0180086b81f",
  measurementId: "G-MV5XVLGKDR"
};

firebase.initializeApp(firebaseConfig);



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
