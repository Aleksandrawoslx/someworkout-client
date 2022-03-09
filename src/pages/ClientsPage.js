import { Box, Paragraph } from "grommet";

import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import axios from "axios";
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
        console.log(userDetails.userClients);
      })
      .then(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <Box>
      <Box>
        {loaded ? (
          userDetails.userClients.map((element) => {
            return <Paragraph key={element._id}>{element.name}</Paragraph>;
          })
        ) : (
          <Paragraph> loading... </Paragraph>
        )}
      </Box>
      <Link to="/addclient">Add New Client</Link>
    </Box>
  );
}

export default ClientsPage;
