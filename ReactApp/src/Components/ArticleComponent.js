import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import SliderData from "../Components/SliderData.js";
import firebase from "firebase/app";

const ArticleComponent = (props) => {
  const [input, setInput] = useState("chemistry");
  const [articleIndex, setArticleIndex] = useState(0);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [articles, setArticles] = useState([]);
  var dataArticles = [];

  const db = firebase.firestore();

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
    setInput(event.target.value);
  };

  const onIndexIncreaseHandler = () => {
    if(articleIndex === 1) return
    setArticleIndex(articleIndex + 1);
    console.log(articles)
  };

  const onIndexDecreaseHandler = () => {
    if(articleIndex === 0) return
    setArticleIndex(articleIndex - 1);
  };


  return (
    <div  className="container">
      <div className="row align-items-start">
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
      </div>
      
     
      <div className="row align-self-center">
        <div className="col-lg-6 col-md-4 col-sm-2">
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
        </div>
        <div className="row card text-center">
        {SliderData.map((slide, index) => {
          return (
            <>
              <div className="col-lg-6 col-md-4 col-sm-2">
                <img
                  src={articleImage}
                  alt="article image"
                  className="article-image"
                />
              </div>
              <div className="col-12 card-body text-dark">
                <h4 className="card-title">{articleTitle}</h4>
                <p className="card-text text-secondary">{articleContent}</p>
              </div>
            </>
          );
        })}
        </div>
        <button id="goLeft" onClick={onIndexDecreaseHandler}>{`<`}</button>
        <button id="goRight" onClick={onIndexIncreaseHandler}>{`>`}</button>
      </div>
    </div>
    
  );
};

export default ArticleComponent;
