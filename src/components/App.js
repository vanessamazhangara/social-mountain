import React, { Component } from "react";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    axios
      .get("https://practiceapi.devmountain.com/api/posts")
      .then((results) => {
        this.setState({ posts: results.data });
      });
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts/?id=${id}`)
      .then((results) => {
        this.setState({ posts: results.data });
      });
  }

  deletePost(id) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts/?=${id}`)
      .then((results) => {
        this.setState({ posts: results.data });
      });
  }

  createPost(text) {
    axios
      .post("https://practiceapi.devmountain.com/api/posts", { text })
      .then((results) => {
        this.setState({ posts: results.data });
      });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">
          <Compose />
          {posts.map((post) => (
            <Post
              id={post.id}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
              createPostFn={this.createPost}
              text={post.text}
              date={post.date}
              key={post.id}
            />
          ))}
        </section>
      </div>
    );
  }
}

export default App;
