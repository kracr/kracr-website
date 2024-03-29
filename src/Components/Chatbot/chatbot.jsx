import Message from "./message";
import MessageInputBox from "./messageInputBox";
import React, { Component } from "react";
import {Textsms} from "@material-ui/icons"
import "./chatbot.css";

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.fetchSources = this.fetchSources.bind(this);
    this.fetchSources();
    this.newUserMessage = this.newUserMessage.bind(this);
    this.handleMessageAfterStart = this.handleMessageAfterStart.bind(this);
    this.handleMessageAfterAnswered = this.handleMessageAfterAnswered.bind(
      this
    );
    this.handleMessageAfterCorrectedText = this.handleMessageAfterCorrectedText.bind(
      this
    );
    this.sendAnswer = this.sendAnswer.bind(this);
    this.askAboutTopics = this.askAboutTopics.bind(this);
  }
  state = {
    messages: [
      {
        text: "Hello! Please enter your question!",
        author: "bot",
      },
    ],
    loading: false,
    sources: [{name: "placement policy", link: "https://www.google.com"}]
  };
  data = {
    state: "start",
    query: null,
    answerChosen: 0,
    topics: [],
    sentences: [],
  };
  render() {
    let typing = this.state.loading ? (
      <div className="typingIcon"><Textsms/></div>
    ) : null;
    let inputBox = (
      <MessageInputBox key="" newUserMessage={this.newUserMessage} />
    );
    if (this.state.messages[this.state.messages.length - 1].type == "mcq") {
      inputBox = null;
    } else {
      inputBox = (
        <MessageInputBox key="" newUserMessage={this.newUserMessage} />
      );
    }
    return (
      <div className="chatbot page">
        <div className="chatScreen">
          <div className="topBar">
            <div className="topBarText">@iiitd_policybot</div>
          </div>
            <div className="window">
              <div className="chat">
                {typing}
                {this.state.messages
                  .map((message, idx) => (
                    <Message
                      key={idx}
                      message={message}
                      newUserMessage={this.newUserMessage}
                    />
                  ))
                  .reverse()}
              </div>
              {inputBox}
            </div>
          </div>
          <div className="chatbotInfo">
            <div className="chatbotInfoScreen">              
            <div className="chatbotInfoTitle">About Policy Chatbot</div>
            <div className="chatbotInfoBody">
              This Policy Chatbot aims to answer student questions related to IIITD's policies. It can answer questions regarding policies ranging from Admissions, Registration and credits, teaching and evaluation, graduation requirements, hostels, placements, plagiarism, etc. 
            </div>
            <div className="chatbotInfoTitle">Sources</div>
            <div className="chatbotInfoBody">
              The sources of information that this chatbot uses are:
              <ul>
                {this.state.sources.map((source) => <li>{source.name} (<a href={source.link}>Link</a>)</li> )}
              </ul>
            </div>
            <div className="chatbotInfoTitle">Interactive View</div>
              <div className="chatbotInfoBody">
                <a href="/interactivesearch">Explore Interactive View</a>
              </div>
          </div>
        </div>
      </div>
    );
  }

  async fetchSources() {
    const requestOptions = {
      method: "GET",
    };
    let response = await fetch(
      "http://localhost:8080/sources",
      requestOptions
    );
    let data = await response.json();
    this.setState({sources: data['sources']})
    console.log(data['sources']);
  }

  clearData() {
    this.data = {
      state: "start",
      query: null,
      answerChosen: 0,
      topics: [],
      sentences: [],
      correctedText: "",
    };
  }

  removeAnswerFromData() {
    if (this.data.topics.length > 0) {
      this.data.topics.splice(this.data.answerChosen, 1);
    }
    this.data.sentences.splice(this.data.answerChosen, 1);
  }

  newUserMessage(message) {
    this.setState({ messages: [...this.state.messages, message] }, () => {
      if (this.data.state === "start") {
        this.handleMessageAfterStart(message);
      } else if (this.data.state === "correctedText") {
        this.handleMessageAfterCorrectedText(message);
      } else if (this.data.state === "answered") {
        this.handleMessageAfterAnswered(message);
      }
    });
  }
  async handleMessageAfterStart(message) {
    this.setState({ loading: true });
    this.data.state = "correctedText";
    this.data.query = message.text;

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ text: this.data.query }),
    };
    let response = await fetch(
      "http://localhost:8080/correct_text",
      requestOptions
    );
    let data = await response.json();
    this.data.correctedText = data.corrected_text;

    this.setState({ loading: false });
    console.log(this.data.correctedText);

    if (this.data.correctedText == this.data.query) {
      this.handleMessageAfterCorrectedText("No");
    } else {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            text: `Did you mean: "${this.data.correctedText}"? `,
            author: "bot",
            type: "mcq",
            options: ["No", "Yes"],
          },
        ],
      });
      this.removeAnswerFromData();
    }
  }

  async handleMessageAfterCorrectedText(message) {
    this.setState({ loading: true });
    if (message.text == "Yes") {
      this.data.query = this.data.correctedText;
    }
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ query: this.data.query }),
    };
    let response = await fetch(
      "http://localhost:8080/get_answer",
      requestOptions
    );
    let data = await response.json();
    this.data.sentences = data.sentences;
    this.setState({ loading: false });
    this.sendAnswer(this.data.sentences);
  }

  displayAllAnswers() {
    this.setState({
      messages: [
        ...this.state.messages,
        ...this.data.sentences.map((sentence) => {
          return {
            text: sentence.sentence,
            author: "bot",
            type: "answer",
            sentence: sentence,
          };
        }),
        {
          text: "Please contact the admin department for more information!",
          author: "bot",
        },
      ],
    });
  }

  async handleMessageAfterAnswered(message) {
    if (message.text == "Yes") {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            text: "Happy to help!",
            author: "bot",
          },
        ],
      });
    } else {
      if (this.data.sentences.length > 0) {
        this.displayAllAnswers();
      } else {
        this.setState({
          messages: [
            ...this.state.messages,
            {
              text: "Please contact the admin department for more information!",
              author: "bot",
            },
          ],
        });
      }
    }
    this.clearData();
  }

  sendAnswer() {
    if (this.data.sentences == 0) {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            text: "I'm sorry, I don't know how to respond to that!",
            author: "bot",
          },
        ],
      });
      this.data.state = "start";
    } else {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            text: this.data.sentences[this.data.answerChosen].sentence,
            author: "bot",
            type: "answer",
            sentence: this.data.sentences[this.data.answerChosen],
          },
          {
            text: "Did you find the answer useful?",
            author: "bot",
            type: "mcq",
            options: ["No", "Yes"],
          },
        ],
      });
      this.removeAnswerFromData();
      this.data.state = "answered";
    }
  }

  askAboutTopics() {
    let topics = [
      ...new Set(this.data.sentences.map((sentence) => sentence.topic)),
    ];
    this.data.topics = topics;
    if (this.data.topics.length <= 1) {
      this.handleMessageAfterTopics({
        text: "1",
      });
      return;
    }
    let question = `Which of the following is the question related to:`;
    this.setState({
      messages: [
        ...this.state.messages,
        {
          text: question,
          author: "bot",
          type: "mcq",
          options: this.data.topics,
        },
      ],
    });
    this.data.state = "topics";
  }
}

export default Chatbot;
