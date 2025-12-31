import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
  	event.preventDefault();

  	const data = {
  	  Username: username,
  	  Password: password
  	};

  	fetch("https://still-depths-22545-dbe8396f909e.herokuapp.com/login", {
  	  method: "POST",
  	  headers: {
  	  	"Content-Type": "application/json"
  	  },
  	  body: JSON.stringify(data)
  	})
  	  .then((response) => response.json())
  	  .then((data) => {
  	  	if (data.user) {
  	  	  onLoggedIn(data.user, data.token);
  	  	} else {
  	  	  alert("No such user");
  	  	}
  	  })
  	  .catch((e) => {
  	  	alert("Something went wrong...");
  	  })
  }
}