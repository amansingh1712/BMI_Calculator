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

export const Signup = () => {
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
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("formData:", formData);

    try {
      const { data } = await axios.post(
        "https://morning-bayou-54068.herokuapp.com/auth/signup",
        formData
      );
      console.log("data:", data);
      if (data.message == "Username already exist") {
        toast({
          title: `username already exist`,
          status: "info",
          position: "top",
          isClosable: true,
          color: "white",
        });
        return;
      }
      toast({
        title: `Signup Successful`,
        status: "success",
        position: "top",
        isClosable: true,
        color: "white",
      });
      nav("/login");
    } catch (err) {
      console.log("err:", err);
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
            <Heading>Signup</Heading>
          </VStack>
          <form onSubmit={handleSignup}>
            <FormControl>
              <Input
                rounded="none"
                variant="filled"
                placeholder="name"
                onChange={handleChange}
                name="name"
              />
            </FormControl>
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
              Signup
            </Button>
          </form>
        </VStack>
      </Box>
    </>
  );
};
