import Container from "../components/Container";
import GameListItem from "../components/GameListItem";
import exampleGame from "../store/exampleGame";
import { GameShort } from "../types/Game";

const game: GameShort = exampleGame;

const MyGames = ({}: {}): JSX.Element => {
  return (
    <Container title="My games">
      <GameListItem game={game} />
    </Container>
  );
};

export default MyGames;
