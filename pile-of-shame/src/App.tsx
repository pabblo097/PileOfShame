import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Background from "./components/Background";
import Header from "./components/Header";
import About from "./pages/About";
import Games from "./pages/Games";
import Login from "./pages/Login";
import MyGames from "./pages/MyGames";
import NoMatch from "./pages/NoMatch";
import Register from "./pages/Register";

const RootContainer = styled.div`
  max-width: 1044px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 0 5px;
  align-items: stretch;
`;

function App() {
  return (
    <RootContainer>
      <Header />
      <main>
        <Routes>
          <Route path="/" />
          <Route path="mygames" element={<MyGames />} />
          <Route path="games" element={<Games />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>

      {/* <Background /> */}
    </RootContainer>
  );
}

export default App;
