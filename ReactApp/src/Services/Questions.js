// import axios from 'axios'
// import firebase from 'firebase/app'
// import firestore from 'firebase/firestore'

// // var firebaseConfig = {
// //     apiKey: "AIzaSyAekwzq8e6ztoE_5JEvQDH0HCJC9mk1sQ8",
// //     authDomain: "wonderkids-465d9.firebaseapp.com",
// //     projectId: "wonderkids-465d9",
// //     storageBucket: "wonderkids-465d9.appspot.com",
// //     messagingSenderId: "674437246798",
// //     appId: "1:674437246798:web:ceab67b4ebf0180086b81f",
// //     measurementId: "G-MV5XVLGKDR"
// //   };
  
//   firebase.initializeApp(firebaseConfig);
  
  

// const db = firebase.firestore()


// class Questions{
    

//     getNext = async () =>{
//         const first = await db.collection('questions')
//         .document("topics")
//         .collection("geography")
//         .orderBy('createdAt', 'asc')
//         .limit(1);
//     return first.get();

//     const snapshot = await first.get();
//     }
// }

// export default new Questions()