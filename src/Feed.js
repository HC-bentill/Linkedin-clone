import React, { useState, useEffect } from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import InputOption from "./InputOption";
import Post from "./Post";
import { db } from "./firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import FlipMove from "react-flip-move";

function Feed() {
  const user = useSelector(selectUser);

  const [input, setInput] = useState("");
  // if changes has to be made to the default value of post, SetPost would be used to update the state
  //so at the moment post = emptyarray []
  const [posts, setPosts] = useState([]);

  //create a collection "posts" and then the snapshot is a realtime connection to the firebase db
  //  whatever happens in the db, snapshot reports it in real time(CRUD)
  // Remember setPosts is used to update posts when component renders posts was []. now it has content from the db
  // so now using setPosts , posts is being updated with the content from the db
  //in a collection there ares so many docs inside the collection, so we map through the docs, docs is an array btw
  //so basically each time a message is created in the db, it updates posts which was an empty array
  // the useeffect is use to pull from the db and the setinput is used to insert into db
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          // post is now set to the content from the db
          snapshot.docs.map((doc) => ({
            id: doc.id, //document id in the database
            data: doc.data(), //data of the document
          }))
        )
      );
  }, []);

  // the sendPost function pushes text into the db
  //the add() method create a new object with properties in the db
  const sendPost = (e) => {
    e.preventDefault(); //prevent refreshing after form is submitted
    //insert into db collection the following properties
    db.collection("posts").add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              value={input}
              placeholder="Write a post "
              type="text"
              onChange={(e) => setInput(e.target.value)} //input was empty ,now input has been updated with what has been typed inside the form, and is sent to the db
            />
            <button type="submit" onClick={sendPost}>
              Send{" "}
            </button>
          </form>
        </div>

        <div className="feed__inputOptions">
          <InputOption title="Photo" Icon={ImageIcon} color="#70B5f9" />
          <InputOption title="Video" Icon={SubscriptionsIcon} color="#E7A33E" />
          <InputOption title="Event" Icon={EventNoteIcon} color="#C0CBCD" />
          <InputOption
            title="Write article"
            Icon={CalendarViewDayIcon}
            color="#7FC15E"
          />
        </div>
      </div>
      {/* Now after the message has been pushed by sendPost() , you pull the content from the db into the component by using map()*/}
      {/* post was an empty array , but now it is being filled with data from the db each time the form is submitted */}
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
