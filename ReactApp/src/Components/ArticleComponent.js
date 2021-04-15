import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import SliderData from "../Components/SliderData.js";
import img from "../images/3637164.jpg";
import firebase from "firebase/app";
import axios from "axios";

const ArticleComponent = (props) => {
  const [input, setInput] = useState("chemistry");
  const [articleIndex, setArticleIndex] = useState(0);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [articles, setArticles] = useState([]);
  var dataArticles = [];

  const db = firebase.firestore();

  // var articleRef = db.collection("articles").doc(input)

  const fetchArticles = async () => {
    const response = await db
      .collection("articles")
      .doc(input)
      .collection("articles");
    const data = await response.get();
    console.log("INPUT HEREE" + input);
    data.docs.forEach((article) => {
      try {
        dataArticles = [...dataArticles, article];
        setArticles(dataArticles); // use the useState articles
        console.log(articles.length);
        setArticleTitle(dataArticles[articleIndex].data().title);
        setArticleContent(dataArticles[articleIndex].data().content);
        setArticleImage(dataArticles[articleIndex].data().img);
      } catch (e) {
        console.log(e);
      }
    });
    return dataArticles;
  };

  useEffect(() => {
    fetchArticles();
  }, [input, articleIndex]);

  const onChangeHandler = (event) => {
    // console.log(input);
    setInput(event.target.value);
  };

  const onIndexIncreaseHandler = () => {
    setArticleIndex(articleIndex + 1);
    console.log(articles)
    // setArticleTitle(articles[articleIndex].data().title)
  };

  const onIndexDecreaseHandler = () => {
    setArticleIndex(articleIndex - 1);
  };

  // articleRef.get().then(doc => {
  //   if(doc.exists){
  //     console.log("WE MADE IT")
  //   }
  // })

  return (
    <div>
      <Link to="/menu">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="currentColor"
      class="bi bi-arrow-left-circle-fill"
      viewBox="0 0 16 16"
    >
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
    </svg>
  </Link>
  <div className="jumbotron vertical-center">
     
      <div className="article-container">
        <select
          name="topic"
          id="topic"
          onChange={onChangeHandler}
          value={input}
        >
          <option value="chemistry">Chemistry</option>
          <option value="biology">Biology</option>
          <option value="geography">Geography</option>
          <option value="history">History</option>
        </select>
        {SliderData.map((slide, index) => {
          return (
            <div className="card text-center" key={index}>
              <div className="overflow">
                <img
                  src={articleImage}
                  alt="article image"
                  className="article-image"
                />
              </div>
              <div className="card-body text-dark">
                <h4 className="card-title">{articleTitle}</h4>
                <p className="card-text text-secondary">{articleContent}</p>
              </div>
            </div>
          );
        })}
        <button id="goLeft" onClick={onIndexDecreaseHandler}>{`<`}</button>
        <button id="goRight" onClick={onIndexIncreaseHandler}>{`>`}</button>
      </div>
    </div>
    </div>
    
  );
};

export default ArticleComponent;
