import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";

import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("username");
  const toast = useToast();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    toast({
      title: `Logout Successful`,
      status: "success",
      position: "top",
      isClosable: true,
      color: "white",
    });
    navigate("/login");
  };

  return (
    <>
      <Box>
        <Flex
          h={16}
          alignItems={"center"}
          gap="100px"
          backgroundColor="lightblue"
          padding="20px"
        >
          <Text fontSize={20} fontWeight={600}>
            BMI Calculator
          </Text>
          {token ? null : <Link to="/login">Login</Link>}
          {token ? null : <Link to="/signup">Signup</Link>}
          {token ? (
            <Text fontSize={20} fontWeight={600}>
              Hello! {name.charAt(0).toUpperCase() + name.slice(1)}
            </Text>
          ) : null}
          {token ? <Button onClick={() => logout()}>Logout</Button> : null}
        </Flex>
      </Box>
    </>
  );
}
