import { IconButton, Menu, MenuItem, Tooltip, Badge } from "@material-ui/core";
import {
  AttachFile,
  Camera,
  MoreVert,
  SearchOutlined,
  Send,
} from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import "../css/Chat.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChatEmail,
  selectChatId,
  selectChatName,
  setChat,
} from "../features/chatSlice";
import { auth, db } from "./firebase";
import firebase from "firebase";
import { proflieIsOpen, selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move";
import { storage } from "./firebase";
import {
  closeCamera,
  openCamera,
  resetCamerImage,
  selectCamera,
  selectCameraImage,
} from "../features/cameraSlice";
import WebcamCapture from "./WebcamCapture";
import { v4 as uuid } from "uuid";
import useSound from "use-sound";
import notification from "./notification.mp3";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Chat() {
  const messagesEndRef = useRef(null);
  const camera = useSelector(selectCamera);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const chatname = useSelector(selectChatName);
  const chatid = useSelector(selectChatId);
  const chatemail = useSelector(selectChatEmail);

  const user = useSelector(selectUser);
  const [input, setinput] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setimage] = useState(null);
  const [progress, setProgress] = useState(0);
  const imagesrc = useSelector(selectCameraImage);
  const [play] = useSound(notification);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFile = (e) => {
    setimage(e.target.files[0]);
  };

  const handleSignOut = () => {
    auth.signOut();
  };

  const handleProfile = () => {
    dispatch(proflieIsOpen());
  };

  const opencamera = () => {
    dispatch(openCamera());
  };

  const handleDeleteChat = () => {
    if (chatid) {
      db.collection("chatgroup")
        .doc(chatid)
        .delete()
        .then(() => {
          dispatch(
            setChat({
              chatId: null,
              chatName: null,
            })
          );
        });

        toast('delete successfully !')
    }
  };

  useEffect(() => {
    if (chatid) {
      db.collection("chatgroup")
        .doc(chatid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
          );
        });
    }
  }, [chatid]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (image != null) {
      const uploadtask = storage.ref(`images/${image?.name}`).put(image);
      uploadtask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error, "error");
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              db.collection("chatgroup")
                .doc(chatid)
                .collection("messages")
                .add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  message: input,
                  uid: user.uid,
                  photo: user.photo,
                  email: user.email,
                  displayName: user.displayName,
                  imagepost: urls || null,
                });
            });
        }
      );
    } else if (imagesrc) {
      const id = uuid();

      const uploadtask = storage
        .ref(`images/${id}`)
        .putString(imagesrc, "data_url");

      uploadtask.on(
        "state_changed",
        null,
        (error) => {
          console.log(error, "error");
        },
        () => {
          storage
            .ref("images")
            .child(id)
            .getDownloadURL()
            .then((urls) => {
              db.collection("chatgroup")
                .doc(chatid)
                .collection("messages")
                .add({
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  message: input,
                  uid: user.uid,
                  photo: user.photo,
                  email: user.email,
                  displayName: user.displayName,
                  imagepost: urls || null,
                });
              dispatch(resetCamerImage());
              dispatch(closeCamera());
            });
        }
      );
    } else {
      db.collection("chatgroup").doc(chatid).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
        imagepost: null,
      });

      if (user.email !== chatemail) {
        emailjs
          .send(
            "service_ytoz8zu",
            "template_ywb61q7",
            {
              from_name: `${user.displayName}(${user.email})`,
              to_name: `${chatname} member`,
              to_message: input,
              to_mail: chatemail,
            },
            "user_YVQCHSsWLsfi6xTIqaS1B"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );
      }
    }

    setinput("");
    setimage(null);
    setProgress(0);
    play();
  };

  return (
    <>
      <div className="chat">
        <div className="chat__header">
          <h4>
            To:<span className="chat__name"> {chatname}</span>{" "}
          </h4>
          <div className="chat__headericons">
            <Tooltip title="Search">
              <IconButton>
                <SearchOutlined />
              </IconButton>
            </Tooltip>

            <Tooltip title="Menu">
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVert />
              </IconButton>
            </Tooltip>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              {chatemail === user?.email && (
                <MenuItem onClick={handleDeleteChat}>Delete</MenuItem>
              )}

              <MenuItem onClick={handleSignOut}>Logout</MenuItem>
            </Menu>
          </div>
        </div>

        {camera ? (
          <WebcamCapture />
        ) : (
          <>
            <div className="chat__body">
              <FlipMove>
                {messages.map(
                  ({
                    id,
                    data: { timestamp, message, email, photo, imagepost },
                  }) => (
                    <Message
                      key={id}
                      timestamp={timestamp}
                      message={message}
                      email={email}
                      photo={photo}
                      imagepost={imagepost}
                      id={id}
                    />
                  )
                )}
              </FlipMove>
              <div ref={messagesEndRef} />
            </div>
          </>
        )}

        <div className="chat__input">
          <Tooltip title="Camera">
            <IconButton>
              <Camera onClick={opencamera} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Gallery">
            <IconButton variant="contained" component="label">
              <Badge badgeContent={`${progress}%`} color="error">
                <AttachFile />
              </Badge>

              <input
                type="file"
                hidden
                onChange={handleFile}
                onClick={(event) => {
                  event.target.value = null;
                }}
              />
            </IconButton>
          </Tooltip>
          <form>
            <input
              value={input}
              onChange={(e) => {
                setinput(e.target.value);
              }}
              type="text"
              placeholder="Type here message "
            />
            <button
              onClick={sendMessage}
              disabled={!input && !image && !imagesrc}
            >
              {" "}
              Send Message{" "}
            </button>
          </form>
          <IconButton
            onClick={sendMessage}
            disabled={!input && !image && !imagesrc}
          >
            <Send />
          </IconButton>
        </div>
        <ToastContainer position="top-center" autoClose={3000}>
        </ToastContainer> 
      </div>
    </>
  );
}

export default Chat;
