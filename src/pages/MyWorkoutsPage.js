import { Box, Button, Heading } from "grommet";
import { Link } from "react-router-dom";

export default function MyWorkoutsPage() {
  return (
    <Box>
      <Heading>My Workouts</Heading>
      <Link to="/addworkout">Add Workout</Link>
    </Box>
  );
}
