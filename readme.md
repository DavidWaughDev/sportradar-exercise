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
      ✕ should create a valid game
    updateGame
      ✕ should update an existing game
    removeGame
      ✕ should remove a created game
    getScoreboard
      ✓ should get an empty scoreboard

```

## Assumptions

- As the only scoreboard view specified requires numbering as part of the formatted output, I choose to hide the `Game` type as an implementation detail. The tradeoffs of this choice are worth discussing.
- Updates will not validate that a team's score is increasing, allowing for flexibility (e.g. a referee's ability to overturn goals before play restarts). Thus, out-of-order updates may result in an inaccurate scoreboard. 
- The international sporting convention of listing the home team before the away team is used in the formatting of the response payload (e.g. `home 0 - away 3`).