// src/pages/SignupPage.js

import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import env from "react-dotenv";

import { Button, Box, Form, FormField, TextInput, Notification } from "grommet";

const SW_API_URL = process.env.REACT_APP_API_URL;
// const API_URL = process.env.SW_API;

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${SW_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const [visibleRegister, setVisibleRegister] = useState(false);

  return (
    <Box align="center" flex justify="center">
      <Box align="center">
        <h1>Sign Up</h1>

        <Box width="medium" align="center">
          <Form onSubmit={handleSignupSubmit}>
            <FormField name="name" htmlFor="text-input-id" label="Name">
              <TextInput
                onChange={handleName}
                id="text-input-id"
                value={name}
                name="name"
              />
            </FormField>
            <FormField name="email" htmlFor="text-input-id" label="Email">
              <TextInput
                onChange={handleEmail}
                id="text-input-id"
                value={email}
                name="email"
              />
            </FormField>
            <FormField name="password" htmlFor="text-input-id" label="Password">
              <TextInput
                onChange={handlePassword}
                id="text-input-id"
                value={password}
                name="password"
              />
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" primary label="Submit" />
              <Button type="reset" label="Reset" />
            </Box>
          </Form>
        </Box>
      </Box>

      {/* <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <button type="submit">Sign Up</button>
      </form> */}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </Box>
  );
}

export default SignupPage;
