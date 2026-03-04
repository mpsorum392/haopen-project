export interface Player {
  id: number;
  name: string;
  nickname: string;
  //team?: 'Blue Hackers' | 'Pink Addicts';
}

export interface Match {
  id: number;
  day: 'Thursday' | 'Friday' | 'Saturday';
  session: 'Front 9' | 'Back 9';
  match_type: '1v1' | '2v2';
  team_blue_players: string[];
  team_pink_players: string[];
  blue_score: number;
  pink_score: number;
  winner: string | null;
}

export type TabType = 'home' | 'crew' | 'leaderboard' | 'matchups' | 'schedule' | 'rules';