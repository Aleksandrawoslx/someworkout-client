import axios from "axios";
import {
  Box,
  DateInput,
  Text,
  TextInput,
  RangeSelector,
  Stack,
  Heading,
} from "grommet";

import Fuse from "fuse.js";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import WodCard from "../components/WodCard";

function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const SW_API_URL = process.env.REACT_APP_API_URL;
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});

  const fuse = new Fuse(workouts, { keys: ["name", "tags", "workout.move"] });

  useEffect(() => {
    axios.get(`${SW_API_URL}/api/users/${user._id}`).then((response) => {
      
      setUserDetails(response.data);
    });
  }, []);

  const handleSearchInput = (e) => {
    setInputValue(e.target.value);
    const fuzzyResult = fuse.search(inputValue);
    console.log(inputValue);
    inputValue.length == 0
      ? setSearchResults([])
      : setSearchResults(fuzzyResult);
  };

  useEffect(() => {
    axios
      .get(`${SW_API_URL}/api/wods`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        const filteredData = (response.data).filter(element => {
          return element.userAdded === false
        })
        setWorkouts(filteredData);
      });
  }, []);

  return (
    <Box width="60vw">
      <Heading>Some Workout</Heading>
      <Box>
        <TextInput value={inputValue} onChange={handleSearchInput}></TextInput>
      </Box>
      <Box fill pad={{ top: "large" }} direction="row" wrap justify="around">
        {searchResults.length > 0
          ? searchResults.map((element) => {
              return (
                <WodCard
                  key={element.item._id}
                  data={element.item}
                  userDetails={userDetails}
                />
              );
            })
          : "hello"}
      </Box>
    </Box>
  );
}

export default HomePage;
