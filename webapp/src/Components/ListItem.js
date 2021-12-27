import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../context";

import { EditOutlined, DeleteOutlined } from "@mui/icons-material";

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 0.3fr 0.1fr 0.1fr;
  background: white;
  border-radius: 1rem;
  height: 40px;
  align-items: center;
  padding: 1rem 1rem;
`;

const ListItem = (props) => {
  const { setOpenModal } = useContext(AppContext);

  const current = props.profile;

  const handleClick = () => {
    console.log("trash can clicked");
    props.parentCallback(current.id);
    setOpenModal(true);
  };
  return (
    <Wrapper>
      <h1>
        {current.name} {current.surname}
      </h1>
      <h2>{current.phone}</h2>
      <h2>{current.birthDate}</h2>
      <Button>
        <Link to={`/view/${current.id}`}>
          <EditOutlined />
        </Link>
      </Button>
      <Button variant="outline" onClick={handleClick}>
        <DeleteOutlined />
      </Button>
    </Wrapper>
  );
};

export default ListItem;
