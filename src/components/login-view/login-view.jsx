import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
  	event.preventDefault();

  	const data = {
  	  Username: username,
  	  Password: password
  	};

  	fetch(`https://still-depths-22545-dbe8396f909e.herokuapp.com/login?Username=${data.Username}&Password=${data.Password}`, {
  	  method: "POST",
  	  headers: {
  	  	"Content-Type": "application/json"
  	  },
  	  body: JSON.stringify(data)
  	})
  	  .then((response) => response.json())
  	  .then((data) => {
  	  	if (data.username) {
  	  	  localStorage.setItem("user", JSON.stringify(data.username));
  	  	  localStorage.setItem("token", data.token);
  	  	  onLoggedIn(data.username, data.token);
  	  	} else {
  	  	  alert("No such user");
  	  	}
  	  })
  	  .catch((e) => {
  	  	alert("Something went wrong...");
  	  })
  }

  return (
  	<Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        	<Form.Control
        	  type="text"
        	  value={username}
        	  onChange={(e) => setUsername(e.target.value)}
        	  required
        	  minLength="3"
        	/>
      </Form.Group>    
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        	<Form.Control
        	  type="password"
        	  value={password}
        	  onChange={(e) => setPassword(e.target.value)}
        	  required
        	/>
      </Form.Group>
      <Button variant="primary" type="submit" className="mb-3 mt-3">Submit</Button>
    </Form>
  );
};