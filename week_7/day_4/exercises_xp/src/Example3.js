import React from "react";
import data from "./exercise3.json";

class Experiences extends React.Component {
  constructor(props) {
    super(props);
    // You can access the data here if needed
    this.state = {
      experiences: data.Experiences || [],
    };
  }

  render() {
    const { experiences } = this.state;

    // Check if data exists
    if (!experiences || experiences.length === 0) {
      return <p>No social media links available.</p>;
    }

    return (
      <div>
        {experiences.map((experience, index) => (
          <div key={index}>
            {/* Render the Area string */}
            <img src={experience.logo} alt="" />
            {/* Render the SkillSet array */}
            {experience.roles.map((role, Index) => (
              <div>
                <a href={experience.url}>{experience.companyName}</a>
                <div key={Index}>
                  <p>
                    <b>{role.title}</b>
                  </p>
                  <p>
                    {role.startDate} {role.location}
                  </p>
                  <p>{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Experiences;