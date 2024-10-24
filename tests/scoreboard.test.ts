import { ScoreboardService } from '../src/scoreboard';

describe('scoreboard service', () => {
  describe('createGame', () => {
    let scoreboardService = new ScoreboardService();
    
    test('should create a valid game', () => {
      scoreboardService.createGame({homeTeam: 'Mexico', awayTeam: 'Canada',});
      scoreboardService.createGame({homeTeam: 'Spain', awayTeam: 'Brazil',});
    
      expect(scoreboardService.getScoreboard()).toEqual([
        '1. Spain 0 - Brazil 0', 
        '2. Mexico 0 - Canada 0',
       ]);
    });

    test('should fail if homeTeam or awayTeam are empty strings', () => {
      expect(scoreboardService.createGame({homeTeam: '', awayTeam: 'Canada',}))
        .toThrow('Team names cannot be empty');
    });

    test('should fail if homeTeam or awayTeam are the same', () => {
      expect(scoreboardService.createGame({homeTeam: 'Canada', awayTeam: 'Canada',}))
        .toThrow("Team names cannot be the same");
    });
  });

  describe('updateGame', () => {
    let scoreboardService = new ScoreboardService();
    scoreboardService.createGame({homeTeam: 'Mexico', awayTeam: 'Canada',});
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

      expect(scoreboardService.getScoreboard()).toEqual([
        '1. Spain 10 - Brazil 2',
        '2. Mexico 0 - Canada 5', 
       ]);
    });

    test('should fail when updating a non-existent game', () => {
      expect(scoreboardService.updateGame({
        homeTeam: 'NonExistentTeam',
        homeTeamScore: 10,
        awayTeam: 'Brazil',
        awayTeamScore: 2,
      })).toThrow('The specified game does not exist');

      expect(scoreboardService.updateGame({
        homeTeam: 'Spain',
        homeTeamScore: 10,
        awayTeam: 'NonExistentTeam',
        awayTeamScore: 2,
      })).toThrow('The specified game does not exist');

      //note: home and away are inverted
      expect(scoreboardService.updateGame({
        homeTeam: 'Brazil',
        homeTeamScore: 10,
        awayTeam: 'Spain',
        awayTeamScore: 2,
      })).toThrow('The specified game does not exist');
    });
  });

  describe('removeGame', () => {
    let scoreboardService = new ScoreboardService();
    scoreboardService.createGame({homeTeam: 'Mexico', awayTeam: 'Canada',});
    scoreboardService.createGame({homeTeam: 'Spain', awayTeam: 'Brazil',});
    test('should remove a game', () => {
      scoreboardService.removeGame({homeTeam: 'Spain', awayTeam: 'Brazil',});

      expect(scoreboardService.getScoreboard()).toBe([
        '1. Mexico 0 - Canada 0', 
       ]);
    });

    test('should fail when removing a non-existent game', () => {
      expect(scoreboardService.removeGame({homeTeam: 'NonExistentTeam', awayTeam: 'Brazil',}))
        .toThrow('The specified game does not exist');

      expect(scoreboardService.removeGame({homeTeam: 'Spain', awayTeam: 'NonExistentTeam',}))
        .toThrow('The specified game does not exist');

      expect(scoreboardService.removeGame({homeTeam: 'Spain', awayTeam: 'Brazil',}))
        .toThrow('The specified game does not exist');
    }); 
  });

  describe('getScoreboard', () => {
    let scoreboardService = new ScoreboardService();
    test('should get an empty scoreboard', () => {
      expect(scoreboardService.getScoreboard()).toEqual([]);
    });

    test('should get a scoreboard ordered first by total score, then by reversed creation order', () => {
      scoreboardService.createGame({homeTeam: 'Mexico', awayTeam: 'Canada',});
      scoreboardService.createGame({homeTeam: 'Spain', awayTeam: 'Brazil',});
      scoreboardService.createGame({homeTeam: 'Germany', awayTeam: 'France',});
      scoreboardService.createGame({homeTeam: 'Uruguay', awayTeam: 'Italy',});
      scoreboardService.createGame({homeTeam: 'Argentina', awayTeam: 'Australia',});
      scoreboardService.updateGame({
        homeTeam: 'Mexico',
        homeTeamScore: 0,
        awayTeam: 'Canada',
        awayTeamScore: 5,
      });
      scoreboardService.updateGame({
        homeTeam: 'Spain',
        homeTeamScore: 10,
        awayTeam: 'Brazil',
        awayTeamScore: 2,
      });
      scoreboardService.updateGame({
        homeTeam: 'Germany',
        homeTeamScore: 2,
        awayTeam: 'France',
        awayTeamScore: 2,
      });
      scoreboardService.updateGame({
        homeTeam: 'Uruguay',
        homeTeamScore: 6,
        awayTeam: 'Italy',
        awayTeamScore: 6,
      });
      scoreboardService.updateGame({
        homeTeam: 'Argentina',
        homeTeamScore: 3,
        awayTeam: 'Australia',
        awayTeamScore: 1,
      });

      expect(scoreboardService.getScoreboard()).toEqual([
        '1. Uruguay 6 - Italy 6',
        '2. Spain 10 - Brazil 2',
        '3. Mexico 0 - Canada 5',
        '4. Argentina 3 - Australia 1',
        '5. Germany 2 - France 2',
       ]);
    });
  });
});