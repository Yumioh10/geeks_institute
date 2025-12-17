import React, { Component } from "react";

class WebhookButton extends Component {
  // Simple function to send data and log to console
  sendData = async () => {
    console.log("📤 Sending data to webhook...");

    const WEBHOOK_URL =
      "https://webhook.site/850c6c2b-bb2d-4c2f-b982-30fe11f0e908";

    const data = {
      key1: "myusername",
      email: "mymail@gmail.com",
      name: "Isaac",
      lastname: "Doe",
      age: 27,
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);

      // Try to parse as JSON if possible
    } catch (error) {
      console.error("❌ Error sending data:", error);
      console.error("Error message:", error.message);
    }
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <button
          onClick={this.sendData}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          Click to post some Data
        </button>

        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "15px",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        ></div>
      </div>
    );
  }
}

export default WebhookButton;