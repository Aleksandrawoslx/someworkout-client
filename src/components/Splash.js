import { Box, Heading, Image } from "grommet";
import splashImg from "../splash.jpg";
import { Notification } from "grommet";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

function Splash() {
  const { user } = useContext(AuthContext);
  const [visibleLogin, setVisibleLogin] = useState(true);

  const greetName = user ? user.name : "!";

  return (
    <Box>
      {visibleLogin && user && (
        <Notification
          container={{ background: { color: "background-front" } }}
          toast={{ position: "top-right" }}
          background="brand"
          status="normal"
          title="You have logged in"
          message={`Hello ${greetName}`}
          onClose={() => setVisibleLogin(false)}
        />
      )}
      <Heading>SomeWorkout</Heading>
      <Image fit="cover" src={splashImg} />
    </Box>
  );
}

export default Splash;
