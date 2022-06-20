import styled from "styled-components";
import colorPallete from "../style/colorPallete";

const StyledNav = styled.div`
  color: white;
  padding: 10px;
  cursor: pointer;

  &:hover {
    color: ${colorPallete.gold};
    border-bottom: ${colorPallete.gold} solid 2px;
    padding-bottom: 8px;
  }
`;

const NavItem = ({ name }: { name: string }): JSX.Element => {
  return <StyledNav>{name}</StyledNav>;
};

export default NavItem;
