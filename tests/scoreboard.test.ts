import { createGame } from '../src/scoreboard';

describe('scoreboard service', () => {
  describe('createGame', () => {
    test('should create a valid game', () => {
      createGame('myHomeTeam', 'myAwayTeam')
    });
  });
});