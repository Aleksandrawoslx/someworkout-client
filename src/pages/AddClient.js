import {
    Box,
    Button,
    DateInput,
    Form,
    FormField,
    RangeInput,
    TextInput,
  } from "grommet";
  import { useContext, useEffect, useState } from "react";
  import { AuthContext } from "../context/auth.context";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  
  export default function AddClient() {
    const [name, setName] = useState("");
    const [surname, setSurName] = useState("");
    const [birth, setBirth] = useState("");
    const [description, setDescription] = useState("");
    const { user } = useContext(AuthContext);
    const SW_API_URL = process.env.REACT_APP_API_URL;
    let navigate = useNavigate();
  
    const [userDetails, setUserDetails] = useState({});
  
    useEffect(() => {
      axios.get(`${SW_API_URL}/api/users/${user._id}`).then((response) => {
        setUserDetails(response.data);
      });
    }, []);
  
    const handleName = (e) => {
      setName(e.target.value);
    };
    const handleSurName = (e) => {
      setSurName(e.target.value);
    };
    const handleBirth = (e) => {
      // console.log(e);
      setBirth(e.value);
    };
  
    const handleDescription = (e) => {
      setDescription(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      const requestBody = { name, surname, birth, description };
  
      axios.post(`${SW_API_URL}/api/clients`, requestBody).then((response) => {
        console.log(response.data);
        const clientId = response.data._id;
        let userArr = userDetails.userClients;
        userArr.push(clientId);
  
        axios
          .put(`${SW_API_URL}/api/users/${user._id}`, { userClients: userArr })
          .then((response) => {
            navigate("/clients");
          });
      });
    };
  
    return (
      <Box>
        <Form onSubmit={handleSubmit}>
          <FormField name="name" htmlFor="text-input-id" label="Name">
            <TextInput
              value={name}
              id="text-input-id"
              name="name"
              onChange={handleName}
            />
          </FormField>
          <FormField name="surname" htmlFor="text-input-id" label="Surname">
            <TextInput
              value={surname}
              id="text-input-id"
              name="surname"
              onChange={handleSurName}
            />
          </FormField>
          <FormField name="birth" htmlFor="text-input-id" label="Birth">
            <DateInput
              value={birth}
              name="birth"
              format="mm/dd/yyyy"
              onChange={handleBirth}
            />
          </FormField>
  
          <FormField
            name="description"
            htmlFor="text-input-id"
            label="Description"
          >
            <TextInput
              value={description}
              id="text-input-id"
              name="description"
              onChange={handleDescription}
            />
          </FormField>
          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Box>
        </Form>
      </Box>
    );
  }
  