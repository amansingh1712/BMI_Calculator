import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

export const HomePage = () => {
  const [formData, setFormData] = useState({});

  const [bmiData, setBmiData] = useState([]);
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");

  const nav = useNavigate();
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios
      .get(`https://morning-bayou-54068.herokuapp.com/profile/${userid}/bmi`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(({ data }) => {
        setBmiData(data.reverse());
      });
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    let weight = formData.weight;
    let height = (formData.height / 100) ** 2;

    let bmiValue = weight / height;

    try {
      const { data } = await axios.post(
        `https://morning-bayou-54068.herokuapp.com/profile/${userid}/bmi`,
        { bmi: bmiValue.toFixed(2) },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      nav("/home");
    } catch (err) {
      console.log("err:", err);
    }
  };

  return (
    <>
      <Box
        w="70%"
        m="auto"
        p={10}
        mt={20}
        border="none"
        borderColor={"gray"}
        borderRadius={10}
      >
        <VStack spacing={4} align="flex-start" w="full">
          <VStack spacing={1} align="flex-start" w="full" mb="10">
            <Heading>Calculate Your BMI</Heading>
          </VStack>
          <form display="flex" onSubmit={handleSubmit}>
            <Input
              mb={5}
              type="text"
              w="250px"
              name="height"
              onChange={handleChange}
              placeholder="height in cm"
            />
            <Input
              mb={5}
              type="number"
              w="250px"
              name="weight"
              onChange={handleChange}
              placeholder="Weight in kg"
            />

            <Input type="submit" w="250px" color="lightcoral" bg="beige" />
          </form>
        </VStack>
      </Box>
      <Box
        w="70%"
        m="auto"
        p={10}
        mt={20}
        border="none"
        borderColor={"gray"}
        borderRadius={10}
      >
        <Heading mt="0" mb="20" textAlign="center">
          Your BMI Record
        </Heading>
        <TableContainer>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Date & Time</Th>
                <Th>BMI</Th>
              </Tr>
            </Thead>
            <Tbody>
              {bmiData &&
                bmiData.map((e) => {
                  return (
                    <Tr key={e._id}>
                      <Td>{e.date}</Td>
                      <Td>{e.bmi}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
