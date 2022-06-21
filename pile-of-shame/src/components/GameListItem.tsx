import styled from "styled-components";
import colorPallete from "../style/colorPallete";
import { GameShort } from "../types/Game";
import ImageSizes from "../types/ImageSizes";
import Image from "./Image";
import { VscCircleFilled } from "react-icons/vsc";
import { devices } from "../style/breakpoints";

const GameListItem = ({ game }: { game: GameShort }): JSX.Element => {
  const releaseDate = new Date(
    game.first_release_date * 1000
  ).toLocaleDateString();

  const genres = game.genres.map((g) => g.name).join(", ");
  const platforms = game.platforms.map((p) => p.name).join(", ");

  return (
    <StyledSection>
      <div className="row">
        <figure>
          <Image
            imageId={game.cover.image_id}
            imageSize={ImageSizes.cover_big}
          />
        </figure>
        <div className="data">
          <h1>{game.name}</h1>
          <div className="data-row">
            <p>
              <span className="bold">Release date: </span>
              {releaseDate}
            </p>
            <span className="separator">
              <VscCircleFilled />
            </span>
            <p>
              <span className="bold">Genres: </span>
              {genres}
            </p>
          </div>
          <p>
            <span className="bold">Platforms: </span>
            {platforms}
          </p>
          <p>
            <span className="bold">Summary: </span>
            {game.summary}
          </p>
        </div>
      </div>
    </StyledSection>
  );
};

export default GameListItem;

const StyledSection = styled.section`
  background-color: ${colorPallete.blue};
  border: white solid 1px;
  border-radius: 15px;
  /* box-shadow: 0px 0px 10px 0px white; */
  padding: 20px;
  & .row {
    display: flex;
    gap: 30px;
  }

  & .data {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-shrink: 1;
    overflow: hidden;
  }

  & .data h1 {
    font-size: 40px;
    margin: 0;
    border-bottom: white solid 1px;
    width: 100%;
  }

  & figure {
    margin: 0;
    flex-shrink: 0;
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  & .data-row {
    display: flex;
    gap: 10px;
  }

  & .bold {
    font-weight: 600;
  }

  @media ${devices.mobile} {
    & .row {
      flex-wrap: wrap;
      gap: 10px;
    }

    & figure {
      width: 100%;
    }

    & .data h1 {
      font-size: 30px;
      padding-bottom: 10px;
      border-bottom: white solid 1px;
      width: 100%;
    }

    & .data-row {
      gap: 10;
      flex-direction: column;
    }

    & .separator {
      display: none;
    }
  }
`;
