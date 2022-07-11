import "./UsersPage.css";
import React from "react";
import { useState, useEffect } from "react";
import PetCard from "../../components/PetCard/PetCard";
import * as commentsAPI from "../../utilities/comments-api";
import Avatar, { ConfigProvider } from 'react-avatar';

const today = new Date().toLocaleDateString("en-us", {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
});

const moment = require("moment");

export default function UsersPage({ user, posts }) {
  ///////////////////////////
  // grab user posts
  ///////////////////////////
  const userPosts = posts?.filter((p) => p.user === user._id);
  ///////////////////////////
  // grab user comments
  ///////////////////////////
  const [userComments, setUserComments] = useState([]);
  useEffect(() => {
    // load comments only at the first time
    async function fetchComments() {
      const com = await commentsAPI.getUserComments(user._id);
      setUserComments(com);
    }
    fetchComments();
  }, [user._id]);
  return (
    <>
    <div id="accContainer">
      <h1>HI, {user.name.toUpperCase()}</h1>
      {/* <img src={user.userProfileImg}  alt="hello" width="200px"/> */}
      {/* (<Avatar name={ user.name } /> ) */}
      { user.userProfileImg === "" ? 
      (<ConfigProvider colors={['red', 'green', 'blue', 'pink', 'purple', 'orange', 'yellow']}>
        <Avatar name={ user.name } round={true}/>
      </ConfigProvider> )
       : (<img src={user.userProfileImg} alt="hello" width="200px"/>)
       }
      <p>All info as of {today}</p>
      <div className="user-info-container">
        <h3>YOUR EMAIL: {user.email}</h3>
        <h3>YOUR POSTS:</h3>
        {/* if I have post then show posts, else show "No Post yet" */}
        {userPosts?.length ? (
          <section className="user-posts-container">
            <ol>
              {userPosts?.map((post) => {
                return (
                  <li>
                    <PetCard key={post._id} post={post} />
                    created at:{" "}
                    {moment(post.createdAt).format("MM/DD/YYYY HH:mm")}
                  </li>
                );
              })}
            </ol>
          </section>
        ) : (
          <h3>No Posts Yet</h3>
        )}
      </div>
      {/* COMMENTS SECTION */}
      {/* if I have comments, else show "No Comments yet" */}
      <h3>YOUR COMMENTS:</h3>
      {userComments.length ? (
        <section className="user-comments-container">
          <ol>
            {userComments.map((c) => {
              return (
                <li>
                  <a href={`/${c.post}`}>{c.commentTitle}</a>
                </li>
              );
            })}
          </ol>
        </section>
      ) : (
        <h3>You haven't made any comments yet</h3>
      )}

      {/* after mvp */}
      {/* if someone comment our post, we got notification... */}
      {/* <h3>
        InMail: ??number?? - click then show the list - comment in the post
      </h3>  */}
      </div>
    </>
  );
}
