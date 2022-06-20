import styled from "styled-components";
import "./App.css";
import Background from "./components/Background";
import Container from "./components/Container";
import Header from "./components/Header";
import Main from "./components/Main";

const RootContainer = styled.div`
  max-width: 1044px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 0 10px;
`;

function App() {
  return (
    <RootContainer>
      <Header />
      {/* <Container>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos autem
        magni voluptatibus et mollitia accusantium fugit illo hic ullam
        asperiores rem voluptas, ad consectetur doloribus nobis repudiandae
        perspiciatis assumenda explicabo.
      </Container> */}
      {/* <Main /> */}
      {/* <Background /> */}
    </RootContainer>
  );
}

export default App;
