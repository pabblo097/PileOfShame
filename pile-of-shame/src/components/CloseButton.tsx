import styled from "styled-components";
import { ImCross } from "react-icons/im";
import colorPallete from "../style/colorPallete";
import { useNavigate } from "react-router-dom";

const CloseButton = ({}: {}): JSX.Element => {
  const navigate = useNavigate();

  return (
    <StyledButton onClick={() => navigate("/")}>
      <ImCross />
    </StyledButton>
  );
};

export default CloseButton;

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;
  font-size: x-large;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: ${colorPallete.gold};
  }
`;
