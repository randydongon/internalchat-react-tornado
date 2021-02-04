import React, { useState } from "react";
import "../css/ChatBox.css";
import { Card, IconButton, FormControl } from "@material-ui/core";
import avaicon from "../../images/avaicon.jpg";
import images from "../ProjectImages/ProjectImages";
import ReactLoading from "react-loading";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    width: theme.spacing(75),
    height: theme.spacing(66),
    padding: theme.spacing(1),
    justifyContent: "center",
  },
  card__header: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    top: 0,
  },
  card__messagebody: {
    display: "flex",
    position: "relative",
    height: theme.spacing(100),
    width: "100%",
    padding: theme.spacing(1),
    backgroundColor: "#eee",
    justifyContent: "center",
  },
  card__input: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  card__formcontrol: {},
}));

export default function ChatBox() {
  const classes = useStyles();

  const [messageEnd, setMessageEnd] = useState("");
  const [isShowSticker, setIsShowSticker] = useState();
  const [inputValue, setInputValue] = useState("");
  const [refInput, setRefInput] = useState();

  const renderSticker = () => {};

  const onSendMessage = () => {};
  const onChoosePhoto = () => {};

  const openListSticker = () => {};

  const onKeyboardPress = () => {};

  return (
    <Card className={classes.root}>
      <div className={classes.card__header}>
        <img
          src={avaicon}
          style={{ with: "15px", height: "15px" }}
          alt=""
          className="viewAvatarItem"
        />
        <span className="textHeaderChatBoard">
          <p style={{ fontSize: "20px" }}>{"Peer user name"}</p>
        </span>
        <div className="aboutme">
          <span>
            <p>{"Peer user description"}</p>
          </span>
        </div>
      </div>

      <div className={classes.card__messagebody}>
        <form action="">
          <FormControl className={classes.card__formcontrol}>
            <input
              type="text"
              className={classes.card__input}
              placeholder="Type a message"
              value={inputValue}
              onChange={(event) => {
                this.setState({ inputValue: event.target.value });
              }}
              onKeyPress={onKeyboardPress}
            />
          </FormControl>
        </form>
      </div>

      {/* {true ? (
        <div className="viewLoading">
          <ReactLoading
            type={"spin"}
            color={"#203152"}
            height={"3%"}
            width={"3%"}
          />
        </div>
      ) : null} */}
    </Card>
  );
}
