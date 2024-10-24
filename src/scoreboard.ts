
type Game = {
    homeTeam: string;
    homeTeamScore: number
    awayTeam: string
    awayTeamScore: number
}

export class ScoreboardService {
    constructor(
        private games: Game[] = [],
    ) {}

    public createGame(options: {homeTeam: string, awayTeam: string}): void {
        this.games = [...this.games, {
            homeTeam: options.homeTeam,
            homeTeamScore: 0,
            awayTeam: options.awayTeam,
            awayTeamScore: 0,
        }];
    }

    public updateGame(options: {
        homeTeam: string, homeTeamScore: number, awayTeam: string, awayTeamScore: number
    }): void {
        const index = this.games.findIndex((game) => {
            return `${options.homeTeam} ${options.awayTeam}` === `${game.homeTeam} ${game.awayTeam}`;
        });

        this.games[index].homeTeamScore = options.homeTeamScore;
        this.games[index].awayTeamScore = options.awayTeamScore;
    }

    public removeGame(options: {homeTeam: string, awayTeam: string}): void {
        const index = this.games.findIndex((game) => {
            return `${options.homeTeam} ${options.awayTeam}` === `${game.homeTeam} ${game.awayTeam}`;
        });

        this.games.splice(index, 1);
    }

    public getScoreboard(): string[] {
        return this.games.reverse().map((game, index) => {
            return { 
                game: game,
                total: game.homeTeamScore + game.awayTeamScore,
                reverseIndex: index,
            }
        }).sort((n1, n2) => n1.total < n2.total || (n1.total == n2.total && n1.reverseIndex > n2.reverseIndex) ? 1 : -1
        ).map((sortedGame, sortedIndex) => {
            return `${sortedIndex + 1}. ${sortedGame.game.homeTeam} ${sortedGame.game.homeTeamScore} - ` +
            `${sortedGame.game.awayTeam} ${sortedGame.game.awayTeamScore}`
        });
    }
}