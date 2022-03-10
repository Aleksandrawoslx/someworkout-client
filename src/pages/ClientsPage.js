import {
  Box,
  Heading,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "grommet";

import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import axios from "axios";
import { FolderOpen, Trash } from "grommet-icons";
const SW_API_URL = process.env.REACT_APP_API_URL;

function ClientsPage() {
  const [userDetails, setUserDetails] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${SW_API_URL}/api/users/${user._id}`)
      .then((response) => {
        setUserDetails(response.data);
      })
      .then(() => {
        setLoaded(true);
      });
  }, [loaded]);

  const handleDelete = (e) => {

    const clientToDelete = e.target.id

    console.log(userDetails.userClients)

    const newClients = userDetails.userClients.filter(element => {
      return element._id !==e.target.id
    })

    setUserDetails(previous => {
      return {...previous, userClients: newClients}
    })

    axios.put(`${SW_API_URL}/api/users/${user._id}`, userDetails)

   
  };

  return (
    <Box>
      <Box>
        <Heading>Clients</Heading>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom"></TableCell>
              <TableCell scope="col" border="bottom">
                SurName
              </TableCell>
              <TableCell scope="col" border="bottom">
                Name
              </TableCell>
              <TableCell scope="col" border="bottom">
                No of meets
              </TableCell>
              <TableCell scope="col" border="bottom"></TableCell>
              <TableCell scope="col" border="bottom"></TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loaded
              ? userDetails.userClients.map((element, index) => {
                  return (
                    <TableRow key={element._id}>
                      <TableCell scope="col" border="bottom">
                        {index + 1}
                      </TableCell>

                      <TableCell scope="col" border="bottom">
                        <strong>{element.surname}</strong>
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        {element.name}
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        {element.clientMeets.length}
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        <Link to={`/clients/${element._id}`}>
                        <FolderOpen/>
                        </Link>
                        
                      </TableCell>
                      <TableCell scope="col" border="bottom">
                        <Trash id={element._id} onClick={handleDelete} />
                      </TableCell>
                    </TableRow>
                  );
                })
              : "loading..."}
          </TableBody>
        </Table>
      </Box>
      <Link to="/addclient">Add New Client</Link>
    </Box>
  );
}

export default ClientsPage;
