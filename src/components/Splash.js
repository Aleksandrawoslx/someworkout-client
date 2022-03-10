import {Box, Heading, Image} from "grommet"
import splashImg from "../splash.jpg"

function Splash() {
  return (
    <Box>
        <Heading>
            SomeWorkout
        </Heading>
  <Image
    fit="cover"
    src={splashImg}
  />
</Box>
  )
}


export default Splash
