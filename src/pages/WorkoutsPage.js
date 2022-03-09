import { Box } from "grommet";
import axios from "axios";
import { useState, useEffect } from "react";

import WodCard from "../components/WodCard";

function WorkoutsPage() {
  const [wods, setWods] = useState([]);
  const SW_API_URL = process.env.REACT_APP_API_URL;

  const storedToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`${SW_API_URL}/api/wods`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response.data);
        setWods(response.data);
      });
  }, []);

  return (
    <Box fill pad={{ top: "large" }} direction="row" wrap justify="around">
      {wods.map((element) => {
        return <WodCard key={element._id} data={element} />;
      })}
    </Box>
  );
}

export default WorkoutsPage;
