import { ModelStatic, QueryTypes } from 'sequelize';
import sequelize from '../models';
import Match from '../models/MatchModel';
import Team from '../models/TeamModel';

class Leaderboard {
  protected _matche: ModelStatic<Match> = Match;
  protected _team: ModelStatic<Team> = Team;

  getQuery() {
    console.log(this);
    const query = `SELECT t.team_name AS name,
    CAST(SUM(CASE WHEN (m.home_team_goals > m.away_team_goals) THEN 3 ELSE 0 END) + 
    SUM(CASE WHEN(m.home_team_goals = m.away_team_goals) THEN 1 ELSE 0 END) as unsigned integer)
     as totalPoints,
    COUNT(m.id) AS totalGames,
    CAST(SUM(m.home_team_goals > m.away_team_goals) as unsigned integer) as totalVictories,
    CAST(SUM(m.home_team_goals = m.away_team_goals) as unsigned integer) as totalDraws,
    CAST(SUM(m.home_team_goals < m.away_team_goals) as unsigned integer) as totalLosses,
    CAST(SUM(m.home_team_goals) as unsigned integer) as goalsFavor,
    CAST(SUM(m.away_team_goals) as unsigned integer) as goalsOwn,
    CAST(SUM(m.home_team_goals - m.away_team_goals) as signed integer) as goalsBalance,
    CAST(SUM(CASE WHEN (m.home_team_goals > m.away_team_goals) THEN 3
    WHEN (m.home_team_goals < m.away_team_goals) THEN 0 
    WHEN (m.home_team_goals = m.away_team_goals) THEN 1 ELSE 0 END)
     / (COUNT(m.id) * 3) * 100 as decimal(5, 2)) as efficiency
    FROM TRYBE_FUTEBOL_CLUBE.matches AS m`;
    return query;
  }

  async getMatches() {
    console.log(this);
    const getquery = this.getQuery();
    const query2 = `INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t ON m.home_team_id = t.id
    WHERE in_progress = 0
    GROUP BY name
    ORDER BY totalPoints DESC, totalVictories DESC,
     goalsBalance DESC, goalsFavor DESC, goalsOwn ASC;`;
    const result = await sequelize.query(`${getquery} ${query2}`, { type: QueryTypes.SELECT });
    return result;
  }
}

export default Leaderboard;
