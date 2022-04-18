import { Box, Button, Heading } from "grommet";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

import { Link } from "react-router-dom";
import WodCard from "../components/WodCard";

export default function MyWorkoutsPage() {
  const { user } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/${user._id}`)
      .then((response) => {
        setUserDetails(response.data);
      });
  }, []);

  const [wodArr, setWods] = useState([]);

  useEffect(() => {
    fetchWods();
  }, []);

  const fetchWods = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/wods`)
      .then((response) => {
        setWods(response.data);
        console.log(response.data);
      })
      .catch((e) => console.log("error getting workouts...", e));
  };
  return (
    <Box>
      <Heading>My Workouts</Heading>

      <Box fill pad={{ top: "large" }} direction="row" wrap justify="around">
        {wodArr
          .filter((element) => {
            return element.owner == user._id;
          })
          .map((element) => {
            return (
              <WodCard
                key={element._id}
                data={element}
                userDetails={userDetails}
              />
            );
          })}
      </Box>
      <Link to="/addworkout">Add Workout</Link>
    </Box>
  );
}
