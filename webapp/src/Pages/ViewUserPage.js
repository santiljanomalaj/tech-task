import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
`;

const DetailsGrid = styled.section`
  display: grid;
  justify-items: start;
  grid-template-columns: 0.2fr 1fr;
  /* line-height: 30px; */
  align-items: center;
`;

const EditButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  /* cursor: pointer; */
  outline: inherit;
  position: relative;
  left: 100%;
  bottom: 1%;
  padding: 1px;

  &:hover {
    background: gray;
    border-radius: 50%;
  }
  /* &:active {
    color: white;
  } */
`;

export default function ViewUserPage() {
  const { getOneUser } = useContext(AppContext);
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getOneUser(id).then((res) => {
      setUser(res);
    });
  }, [id, getOneUser]);

  //TODO map over user details
  return (
    <Container>
      <EditButton>
        <Link to={`/edit/${id}`} state={{ user }}>
          <img src="/icons/edit_black_24dp.svg" alt="edit pic" />
        </Link>
      </EditButton>
      {user.name && user.surname && <h1 className="title">{`${user.name} ${user.surname}`}</h1>}
      <hr />
      <br />
      <h2 className="subtitle">Details</h2>

      <DetailsGrid>
        <img src="/icons/email_black_24dp.svg" alt="" />
        <h1 className="detailTag">Email</h1>
        <br />
        <h1 className="detailData">{user.email}</h1>

        <img src="/icons/cake_black_24dp.svg" alt="" />
        <h1 className="detailTag">Birthday</h1>
        <br />
        <h1 className="detailData">{user.birthDate}</h1>

        <img src="/icons/call_black_24dp.svg" alt="" />
        <h1 className="detailTag">Phone</h1>
        <br />
        <h1 className="detailData">{user.phone}</h1>

        <img src="/icons/badge_black_24dp.svg" alt="" />
        <h1 className="detailTag">Identity</h1>
        <br />
        <h1 className="detailData">{user.identity}</h1>

        <img src="/icons/import_contacts_black_24dp.svg" alt="" />
        <h1 className="detailTag">Passport Number</h1>
        <br />
        <h1 className="detailData">{user.passportNumber}</h1>
      </DetailsGrid>
    </Container>
  );
}
