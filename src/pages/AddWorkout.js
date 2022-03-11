import axios from "axios";
import { Navigate } from "react-router-dom";
import {
    Box,
    Button,
    Header,
    Heading,
    Form,
    FormField,
    Notification,
    TextInput,
  } from "grommet";
  import { Add, Trash } from "grommet-icons";
  import React, { useState, useContext } from "react";
  import { AuthContext } from "../context/auth.context";
  
  export default function AddWorkout() {

    const {user} = useContext(AuthContext)


    const [visibleEdit, setVisibleEdit] = useState(false)

    const SW_API_URL = process.env.REACT_APP_API_URL;

    
    const [values, setValues] = useState({
      name: "",
      description: "",
      workout: [{ move: "", reps: 0 }],
      userAdded: true,
      owner: ""
    });
  
    const addMove = () => {
      const newMove = { move: "", reps: 0 };
      const newMoves = [...values.workout, newMove];
      setValues({ ...values, workout: newMoves });
    };
  
    const removeMove = (index) => {
      if (values.workout && values.workout.length > 0) {
        setValues({
          ...values,
          workout: values.workout.filter((v, _idx) => _idx !== index),
        });
      }
    };
  
    const handleFormChange = (newFormState) => {
      if (newFormState) {
        setValues(newFormState);
      }
    };

    const handleSubmit = (data) => {
        data.userAdded = true
        data.owner = user._id

        console.log(data)

        setVisibleEdit(true)
        

        axios
        .post(`${SW_API_URL}/api/wods`,data)
        .then((result)=>{
            console.log(result)
            setValues({
                description: "",
                name: "", 
                rounds: "",
                workout: [{ move: "", reps: 0 }],
                userAdded: true,
                
            })
        })
    }


    let movesGroup = null;
  
    if (values.workout !== undefined) {
      movesGroup = values.workout.map((move, index) => {
        return (
          <Box key={index} direction="row" justify="between" align="center">
            <FormField
              label="Move"
              name={`workout[${index}].move`}
              required
            ></FormField>
            <FormField
              label="Reps"
              name={`workout[${index}].reps`}
              required
            ></FormField>
            <Box>
              <Button
                icon={<Trash />}
                label="Remove"
                hoverIndicator
                onClick={() => {
                  removeMove(index);
                }}
              ></Button>
            </Box>
          </Box>
        );
      });
    }
  
    return (
      <Box>
        <Heading>Create a workout</Heading>

        { visibleEdit && <Notification
        container={{ background: { color: "background-front" } }}
        toast={{ position: "top-right" }}
        background="brand"
        status="normal"
        title="Status"
        message="Your workout has been added"
        onClose={() => setVisibleEdit(false)}
      />}
  
        <Form
          value={values}
          onReset={() => {
            setValues({
              name: "",
              description: "",
              workout: [{ move: "", reps: "" }],
              userAdded: true
            });
          }}
          onChange={handleFormChange}
          onSubmit={(event) => {

            handleSubmit(event.value)
            console.log("Submit: ", event.value);
          }}
        >
          <FormField name="name" htmlFor="text-input-id" label="Name">
            <TextInput id="text-input-id" name="name" />
          </FormField>
          <FormField name="rounds" htmlFor="text-input-id" label="Rounds">
            <TextInput id="text-input-id" name="rounds" />
          </FormField>
  
          <FormField
            name="description"
            htmlFor="text-input-id"
            label="Description"
          >
            <TextInput id="text-input-id" name="description" />
          </FormField>
          {movesGroup}
          <Button icon={<Add />} hoverIndicator onClick={addMove} />
          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" />
            <Button type="reset" label="Reset" />
          </Box>
        </Form>
      </Box>
    );
  }
  