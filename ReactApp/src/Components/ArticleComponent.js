import React, { useEffect, useState } from "react";
import SliderData from "../Components/SliderData.js";
import firebase from "firebase/app";

const ArticleComponent = (props) => {
  const [input, setInput] = useState('chemistry');
  const [articleIndex, setArticleIndex] = useState(0);
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleImage, setArticleImage] = useState('');
  const [articles, setArticles] = useState([])
  var dataArticles = []

  const db = firebase.firestore();

  // var articleRef = db.collection("articles").doc(input)

  const fetchArticles = async () => {
    const response = await db.collection("articles").doc(input).collection("articles");
    const data = await response.get();
    console.log("INPUT HEREE" + input);
    data.docs.forEach((article) => {
      try{
        dataArticles = [...dataArticles, article];
        setArticles(dataArticles); // use the useState articles 
        console.log("ARTICLESS" + articles);
        setArticleTitle(articles[articleIndex].data().title);
        setArticleContent(articles[articleIndex].data().content)
        setArticleImage(articles[articleIndex].data().img) 
      }
      catch(e){
        console.log(e);
      }
       
    });
    // return dataArticles;
  };


  useEffect(() => {
    fetchArticles();
  }, [input, articleIndex]);

  const onChangeHandler = (event) => {
      // console.log(input);
      setInput(event.target.value);
  }

  const onIndexIncreaseHandler = () => {
    if(articleIndex === 1) return
    setArticleIndex(articleIndex + 1);
    // console.log(articles)
    // setArticleTitle(articles[articleIndex].data().title)
  }

  const onIndexDecreaseHandler = () => {
    if(articleIndex === 0) return
    setArticleIndex(articleIndex - 1);
  }

  // articleRef.get().then(doc => {
  //   if(doc.exists){
  //     console.log("WE MADE IT")
  //   }
  // })

  if(articles.length === 0) return <h1>Loading...</h1>

    

  else{
    return (
      <div className="jumbotron vertical-center">
        <div className="article-container">
          <select
            name="topic"
            id="topic"
            onChange={onChangeHandler}
            // value={input}
          >
            <option value="chemistry" >Chemistry</option>
            <option value="biology">Biology</option>
            <option value="geography">Geography</option>
            <option value="history">History</option>
          </select>
          {SliderData.map((slide, index) => {
            console.log("FIRST")
            return (
              <div className="card text-center" key={index}>
                <div className="overflow">
                  <img src={articleImage} alt="article image" className="article-image" />
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
    );
  }

  
};

export default ArticleComponent;
