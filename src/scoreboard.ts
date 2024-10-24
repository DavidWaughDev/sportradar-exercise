export class ScoreboardService {
    constructor(
        private games: [] = [],
    ) {}

    public createGame(options: {homeTeam: string, awayTeam: string}): void {
        
    }

    public updateGame(options: {
        homeTeam: string, homeTeamScore: number, awayTeam: string, awayTeamScore: number
    }): void {

    }

    public removeGame(options: {homeTeam: string, awayTeam: string}): void {

    }

    public getScoreboard(): string {
        return '';
    }
}