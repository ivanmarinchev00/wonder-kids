import Questions from "../Services/Questions"
import firebase from "firebase/app"
import firestore from "firebase/firestore"
import { useEffect, useState } from "react"
import * as arrayFunctions from "../Services/shuffle.js"
import LocateUser from "../Services/LocateUser.js"



const GameComponent = props => {
    const [lastQuestion, setLastQuestion] = useState({
        question: "",
        answers: ["", "", "", ""]
    })
    const [lastPQuestion, setLastPQuestion] = useState({
        question: "",
        answers: ["", "", "", ""]
    })
    const [answers, setAnswers] = useState(["", "", "", ""])
    const [nextQuestion, setNextQuestion] = useState(true)
    const [questionType, setQuestionType] = useState(["topic", "region"])
    const db = firebase.firestore()


    const getNext = async () => {

    }


    useEffect(async () => {
        if (lastPQuestion.question === "" && lastQuestion === "") {
            setNextQuestion(!nextQuestion)
        }
        const userProvince = await LocateUser.getUserProvince()
        const userProvinceLC = userProvince.toLowerCase().replace(/\s/g, '')
        setQuestionType(arrayFunctions.shuffle(questionType))
        if (questionType[0] === "topic") {

            if (lastQuestion.question == "") {
                console.log("PRAZNO")
                const first = await db
                    .collection("questions")
                    .doc("topics")
                    .collection("geography")
                    .orderBy('createdAt', "asc")
                    .limit(1);

                const snapshot = await first.get();

                // Get the last document
                const last = snapshot.docs[snapshot.docs.length - 1];
                setLastQuestion(last.data())
                setAnswers(await arrayFunctions.shuffle(last.data().answers))
                console.log(answers)
                //setNextQuestion(false)
                //console.log(lastQuestion)
            }
            // Construct a new query starting at this document.
            // Note: this will not have the desired effect if multiple
            // cities have the exact same population value.
            else {
                const nextt = db
                    .collection("questions")
                    .doc("topics")
                    .collection("geography")
                    .orderBy('createdAt', "asc")
                    .startAfter(lastQuestion.createdAt)
                    .limit(1);
                const nextSnapshot = await nextt.get();
                const lastt = nextSnapshot.docs[nextSnapshot.docs.length - 1];
                try {
                    setLastQuestion(lastt.data())
                    setAnswers(await arrayFunctions.shuffle(lastt.data().answers))
                    // setNextQuestion(false)
                }
                catch (err) {
                    console.log("no more questions")
                }



            }
        }
        else {

            if (lastPQuestion.question == "") {
                console.log("PRAZNO")
                const first = await db
                    .collection("questions")
                    .doc(userProvinceLC)
                    .collection("questions")
                    .orderBy('createdAt', "asc")
                    .limit(1);

                const snapshot = await first.get();

                // Get the last document
                const last = snapshot.docs[snapshot.docs.length - 1];
                setLastPQuestion(last.data())
                setAnswers(await arrayFunctions.shuffle(last.data().answers))
                console.log(answers)
                //setNextQuestion(false)
                //console.log(lastQuestion)
            }
            // Construct a new query starting at this document.
            // Note: this will not have the desired effect if multiple
            // cities have the exact same population value.
            else {
                const nextt = db
                    .collection("questions")
                    .doc(userProvinceLC)
                    .collection("questions")
                    .orderBy('createdAt', "asc")
                    .startAfter(lastPQuestion.createdAt)
                    .limit(1);
                const nextSnapshot = await nextt.get();
                const lastt = nextSnapshot.docs[nextSnapshot.docs.length - 1];
                try {
                    setLastPQuestion(lastt.data())
                    setAnswers(await arrayFunctions.shuffle(lastt.data().answers))
                    //setNextQuestion(false)
                }
                catch (err) {
                    console.log("no more questions")
                }


            }

        }
        console.log(lastQuestion)
    }, [nextQuestion]);





    const handleClick = async e => {
        e.preventDefault()
        const userRef = db.collection('users').doc(sessionStorage.getItem("uid"));
        console.log(questionType)
        if (questionType[0] === "topic") {

            if (e.target.innerHTML === lastQuestion.answers[0]) {
                const currentScore = parseInt(sessionStorage.getItem("score"))
                const newScore = currentScore + lastQuestion.score
                const res = await userRef.update({ score: newScore });
                sessionStorage.setItem("score", newScore)
                console.log(sessionStorage.getItem("score"))


            }
            else {
                const currentScore = parseInt(sessionStorage.getItem("score"))
                const newScore = currentScore - (lastQuestion.score / 2)
                const res = await userRef.update({ score: newScore });
                sessionStorage.setItem("score", newScore)
                 console.log(sessionStorage.getItem("score"))
            }
        }
        else {
            if (e.target.innerHTML === lastPQuestion.answers[0]) {
                const currentScore = parseInt(sessionStorage.getItem("score"))
                console.log(currentScore)
                const newScore = currentScore + lastPQuestion.score
                const res = await userRef.update({ score: newScore });
                sessionStorage.setItem("score", newScore)
                console.log(sessionStorage.getItem("score"))

            }
            else {
                const currentScore = parseInt(sessionStorage.getItem("score"))
                console.log(currentScore)
                const newScore = currentScore - (lastPQuestion.score / 2)
                console.log(newScore)
                const res = await userRef.update({ score: newScore });
                sessionStorage.setItem("score", newScore)
                console.log(sessionStorage.getItem("score"))
            }
        }

        setNextQuestion(!nextQuestion)
       
    }
    return (
        <div>
            <div class="container-fluid ">
                <div class="row justify-content-center">
                    <h2 class="sign">{lastQuestion.question === "" ? lastPQuestion.question : lastQuestion.question}</h2>
                </div>
                <div class="row justify-content-center">
                    <button type="button" className="btn-primary btn-lg btn" onClick={handleClick}>{answers[0]}</button>
                </div>
                <div class="row justify-content-center">
                    <button type="button" className="btn-primary btn-lg btn" onClick={handleClick}>{answers[1]}</button>
                </div>
                <div class="row justify-content-center">
                    <button type="button" className="btn-primary btn-lg btn" onClick={handleClick}>{answers[2]}</button>
                </div>
                <div class="row justify-content-center">
                    <button type="button" className="btn-primary btn-lg btn" onClick={handleClick}>{answers[3]}</button>
                </div>
            </div>

        </div>

    )
}

export default GameComponent;