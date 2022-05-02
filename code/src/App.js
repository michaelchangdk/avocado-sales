import AvocadoHome from "./components/AvocadoHome";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <AvocadoHome />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 325px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media (min-width: 1100px) {
    width: 900px;
  }
`;
