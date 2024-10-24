import { ScoreboardService } from '../src/scoreboard';

describe('scoreboard service', () => {
  describe('createGame', () => {
    let scoreboardService = new ScoreboardService();
    test('should create a valid game', () => {
      scoreboardService.createGame({homeTeam: 'Mexico', awayTeam: 'Canada',});
      scoreboardService.createGame({homeTeam: 'Spain', awayTeam: 'Brazil',});
    
      expect(scoreboardService.getScoreboard()).toBe([
        '1. Mexico 0 - Canada 0',
        '2. Spain 0 - Brazil 0', 
       ]);
    });
  });

  describe('updateGame', () => {
    let scoreboardService = new ScoreboardService();
    scoreboardService.createGame({homeTeam: 'Spain', awayTeam: 'Brazil',});
    test('should update an existing game', () => {
      scoreboardService.updateGame({
        homeTeam: 'Spain',
        homeTeamScore: 10,
        awayTeam: 'Brazil',
        awayTeamScore: 2,
      });
      scoreboardService.updateGame({
        homeTeam: 'Mexico',
        homeTeamScore: 0,
        awayTeam: 'Canada',
        awayTeamScore: 5,
      });

      expect(scoreboardService.getScoreboard()).toBe([
        '1. Spain 10 - Brazil 2',
        '2. Mexico 0 - Canada 5', 
       ]);
    });
  });

  describe('removeGame', () => {
    let scoreboardService = new ScoreboardService();
    scoreboardService.createGame({homeTeam: 'Mexico', awayTeam: 'Canada',});
    scoreboardService.createGame({homeTeam: 'Spain', awayTeam: 'Brazil',});
    test('should remove a created game', () => {
      scoreboardService.removeGame({homeTeam: 'Spain', awayTeam: 'Brazil',});

      expect(scoreboardService.getScoreboard()).toBe([
        '1. Mexico 0 - Canada 0', 
       ]);
    });
  });

  describe('getScoreboard', () => {
    let scoreboardService = new ScoreboardService();
    test('should get an empty scoreboard', () => {
      expect(scoreboardService.getScoreboard()).toBe('');
    });
  });
});