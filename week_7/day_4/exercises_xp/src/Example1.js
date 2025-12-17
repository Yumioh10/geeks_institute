import React from "react";
import data from "./Example3";

class SocialMedias extends React.Component {
  constructor(props) {
    super(props);
    // You can access the data here if needed
    this.state = {
      socialMedias: data.SocialMedias || [],
    };
  }

  render() {
    const { socialMedias } = this.state;

    // Check if data exists
    if (!socialMedias || socialMedias.length === 0) {
      return <p>No social media links available.</p>;
    }

    return (
      <ul>
        {data.SocialMedias.map((sm) => (
          <li>{sm}</li>
        ))}
      </ul>
    );
  }
}

export default SocialMedias;