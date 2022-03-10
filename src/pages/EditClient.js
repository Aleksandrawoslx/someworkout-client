import axios from "axios"
import { Box, Button, Form, FormField, Heading, Notification, TextInput } from "grommet"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"


export default function EditClient() {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [description, setDescription] = useState("")

    const [visibleEdit, setVisibleEdit] = useState(false)

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleSurnameChange = (e) => {
        setSurname(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/api/clients/${clientId}`, {
            name: name,
            surname: surname,
            description: description
        })
        .then(response => {
            console.log(response)
            setVisibleEdit(true)
        })
    }

    const {clientId} = useParams()

    useEffect(() => {
        console.log(`${process.env.REACT_APP_API_URL}/api/clients/${clientId}`)
        axios.get(`${process.env.REACT_APP_API_URL}/api/clients/${clientId}`)
            .then(response => {
                console.log(response.data)
                setName(response.data.name)
                setSurname(response.data.surname)
                setDescription(response.data.description)
            })

    },[])
  return (

    


    


    <Box> 
        <Heading>
            Edit Client Details
        </Heading>
        
        { visibleEdit && <Notification
        container={{ background: { color: "background-front" } }}
        toast={{ position: "top-right" }}
        background="brand"
        status="normal"
        title="Status"
        message="Client details updated"
        onClose={() => setVisibleEdit(false)}
      />}
        
        <Form onSubmit={handleSubmit}
     
    >
      <FormField name="name" htmlFor="text-input-id" label="Name">
        <TextInput value={name} id="text-input-id" name="name" onChange={handleNameChange} />
      </FormField>
      <FormField name="surname" htmlFor="text-input-id" label="Surname">
        <TextInput value={surname} id="text-input-id" name="surname" onChange={handleSurnameChange} />
      </FormField>
      <FormField name="description" htmlFor="text-input-id" label="Description">
        <TextInput value={description} id="text-input-id" name="description"  onChange={handleDescriptionChange}/>
      </FormField>
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        
      </Box>
    </Form>
    </Box>
   
  )
}
