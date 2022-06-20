import styled from "styled-components";
import { devices, sizes } from "../style/breakpoints";
import NavItem from "./NavItem";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import colorPallete from "../style/colorPallete";
import { useEffect, useRef, useState } from "react";

type ScrollTo = "START" | "END";

const Header = (): JSX.Element => {
  const [displayLeftArrow, setDisplayLeftArrow] = useState(false);
  const [displayRightArrow, setDisplayRightArrow] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current === null) return;
    contentRef.current.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
  });

  const handleScroll = (): void => {
    if (contentRef.current === null) return;

    if (window.innerWidth > sizes.mobile) {
      setDisplayLeftArrow(false);
      setDisplayRightArrow(false);
    }

    const scrollValue = contentRef.current.scrollLeft;
    const maxScrollValue =
      contentRef.current.scrollWidth - contentRef.current.clientWidth;

    if (scrollValue <= 1) setDisplayLeftArrow(false);
    else setDisplayLeftArrow(true);

    if (scrollValue >= maxScrollValue - 6) setDisplayRightArrow(false);
    else setDisplayRightArrow(true);
  };

  const scrollContentTo = (scrollTo: ScrollTo): void => {
    if (contentRef.current === null) return;

    const maxScrollValue =
      contentRef.current.scrollWidth - contentRef.current.clientWidth;

    switch (scrollTo) {
      case "START":
        contentRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        break;
      case "END":
        contentRef.current.scrollTo({
          left: maxScrollValue,
          behavior: "smooth",
        });
        break;
      default:
        break;
    }
  };

  return (
    <StyledHeader>
      <div id="content" ref={contentRef}>
        <a href="#">
          <h1 id="logo">Pile Of Shame</h1>
        </a>
        <nav>
          <NavItem name="My games" />
          <NavItem name="Games" />
          <NavItem name="About" />
          <NavItem name="Login" />
          <NavItem name="Register" />
        </nav>
      </div>
      {displayLeftArrow && (
        <div id="arrow-left" onClick={() => scrollContentTo("START")}>
          <FaChevronLeft />
        </div>
      )}
      {displayRightArrow && (
        <div id="arrow-right" onClick={() => scrollContentTo("END")}>
          <FaChevronRight />
        </div>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  position: relative;
  background-color: ${colorPallete.darkBlueTransparent};
  max-width: 1024px;
  height: 50px;
  margin: 10px 0;
  padding: 10px 20px;
  border: ${colorPallete.gold} solid 1px;
  box-shadow: 0px 0px 10px 0px rgba(66, 68, 90, 1);
  border-radius: 15px;

  & #content {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & a {
    text-decoration: none;
    color: ${colorPallete.gold};
  }

  & #logo {
    color: ${colorPallete.gold};
    margin: 0 10px 0 0;
    width: 205px;
  }

  & #logo:hover {
    color: ${colorPallete.yellow};
  }

  & nav {
    display: flex;
    flex-grow: 1;
    justify-content: end;
  }

  & #arrow-left,
  #arrow-right {
    display: none;
    position: absolute;
    top: 0;
    left: 2px;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${colorPallete.gold};
  }

  & #arrow-right {
    left: calc(100% - 18px);
  }

  @media ${devices.mobile} {
    & #content {
      overflow: auto;
      white-space: nowrap;
      overflow-x: scroll;
    }

    & #arrow-left,
    #arrow-right {
      display: flex;
    }
  }
`;
