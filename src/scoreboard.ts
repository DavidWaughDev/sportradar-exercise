type Game = {
    homeTeam: string;
    homeTeamScore: number
    awayTeam: string
    awayTeamScore: number
}

/**
 * Provides operations to manage a scoreboard listing games underway ordered by 
 *  1) total score and 
 *  2) most recent creation date
 */
export class ScoreboardService {
    
    constructor(
        private games: Game[] = [],
    ) {}

    /**
     * Registers a game with the scoreboard with default score 0 - 0.
     *
     * @param homeTeam - The first team name
     * @param awayTeam - The second team name
     * 
     * @throws {@link Error}
     * This exception is thrown if:
     *  - a team name is empty
     *  - the team names are the same 
     */
    public createGame(options: {homeTeam: string, awayTeam: string}): void {
        if (options.homeTeam === '' || options.awayTeam === '') throw new Error('Team names cannot be empty');
        if (options.homeTeam === options.awayTeam) throw new Error('Team names cannot be the same');

        this.games = [...this.games, {
            homeTeam: options.homeTeam,
            homeTeamScore: 0,
            awayTeam: options.awayTeam,
            awayTeamScore: 0,
        }];
    }

    /**
     * Updates a game on the scoreboard with an new absolute scores
     *
     * @param homeTeam - The first team name
     * @param homeTeamScore - The first team's new score
     * @param awayTeam - The second team name
     * @param awayTeamScore - The second team's new score
     * 
     * @throws {@link Error}
     * This exception is thrown if `homeTeam` and `awayTeam` do not uniquely identify a game on 
     * the scoreboard.
     */
    public updateGame(options: {
        homeTeam: string, homeTeamScore: number, awayTeam: string, awayTeamScore: number
    }): void {
        const index = this.games.findIndex((game) => {
            return `${options.homeTeam} ${options.awayTeam}` === `${game.homeTeam} ${game.awayTeam}`;
        });

        if (index == -1) throw new Error('The specified game does not exist');

        this.games[index].homeTeamScore = options.homeTeamScore;
        this.games[index].awayTeamScore = options.awayTeamScore;
    }

    /**
     * Removes a game from the scoreboard
     *
     * @param homeTeam - The first team name
     * @param awayTeam - The second team name
     * 
     * @throws {@link Error}
     * This exception is thrown if `homeTeam` and `awayTeam` do not uniquely identify a game on 
     * the scoreboard.
     */
    public removeGame(options: {homeTeam: string, awayTeam: string}): void {
        const index = this.games.findIndex((game) => {
            return `${options.homeTeam} ${options.awayTeam}` === `${game.homeTeam} ${game.awayTeam}`;
        });

        if (index == -1) throw new Error('The specified game does not exist');

        this.games.splice(index, 1);
    }

    /**
     * Retrieves the current state of the scoreboard
     * 
     * @returns an array of strings representing the games, each formatted 
     * like `1. Brazil 5 - Canada 10` where:
     *  - `1.` is the index of the game on the board
     *  - `Brazil` is the name of the first team
     *  - `5` is the score of the first team
     *  - `Canada` is the name of the second team
     *  - `5` is the score of the second team
     * The array is ordered first by total score of both teams, and secondarily by the 
     * reverse order of game creation.
     */
    public getScoreboard(): string[] {
        return this.games.reverse().map((game, index) => {
            return {
                game: game,
                total: game.homeTeamScore + game.awayTeamScore,
                reverseIndex: index,
            }
        }).sort((n1, n2) => {
            return n1.total < n2.total || (n1.total == n2.total && n1.reverseIndex > n2.reverseIndex) ? 1 : -1
        }).map((sortedGame, sortedIndex) => {
            return `${sortedIndex + 1}. ${sortedGame.game.homeTeam} ${sortedGame.game.homeTeamScore} - ` +
            `${sortedGame.game.awayTeam} ${sortedGame.game.awayTeamScore}`
        });
    }
}