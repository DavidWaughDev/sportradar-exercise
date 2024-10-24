# Sportradar Coding Exercise

The following repository addresses the exercise provided by Sportradar to a library-level API for managing a sporting tournament scoreboard. Specifically, a caller should be able to create, update the score of, and delete individual games from the scoreboard, as well as get a list of games ordered by total score followed by creation datetime.

## Setup

To setup the repository, run:
```
npm i
```

## Usage

To run the tests that cover the desired functionality, run:
```
npm t
```

with test results:
```
scoreboard service
  createGame
    ✓ should create a valid game (3 ms)
    ✕ should fail if homeTeam or awayTeam are empty strings (2 ms)
    ✕ should fail if homeTeam or awayTeam are the same (1 ms)
  updateGame
    ✓ should update an existing game
    ✕ should fail when updating a non-existent game
  removeGame
    ✕ should remove a game (5 ms)
    ✕ should fail when removing a non-existent game
  getScoreboard
    ✓ should get an empty scoreboard (1 ms)
    ✓ should get a scoreboard ordered first by total score, then by reversed creation order
```

## Assumptions

- As the scoreboard view specified requires numbering as part of the formatted output, I choose to hide the `Game` type as an implementation detail. The tradeoffs of this choice are worth discussing.
- While teams cannot play themselves, it is currently allowed for a team to be in multiple games simultaneously, just not against the same opponent.
- Updates will not validate that a team's score is increasing, allowing for flexibility (e.g. a referee's ability to overturn goals before play restarts). Thus, out-of-order updates may result in an inaccurate scoreboard. 
- The international sporting convention of listing the home team before the away team is used in the formatting of the response payload (e.g. `home 0 - away 3`).