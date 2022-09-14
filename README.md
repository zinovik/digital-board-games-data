Main repository: https://github.com/zinovik/digital-board-games

**DIGITAL_BOARD_GAMES_URL** - a map of games with the arrays of places where to play it:

```typescript
interface DigitalBoardGamesData {
  [name: string]: string[];
}
```

---

Tools:

- `node tools/find-missing-games.js` - finds games missing in `digital-board-games.json` but in the bgg top or missing in the bgg top but in the `digital-board-games.json` file
- `node tools/sort-json.js` - sorts games in `digital-board-games.json`
