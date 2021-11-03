import React, { Component } from "react";
import { IconButton } from "@material-ui/core";
import { SendRounded } from '@material-ui/icons'
import "./chatbot.css";

class MessageInputBox extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.send = this.send.bind(this);
  }
  state = {
    message: {
      text: "",
      author: "user",
    },
  };
  render() {
    return (
      <React.Fragment>
        <div className="messageBox">
          <input
            type="text"
            value={this.state.message.text}
            className="messageInputBox margin"
            onChange={this.handleInputChange}
            placeholder="enter question"
          />
          <IconButton className="messageBoxSendButton" onClick={this.send}> <SendRounded /> </IconButton>
        </div>
      </React.Fragment>
    );
  }
  handleInputChange(event) {
    this.setState({
      message: { text: event.target.value, author: "user", type: "question" },
    });
  }
  send() {
    console.log(this.state.message);
    this.props.newUserMessage(this.state.message);
    this.setState({ message: { text: "", author: "user" } });
  }
}

export default MessageInputBox;
