import React, { useState } from "react";
import SliderData from "../Components/SliderData.js";
import img from "../images/3637164.jpg";

const ArticleComponent = (props) => {
  const [input, setInput] = useState({ topic: "Chemistry" });

  return (
    <div className="jumbotron vertical-center">
      <div className="article-container">
        <select
          name="topic"
          id="topic"
          onChange={(event) => {
            setInput(event.target.value);
          }}
        >
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Geography">Geography</option>
          <option value="History">History</option>
        </select>
        {SliderData.map((slide, index) => {
          return (
            <div className="card text-center" key={index}>
              <div className="overflow">
                <img src={img} alt="article image" className="article-image" />
              </div>
              <div className="card-body text-dark">
                <h4 className="card-title">{slide.title}</h4>
                <p className="card-text text-secondary">
                  {slide.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArticleComponent;
