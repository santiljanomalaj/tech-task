import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import MainPage from "./Pages/MainPage";
import CreateUserPage from "./Pages/CreateUserPage";
import EditUserPage from "./Pages/EditUserPage";
import ViewUserPage from "./Pages/ViewUserPage";
import ErrorPage from "./Pages/ErrorPage";

const Container = styled.main`
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  background: var(--clr-background);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
`;

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create" element={<CreateUserPage />} />
          <Route path="/view/:id" element={<ViewUserPage />} />
          <Route path="/edit/:id" element={<EditUserPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
