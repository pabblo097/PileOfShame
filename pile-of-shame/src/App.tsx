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
      <Container>
        <>
          <h2>IOfuhdsaf</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos autem
            magni voluptatibus et mollitia accusantium fugit illo hic ullam
            asperiores rem voluptas, ad consectetur doloribus nobis repudiandae
            perspiciatis assumenda explicabo. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Saepe unde ipsa delectus aspernatur
            illum adipisci, fuga reprehenderit sed accusamus, facilis magni
            quasi nostrum perspiciatis error corrupti velit id ad suscipit.
          </p>
        </>
      </Container>
      {/* <Main /> */}
      {/* <Background /> */}
    </RootContainer>
  );
}

export default App;
