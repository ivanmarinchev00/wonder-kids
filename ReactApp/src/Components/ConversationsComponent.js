import { useState } from "react";
import { Link } from "react-router-dom";
import ChatComponent from "./ChatComponent";

const ConversationsComponent = (props) => {
  const [topic, setTopic] = useState("");
  const [showChat, setShowChat] = useState(false);

  const onclickButtonHandler = (topic) => {
    setTopic(topic);
    setShowChat(true);
    console.log(topic);
  };

  if (!showChat) {
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
        <div class="container">
          {/* <div class="row">
        <div class="col-md-4 mx-auto mt-5">
            <div class="input-group">
                <input class="form-control border-end-0 border rounded-pill" type="text" value="search" id="example-search-input" />
                <span class="input-group-append">
                    <button class="btn btn-outline-secondary border-start-0 border-top-0 border-bottom-0 border rounded-pill ms-n5" type="button">
                        <i class="fa fa-search"></i>
                    </button>
                </span>
            </div>
        </div>
    </div> */}

          <div class="row justify-content-center">
            <button
              type="button"
              className="btn-primary btn-lg btnChat"
              onClick={() => onclickButtonHandler("biology")}
            >
              Biology
            </button>
          </div>

          <div class="row justify-content-center">
            <button
              type="button"
              className="btn-primary btn-lg btnChat"
              onClick={() => onclickButtonHandler("chemistry")}
            >
              Chemistry
            </button>
          </div>

          <div class="row justify-content-center">
            <button
              type="button"
              className="btn-primary btn-lg btnChat"
              onClick={() => onclickButtonHandler("geography")}
            >
              Geography
            </button>
          </div>

          <div class="row justify-content-center">
            <button
              type="button"
              className="btn-primary btn-lg btnChat"
              onClick={() => onclickButtonHandler("history")}
            >
              History
            </button>
          </div>

          {/* <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item disabled">
                <a class="page-link" href="/" tabindex="-1">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="/">1</a></li>
            <li class="page-item"><a class="page-link" href="/">2</a></li>
            <li class="page-item"><a class="page-link" href="/">3</a></li>
            <li class="page-item">
                <a class="page-link" href="/">Next</a>
            </li>
        </ul>
    </nav> */}
        </div>
      </div>
    );
  } else {
    return <ChatComponent topic={topic} />;
  }
};

export default ConversationsComponent;
