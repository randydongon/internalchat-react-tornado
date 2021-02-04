import React, { useEffect, useState, useRef } from "react";
import ChatBox from "./ChatBox";
import "../css/Chat.css";
import randy from "../../images/randy.jpg";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Button, Typography, TextField, Input } from "@material-ui/core";
import RenderUser from "./RenderUser";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import FlipMove from "react-flip-move";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "../js/Message";

const API = process.env.REACT_APP_API;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(100),
    //   height: theme.spacing(100),
    // },
  },
  leftpane: {
    flexDirection: "row",
    margin: theme.spacing(1),
    width: theme.spacing(50),
    height: theme.spacing(70),
  },
  rightpane: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    width: theme.spacing(100),
  },
  lefttop: {
    display: "flex",
    flex: 0,
    justifyContent: "space-between",
    "& > *": {
      margin: theme.spacing(1),
      height: "fit-content",
    },
    padding: theme.spacing(1),
    alignItems: "center",
  },
  leftbody: {
    flex: 1,

    margin: theme.spacing(1),
  },
  chat__message: {},
  chat__divform: {
    flex: 0,
  },
  chat__formcontrol: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  chat__input: {
    flex: 1,
    width: "100%",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  chat__iconbutton: {
    flex: 0,
  },
  chat__scrolltobottom: {
    minHeight: "200px",
    maxHeight: "470px",
  },
}));

export default function Chat({ history }) {
  const divref = useRef(null);
  const classes = useStyles();
  const [profile, setProfile] = useState([]);
  const [messages, setMessages] = useState([
    { username: "randy", text: "hello" },
    { username: "bodro", text: "hi there" },
  ]);
  const [username, setUserName] = useState("");
  const [input, setInput] = useState("");

  useEffect(async () => {
    const resp = await fetch(`${API}/users/profile`);
    const data = await resp.json();
    setProfile(
      data.map((doc) => ({
        name: doc.user_name,
        email: doc.email,
        id: doc._id["$oid"],
      }))
    );
  }, []);

  //   useEffect(() => {
  //     setUserName(prompt("Enter user:"));
  //   }, []);

  useEffect(async () => {
    const resp = await fetch(`${API}/receivemessage`);
    const data = await resp.json();

    setMessages(
      data.map((doc) => ({ username: doc.username, text: doc.text }))
    );
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setMessages([...messages, { username: username, id: "", text: input }]);

    const resp = await fetch(`${API}/sendmessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        text: input,
        id: "",
      }),
    });
    const data = await resp;
    setInput("");
  };

  const handleChange = () => {};

  //   useEffect(() => {
  //     divref.current.scrollIntoView({ behavior: "smooth" });
  //   }, []);

  return (
    <div className={classes.root}>
      <Paper variant="outlined" className={classes.leftpane}>
        <div className={classes.lefttop}>
          <Avatar alt="Cindy Baker" src={randy} />
          <Button color="primary" variant="contained">
            Logout
          </Button>
        </div>
        <div className={classes.leftbody}>
          <Typography variant="h6" component="h6">
            Contacts
          </Typography>
          <RenderUser profile={profile} />
        </div>
      </Paper>
      <Paper variant="outlined" square className={classes.rightpane}>
        {/* <div className={classes.chat__message}>
        <ScrollToBottom>
          <FlipMove
            enterAnimation="elevator"
            className={classes.chat__scrolltobottom}
            leaveAnimation="elevator"
          >
            {messages.map((message, index) => (
              <Message key={index} username={username} message={message} />
            ))}
          </FlipMove>
        </ScrollToBottom>
        </div>
        <div className={classes.chat__divform}>
          <form onSubmit={handleSendMessage} className="chat__form">
            <FormControl className={classes.chat__formcontrol}>
              <Input
                placeholder="Type a messsage"
                className={classes.chat__input}
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <IconButton
                disabled={!input}
                className={classes.chat__iconbutton}
                type="submit"
                color="primary"
                variant="contained"
                onClick={handleSendMessage}
              >
                <SendIcon />
              </IconButton>
            </FormControl>
          </form>
        </div> */}
        <ChatBox />
      </Paper>
    </div>
  );
}
