import React, {useEffect} from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName:'',
      email:'',
      type:'',
      comment:'',
    },
    onSubmit: (values) => {
      submit(null, values);
      console.log(values);
      onOpen(response.type, response.message);
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      comment: Yup.string().min(25, "Must be at least 25 characters").required('Required'),
    }),
  });

  useEffect(() => {
    if (response) {
      onOpen(response.type, response.message);
      if (response.type === "success") {
        formik.resetForm();
      }
    }
  }, [response]);

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={formik.touched.firstName && !!formik.errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                />
                { formik.errors.firstName ? <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage> : null }
              </FormControl>
              <FormControl isInvalid={formik.errors.email !== undefined && formik.touched.email}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                />
                { formik.errors.email ? <FormErrorMessage>{formik.errors.email}</FormErrorMessage> : null }
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" 
                  onChange={formik.handleChange}
                  value={formik.values.type}>
                  <option value="hireMe" style={{'color':'black'}}>Freelance project proposal</option>
                  <option value="openSource" style={{'color':'black'}}>
                    Open source consultancy session
                  </option>
                  <option value="other" style={{'color':'black'}}>Other</option>
                </Select>
              </FormControl>
              <FormControl isInvalid={formik.errors.comment !== undefined && formik.touched.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps("comment")}
                />
                { formik.errors.comment ? <FormErrorMessage>{formik.errors.comment}</FormErrorMessage> : null }
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
