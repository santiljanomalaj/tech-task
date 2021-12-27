import React from "react";

import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const Grid = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-area: 2/2/4/4;
  border-radius: 5px;
  background: gray;
`;
export default function ErrorPage() {
  let navigate = useNavigate();

  return (
    <Grid>
      <h1>404</h1>
      <br />
      <h2>The page requested cannot be found</h2>
      <br />
      <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Grid>
  );
}
