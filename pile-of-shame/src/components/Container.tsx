import styled from "styled-components";
import { devices } from "../style/breakpoints";
import colorPallete from "../style/colorPallete";
import CloseButton from "./CloseButton";

const Container = ({
  children,
  title = "Container",
}: {
  children: JSX.Element | string;
  title?: string;
}): JSX.Element => {
  return (
    <StyledArticle>
      <header>
        <h2>{title}</h2>
        <CloseButton />
      </header>
      <div>{children}</div>
    </StyledArticle>
  );
};

export default Container;

const StyledArticle = styled.article`
  background-color: ${colorPallete.darkBlueTransparent};
  color: white;
  margin: 10px 0;
  border: ${colorPallete.gold} solid 1px;
  border-radius: 15px;
  padding: 10px 20px;
  padding-bottom: 20px;
  box-shadow: 0px 0px 10px 0px rgba(66, 68, 90, 1);

  & header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: ${colorPallete.gold} solid 1px;
    padding: 10px 0;
  }

  & header h2 {
    margin: 10px 0;
    overflow: hidden;
    overflow-x: auto;
  }

  @media ${devices.mobile} {
    padding: 10px 10px;

    & header {
      padding: 0;
    }
  }
`;
