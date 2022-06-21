import styled from "styled-components";
import { devices, sizes } from "../style/breakpoints";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import colorPallete from "../style/colorPallete";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

type ScrollTo = "START" | "END";

const Header = (): JSX.Element => {
  const [displayLeftArrow, setDisplayLeftArrow] = useState(false);
  const [displayRightArrow, setDisplayRightArrow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current === null) return;
    contentRef.current.addEventListener("scroll", handleScrollArrows);
    window.addEventListener("resize", handleScrollArrows);
  });

  const handleScrollArrows = (): void => {
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

  const scrollContentTo = (scrollTo: ScrollTo, wait: boolean): void => {
    if (contentRef.current === null) return;

    const maxScrollValue =
      contentRef.current.scrollWidth - contentRef.current.clientWidth;

    switch (scrollTo) {
      case "START":
        if (wait) {
          setTimeout(() => {
            contentRef.current?.scrollTo({
              left: 0,
              behavior: "smooth",
            });
          }, 1000);
        } else {
          contentRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        }
        break;
      case "END":
        if (wait) {
          setTimeout(() => {
            contentRef.current?.scrollTo({
              left: maxScrollValue,
              behavior: "smooth",
            });
          }, 1000);
        } else {
          contentRef.current.scrollTo({
            left: maxScrollValue,
            behavior: "smooth",
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <StyledHeader>
      <div id="content" ref={contentRef}>
        <Link to="/">
          <h1 id="logo">Pile Of Shame</h1>
        </Link>

        <nav>
          <NavLink
            to="/mygames"
            className={({ isActive }) => (isActive ? "linkActive" : "link")}
            onClick={() => scrollContentTo("START", true)}
          >
            My games
          </NavLink>
          <NavLink
            to="/games"
            className={({ isActive }) => (isActive ? "linkActive" : "link")}
            onClick={() => scrollContentTo("START", true)}
          >
            Games
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "linkActive" : "link")}
            onClick={() => scrollContentTo("START", true)}
          >
            About
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "linkActive" : "link")}
            onClick={() => scrollContentTo("START", true)}
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => (isActive ? "linkActive" : "link")}
            onClick={() => scrollContentTo("START", true)}
          >
            Register
          </NavLink>
        </nav>
      </div>
      {displayLeftArrow && (
        <div id="arrow-left" onClick={() => scrollContentTo("START", false)}>
          <FaChevronLeft />
        </div>
      )}
      {displayRightArrow && (
        <div id="arrow-right" onClick={() => scrollContentTo("END", false)}>
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
  margin-top: 10px;
  padding: 10px 20px;
  border: ${colorPallete.gold} solid 1px;
  box-shadow: 0px 0px 10px 0px rgba(66, 68, 90, 1);
  border-radius: 15px;
  position: sticky;
  top: 10px;

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

  & .link {
    padding: 10px 5px;
    color: white;
    margin: 0 5px;
  }

  & .link:hover,
  .linkActive:hover {
    padding-bottom: 8px;
    color: ${colorPallete.yellow};
    border-bottom: ${colorPallete.yellow} solid 2px;
  }

  & .linkActive {
    padding: 10px;
    color: ${colorPallete.gold};
    padding-bottom: 8px;
    border-bottom: ${colorPallete.gold} solid 2px;
  }
`;
