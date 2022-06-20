import styled from "styled-components";
import { ImCross } from "react-icons/im";
import colorPallete from "../style/colorPallete";

const CloseButton = ({}: {}): JSX.Element => {
  return (
    <StyledButton>
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
