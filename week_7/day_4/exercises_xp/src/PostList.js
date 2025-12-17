import React from "react";

class PostList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      content: "",
      date: "",
      slug: "",
    };
  }
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{this.props.title}</h1>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default PostList;