// src/pages/LoginPage.js

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import env from "react-dotenv";
import "./LoginPage.css";

import {
  Button,
  Box,
  Form,
  FormField,
  TextInput,
  Notification,
  Text,
} from "grommet";

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


const SW_API_URL = process.env.REACT_APP_API_URL;

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };
    console.log(requestBody);

    axios
      .post(`${SW_API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/"); // <== ADD
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Box height="100vh" justify="around">
      <Box
        pad={{ bottom: "large" }}
        width="medium"
        align="center"
        justify="center"
      >
        <h1>Login</h1>
        <Form onSubmit={handleLoginSubmit}>
          <FormField name="name" htmlFor="text-input-id" label="Email">
            <TextInput
              onChange={handleEmail}
              id="text-input-id"
              value={email}
              name="email"
            />
          </FormField>
          <FormField name="name" htmlFor="text-input-id" label="Password">
            <TextInput
              onChange={handlePassword}
              id="text-input-id"
              type="password"
              value={password}
              name="password"
            />
          </FormField>
          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Box>
        </Form>
        {/* <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form> */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Box pad={{ top: "large" }} align="center">
          <p>Don't have an account yet?</p>
          <Link color="light-2" to={"/signup"}>
            {" "}
            Sign Up
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
