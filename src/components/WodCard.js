import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  NameValueList,
  NameValuePair,
  Paragraph,
  Tag,
  Tip,
} from "grommet";
import { Favorite, ShareOption } from "grommet-icons";

function WodCard({ data, userDetails }) {
  const SW_API_URL = process.env.REACT_APP_API_URL;
  const { user } = useContext(AuthContext);

  const handleLike = () => {
    console.log(userDetails.userWods);
    userDetails.userWods.push(data._id);

    axios
      .put(`${SW_API_URL}/api/users/${user._id}`, {
        userWods: userDetails.userWods,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <Card margin={{ bottom: "large" }} width="medium" background="light-1">
      <CardHeader pad="medium">
        <Heading level={"3"}>{data.name}</Heading>
      </CardHeader>
      <CardBody pad="medium">
        <NameValueList>
          {data.workout.map((element, i) => {
            return (
              <NameValuePair name={element.move} key={i}>
                {element.reps}
              </NameValuePair>
            );
          })}
        </NameValueList>

        <Paragraph size="small">rounds: {data.rounds}</Paragraph>

        <Paragraph size="small">{data.description}</Paragraph>

        <Box direction="row" wrap>
          {data.tags.map((element) => {
            return <Tag size="small" key={element} value={element} />;
          })}
        </Box>
      </CardBody>

      <CardFooter pad={{ horizontal: "small" }} background="light-2">
        <Tip content="add to My Workouts">
          <Button
            icon={<Favorite color="red" />}
            hoverIndicator
            onClick={handleLike}
          />
        </Tip>
        <Tip content="add to My Client">
          <Button icon={<ShareOption color="plain" />} hoverIndicator />
        </Tip>
      </CardFooter>
    </Card>
  );
}

export default WodCard;
