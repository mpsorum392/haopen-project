import { Player, Match } from './types';

export const RULES = [
  "Don't be a RICHARD or you will not be invited back on the trip!",
  "Match Play - Each 9 hole match is worth 1 point.",
  "Halved matches result in 0.5 points for each team.",
  "All lost balls to be treated as lateral hazards - No stroke and distance.",
  "May improve lie within 1 foot of ball in same type of rough, sand, other.",
  "Maximum score on any hole is Net Triple Bogey for pace of play.",
  "All disputes to be settled by the Commish. Let's try not to have any disputes."
];

export const PRIZES = [
  { rank: "Winning Team", reward: "$300 Team Purse + The H&A Cup" },
  { rank: "MVP", reward: "Special Reveal for 2026" },
  { rank: "TBD1", reward: "TBD" },
  { rank: "TBD2", reward: "TBD" }
];

export const SCHEDULE = [
  {
    day: "Wednesday",
    date: "24th",
    location: "Omaha traveling to Riverside, IA",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80",
    events: [
      { time: "5:00 PM", activity: "Leave home to head to Riverside" },
      { time: "9:30 PM", activity: "Arrive to Casino and Check-in" },
      { time: "10:00 PM to Whenever", activity: "Gamble A$$ES Off" },
     ]
  },
  {
    day: "Thursday",
    date: "25th",
    location: "Blue Top Ridge Golf Course, Riverside, IA",
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80",
    events: [
      { time: "7:00 AM", activity: "Breakfast & Warmup" },
      { time: "7:30/7:40/7:50 AM", activity: "Front 9 Matches" },
      { time: "9:45 AM", activity: "Back 9 Matches" },
      { time: "12:00 PM", activity: "Lunch and Excuses" },
      { time: "1:00/1:10/1:20 PM", activity: "Second 18 with games to be decided" }
    ]
  },
  {
    day: "Friday",
    date: "26th",
    location: "Spirit Hollow Golf Course, Burlington, IA",
    image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80",
    events: [
      { time: "7:00 AM", activity: "Breakfast & Warmup" },
      { time: "7:30 AM", activity: "Front 9 Matches" },
      { time: "9:45 AM", activity: "Back 9 Matches" },
      { time: "12:00 PM", activity: "Lunch and Excuses" },
      { time: "2:00 PM", activity: "Second 18 with games to be decided" }
    ]
  },
  {
    day: "Saturday",
    date: "27th",
    location: "Spirit Hollow Golf Course, Burlington, IA",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=1200&q=80",
    events: [
      { time: "7:00 AM", activity: "Breakfast & Warmup" },
      { time: "7:30 AM", activity: "Front 9 Matches" },
      { time: "9:45 AM", activity: "Back 9 Matches" },
      { time: "12:00 PM", activity: "Lunch and Excuses" },
      { time: "2:00 PM", activity: "Second 18 with games to be decided" }
    ]
  },
  {
    day: "Sunday",
    date: "28th",
    location: "Burlington traveling to Omaha",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=1200&q=80",
    events: [
      { time: "7:00 AM", activity: "Early tee time for the diehards" },
      { time: "9:00 AM", activity: "Normal people heading home" },
      { time: "12:00 PM", activity: "Everyone heading home" },
     ]
  }
];

export const INITIAL_PLAYERS: Player[] = [
  { id: 1,  name: 'Mike',      nickname: 'Old'    },
  { id: 2,  name: 'Kyle',      nickname: 'Killer' },
  { id: 3,  name: 'Kevin',     nickname: 'Outs'   },
  { id: 4,  name: 'Derek',     nickname: 'Juice'  },
  { id: 5,  name: 'Jeff',      nickname: 'OoBR'   },
  { id: 6,  name: 'Rob',       nickname: 'DcD'    },
  { id: 7,  name: 'Kyle',      nickname: 'Super'  },
  { id: 8,  name: 'Eric',      nickname: 'Oldest' },
  { id: 9,  name: 'Karl',      nickname: 'Life'   },
  { id: 10, name: 'Troy',      nickname: 'BM3'    },
  { id: 11, name: 'Scott',     nickname: 'Chill'  },
  { id: 12, name: 'ToBeNamed', nickname: 'TBD'    },
];

export const INITIAL_MATCHES: Match[] = [
  // Thursday — Front 9 (3x 2v2)
  { id: 1,  day: 'Thursday', session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 2,  day: 'Thursday', session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 3,  day: 'Thursday', session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  // Thursday — Back 9 (3x 2v2)
  { id: 4,  day: 'Thursday', session: 'Back 9',  match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 5,  day: 'Thursday', session: 'Back 9',  match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 6,  day: 'Thursday', session: 'Back 9',  match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  // Friday — Front 9 (3x 2v2)
  { id: 7,  day: 'Friday',   session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 8,  day: 'Friday',   session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 9,  day: 'Friday',   session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  // Friday — Back 9 (6x 1v1)
  { id: 10, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 11, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 12, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 13, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 14, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 15, day: 'Friday',   session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  // Saturday — Front 9 (3x 2v2)
  { id: 16, day: 'Saturday', session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 17, day: 'Saturday', session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 18, day: 'Saturday', session: 'Front 9', match_type: '2v2', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  // Saturday — Back 9 (6x 1v1)
  { id: 19, day: 'Saturday', session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 20, day: 'Saturday', session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 21, day: 'Saturday', session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 22, day: 'Saturday', session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 23, day: 'Saturday', session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
  { id: 24, day: 'Saturday', session: 'Back 9',  match_type: '1v1', team_blue_players: [], team_pink_players: [], blue_score: 0, pink_score: 0, winner: null },
];
