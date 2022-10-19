import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";

export const Login = () => {
  const [formData, setFormData] = useState({});
  const nav = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://morning-bayou-54068.herokuapp.com/auth/login",
        formData
      );
      const { token } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("userid", data.userdata.userid);
      localStorage.setItem("username", data.userdata.name);
      toast({
        title: `Login Successful`,
        status: "success",
        position: "top",
        isClosable: true,
        color: "white",
      });

      nav("/home");
    } catch (err) {
      if (err.response.status === 401) {
        toast({
          title: `Invalid Credentials`,
          status: "error",
          position: "top",
          isClosable: true,
          color: "white",
        });
      }
    }
  };

  return (
    <>
      <Box
        w="full"
        p={10}
        mt={20}
        border="none"
        borderColor={"gray"}
        borderRadius={10}
      >
        <VStack spacing={4} align="flex-start" w="full">
          <VStack spacing={1} align="flex-start" w="full" mb="10">
            <Heading>Login</Heading>
          </VStack>
          <form onSubmit={handleLogin}>
            <FormControl>
              <Input
                rounded="none"
                variant="filled"
                placeholder="username"
                onChange={handleChange}
                name="username"
              />
            </FormControl>
            <FormControl>
              <Input
                rounded="none"
                variant="filled"
                placeholder="password"
                onChange={handleChange}
                name="password"
              />
            </FormControl>

            <Button rounded="none" colorScheme="blue" type="submit">
              Login
            </Button>
          </form>
        </VStack>
      </Box>
    </>
  );
};
