import React from "react";
import { Box, Form, Grommet } from "grommet";
import { Link } from "react-router-dom";

import "./CollapsableNav.css";

import { useContext, useState } from "react"; // <== IMPORT
import { AuthContext } from "../../context/auth.context"; // <== IMPORT

import { Nav, Anchor, Button, Notification } from "grommet";
import { Home, Login, FormAdd, Logout } from "grommet-icons";

const CollapsableNav = () => {
  const [visibleLogout, setVisibleLogout] = useState(false);

  const {
    isLoggedIn,
    user, // <== UPDATE
    logOutUser,
  } = useContext(AuthContext); // <== ADD

  return (
    <Box>
      {visibleLogout && (
        <Notification
          container={{ background: { color: "background-front" } }}
          toast={{ position: "top-right" }}
          background="brand"
          status="normal"
          title="Status"
          message="You have been logged out"
          onClose={() => setVisibleLogout(false)}
        />
      )}

      <Nav direction="column" align="center" background="brand" pad="medium">
        <Link className="left-menu" to="/">
          <Home />
          Home
        </Link>

        {isLoggedIn && (
          <>
            {/* <Link color="white" to="/">
            Wods
          </Link> */}

            {/*   UPDATE   */}
            <Button
              secondary
              label="Logout"
              onClick={() => {
                logOutUser();
                setVisibleLogout(true);
              }}
            />

            {/* <span> {user && user.name}</span> */}
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link className="left-menu" color="white" to="/signup">
              <FormAdd />
              Sign Up{" "}
            </Link>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link className="left-menu" color="white" to="/login">
              {" "}
              <Login />
              Login{" "}
            </Link>
          </>
        )}
      </Nav>
    </Box>
  );
  // Uncomment <Grommet> lines when using outside of storybook
};

export default CollapsableNav;
