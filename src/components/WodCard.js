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
  
  function WodCard({ data }) {
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
            <Button icon={<Favorite color="red" />} hoverIndicator />
          </Tip>
          <Tip content="add to My Client">
            <Button icon={<ShareOption color="plain" />} hoverIndicator />
          </Tip>
        </CardFooter>
      </Card>
    );
  }
  
  export default WodCard;
  