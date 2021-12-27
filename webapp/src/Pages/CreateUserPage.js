import React, { useContext, useState } from "react";
import { AppContext } from "../context";
import styled from "styled-components";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Typography,Button } from "@material-ui/core";
import Textfield from "../Components/FormUI/TextField";
import DateTimePicker from "../Components/FormUI/DateTimePicker";
import CustomAlert from "../Components/Alerts";
import {useNavigate} from 'react-router-dom';

const Container = styled.div`
  grid-area: 2/2/4/4;
  background: #565f79;
  justify-self: center;
  color: white;
  width: 300px;
  height: 500px;
  border-radius: 5px;
  padding: 10px 30px 0 30px;
  box-shadow: 2px 5px 10px black;
  overflow-y: auto;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

export default function CreateUserPage() {
  const { createUser } = useContext(AppContext);
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState({
    visible: false,
    message: "",
    severity: "success",
  });
  

  const initialValues = {
    name: "",
    surname: "",
    birthDate: "",
    phone: "",
    email: "",
    passportNumber: "",
    password: "",
    passwordConfirmation: "",
    identity: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    birthDate: Yup.date("Invalid Date").required("Required"),
    // required("Required"),
    phone: Yup.string().matches(
      /^([\d][\W])?([(]?[\d]{3}[)]?)[\W][\d]{3}[\W][\d]{4}$/,
      "Please enter your phone number in a valid format. ex: X-XXX-XXX-XXXX"
    ),
    // .typeError(
    //   "Please enter a valid phone number with a format of XXX-XXX-XXXX"
    // )
    // .required("Required"),
    password: Yup.string()
      .min(5, "password must contain at least 5 characters")
      .required("Required"),
    passwordConfirmation: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    identity: Yup.string()
      .trim()
      // .required("Required")
      .matches(
        /^\d{3}[-]\d{2}[-]\d{4}$/,
        "Please enter your ID number in format: XXX-XX-XXXX"
      ),
    passportNumber: Yup.string()
      .trim()
      // .required("Required")
      .matches(
        /^\d{6}[\W]\d{4}$/,
        "Please enter your passport number in format: XXXXXXCXXXX"
      ),
  });

  const onSubmit = (values) => {
    console.log(values);
    createUser(values)
      .then((res) => console.log(res))
      .then(() => {
        let newState = {
          visible: true,
          message: "User Created Successfully",
          severity: "success",
        };
        setShowAlert(newState);
        setTimeout(() => navigate(-1),2000);
      });
  };

  return (
    <Container>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} justifyContent="center">
              <Typography variant="h4"color="textPrimary"  >Create User Form</Typography>
             
            </Grid>

            <Grid item xs={6}>
              <Textfield type="text" name="name" label="First Name" />
            </Grid>

            <Grid item xs={6}>
              <Textfield type="text" name="surname" label="Last Name" />
            </Grid>
            <Grid item xs={12}>
              <Textfield type="text" name="email" label="Email" />
            </Grid>

            <Grid item xs={12}>
              <Textfield type="password" name="password" label="Password" />
            </Grid>

            <Grid item xs={12}>
              <Textfield
                type="password"
                name="passwordConfirmation"
                label="Confirm Password"
              />
            </Grid>

            <Grid item xs={12}>
              <DateTimePicker
                id="birthDate"
                name="birthDate"
                label="Birthday"
              />
            </Grid>

            <Grid item xs={12}>
              <Textfield type="text" id="phone" name="phone" label="Phone " />
            </Grid>

            <Grid item xs={12}>
              <Textfield type="text" name="passportNumber" label="Passport" />
            </Grid>

            <Grid item xs={12}>
              <Textfield type="text" name="identity" label="identity" />
            </Grid>
          </Grid>

          <FlexBox>
            <Button type="text" variant="outlined" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </FlexBox>
        </Form>
      </Formik>

      {showAlert.visible && (
        <CustomAlert
          message={showAlert.message}
          severity={showAlert.severity}
        />
      )}
    </Container>
  );
}
