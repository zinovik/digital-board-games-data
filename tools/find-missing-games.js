const https = require("https");

const BGG_GAMES_URL =
  "https://bgg-games-ranks-zinovik.vercel.app/api/get-games?amount=2000";

const digitalBoardGames = require("../digital-board-games.json");

const request = (url) =>
  new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        const data = [];
        res.on("data", (chunk) => data.push(chunk));
        res.on("end", () =>
          resolve(JSON.parse(Buffer.concat(data).toString()))
        );
      })
      .on("error", (err) => {
        reject(err.message);
      });
  });

(async () => {
  const bggGames = await request(BGG_GAMES_URL);

  bggGames.games.forEach((game) => {
    if (
      game.rank < 500 &&
      !Object.keys(digitalBoardGames).includes(game.name)
    ) {
      console.log(`${game.rank} ${game.name} (${game.year})`);
    }
  });

  console.log("\n---\n");

  Object.keys(digitalBoardGames).forEach((digitalBoardGameName) => {
    if (!bggGames.games.some((game) => game.name === digitalBoardGameName)) {
      console.log(digitalBoardGameName);
    }
  });
})();