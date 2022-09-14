const fs = require("fs");
const { exec } = require("child_process");

const DIGITAL_BOARD_GAMES_FILE_PATH = "./digital-board-games.json";

const digitalBoardGamesBuffer = fs.readFileSync(DIGITAL_BOARD_GAMES_FILE_PATH);
const digitalBoardGamesString = digitalBoardGamesBuffer.toString();
const digitalBoardGames = JSON.parse(digitalBoardGamesString);

const digitalBoardGamesSorted = Object.keys(digitalBoardGames)
  .sort((game1, game2) => game1.localeCompare(game2))
  .reduce(
    (acc, game) => ({
      ...acc,
      [game]: digitalBoardGames[game],
    }),
    {}
  );

fs.writeFileSync(
  DIGITAL_BOARD_GAMES_FILE_PATH,
  JSON.stringify(digitalBoardGamesSorted)
);

exec(`npx prettier ${DIGITAL_BOARD_GAMES_FILE_PATH} --write`);
