import React, { useContext, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../context";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Typography, Button } from "@material-ui/core";
import Textfield from "../Components/FormUI/TextField";
import DateTimePicker from "../Components/FormUI/DateTimePicker";
import CustomAlert from "../Components/Alerts";

const Container = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
`;

const NonScrollable = styled.main`
  display: grid;
  grid-area: 2/2/4/4;
  justify-self: center;
  background: #565f79;
  color: white;
  padding: 10px 30px 0 30px;
  box-shadow: 2px 5px 10px black;
  border-radius: 5px;
  width: 300px;
  height: 500px;

  /* position:relative; */
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Header = styled.div`
  /* margin-bottom: 1rem; */
`;
const Footer = styled.div`
  margin: 1rem;
  /* position:absolute;
  bottom:0;
  left:0;
  right: 0; */
`;

export default function EditUserPage() {
  //   const { getOneUser } = useContext(AppContext);
  let { id } = useParams();
  const { editUser } = useContext(AppContext);
  let navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  let oldData = useLocation();
  let {
    name,
    surname,
    birthDate,
    phone,
    email,
    passportNumber,
    password,
    identity,
  } = oldData.state.user;

  let initialValues = {
    name,
    surname,
    birthDate,
    phone,
    email,
    passportNumber,
    password,
    passwordConfirmation: "",
    identity,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    surname: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    birthDate: Yup.date("Invalid Date").required("Required"),
    phone: Yup.string()
      .matches(
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
    console.log("Form data: ", values);
    editUser(values, id).then((res) => {
      console.log("edituser res", res);
      setSuccess(true);
    });
    setSuccess(false);
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  return (
    <NonScrollable>
      <Header>
        <h1 className="title">Edit details:</h1>
        <hr />
      </Header>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={onSubmit}
        // onSubmit={() => console.log("edit submitted")}
        validationSchema={validationSchema}
      >
        <Container>
          <br />
          <Form id="form1">
            <Grid container spacing={2} sx={{ m: 1 }}>
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
            <Footer>
              <FlexBox>
                <Button type="text" variant="outlined" onClick={()=> navigate(-1)}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={success}
                  color="primary"
                >
                  Submit
                </Button>
              </FlexBox>
            </Footer>
          </Form>
        </Container>
      </Formik>
      {success && (
        <CustomAlert message="User Edited Successfully" severity="success" />
      )}
    </NonScrollable>
  );
}
