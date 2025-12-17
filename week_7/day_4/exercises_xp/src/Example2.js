import React from "react";
import data from "./exercise3.json";

class Skills extends React.Component {
  constructor(props) {
    super(props);
    // You can access the data here if needed
    this.state = {
      skills: data.Skills || [],
    };
  }

  render() {
    const { skills } = this.state;

    // Check if data exists
    if (!skills || skills.length === 0) {
      return <p>No social media links available.</p>;
    }

    return (
      <div>
        {skills.map((skillArea, index) => (
          <div key={index} className="skill-area">
            {/* Render the Area string */}
            <h4>{skillArea.Area}</h4>

            {/* Render the SkillSet array */}
            <ul>
              {skillArea.SkillSet.map((skill, skillIndex) => (
                <li key={skillIndex}>
                  {/* If skill is an object with Name property */}
                  {typeof skill === "object" ? skill.Name : skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default Skills;