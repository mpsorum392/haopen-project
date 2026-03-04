import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Users,
  Calendar,
  ClipboardList,
  Home,
  ChevronRight,
  MapPin,
  Clock,
  ShieldCheck,
  Gift,
  Plus,
  Minus,
  Menu,
  X,
  UserRound,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { TabType, Match } from './types';
import { RULES, PRIZES, SCHEDULE, INITIAL_MATCHES } from './constants';
import mikePic    from '../images/mike-pic.jpeg';
import swartPic   from '../images/swart-pic.jpeg';
import kyleKPic   from '../images/kyleK-pic.jpg';
import kevinPic   from '../images/kevin-pic.jpeg';
import ericPic    from '../images/eric-pic.jpg';
import scottPic   from '../images/scott-pic.jpg';
import derekPic   from '../images/derek-pic.jpeg';
import fitzkePic  from '../images/fitzke-pic.jpeg';
import karlPic    from '../images/karl-pic.jpeg';
import troyPic    from '../images/troy-pic.jpeg';
import robPic     from '../images/rob-pic.jpeg';

const STORAGE_KEY = 'haopen_matches';

function loadMatches(): Match[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return INITIAL_MATCHES;
}

function saveMatches(matches: Match[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [matches, setMatches] = useState<Match[]>(loadMatches);

  const updateScore = (matchId: number, blueScore: number, pinkScore: number) => {
    let winner: string | null = null;
    if (blueScore > pinkScore) winner = 'Blue Hackers';
    else if (pinkScore > blueScore) winner = 'Pink Addicts';
    else if (blueScore === pinkScore && blueScore > 0) winner = 'Draw';

    const updated = matches.map(m =>
      m.id === matchId ? { ...m, blue_score: blueScore, pink_score: pinkScore, winner } : m
    );
    setMatches(updated);
    saveMatches(updated);
  };

  const bluePoints = matches.reduce((acc, m) => acc + m.blue_score, 0);
  const pinkPoints = matches.reduce((acc, m) => acc + m.pink_score, 0);

  const navItems = [
    { id: 'home',        label: 'Home',        mobileLabel: 'Home',    icon: Home },
    { id: 'crew',        label: 'The Crew',    mobileLabel: 'Crew',    icon: UserRound },
    { id: 'rules',       label: 'Rules',       mobileLabel: 'Rules',   icon: ClipboardList },
    { id: 'schedule',    label: 'Schedule',    mobileLabel: 'Sched',   icon: Calendar },
    { id: 'matchups',    label: 'Matchups',    mobileLabel: 'Matches', icon: Users },
    { id: 'leaderboard', label: 'Leaderboard', mobileLabel: 'Board',   icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans flex flex-col md:flex-row">
      {/* Desktop Sidebar / Mobile Bottom Nav */}
      <aside className="md:w-64 md:h-screen md:sticky md:top-0 bg-[#111111] border-r border-white/10 z-50 flex flex-col">
        <div className="p-6 hidden md:block">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center">
              <Trophy size={20} />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold leading-tight tracking-tight uppercase">H&A Open</h1>
              <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">June 2026</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 md:px-4 py-2 flex md:flex-col items-center md:items-stretch justify-around md:justify-start fixed bottom-0 left-0 right-0 md:relative bg-[#111111] border-t md:border-t-0 border-white/10 md:bg-transparent">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 px-4 py-3 md:py-4 text-[10px] md:text-sm font-medium transition-all rounded-xl relative ${
                activeTab === tab.id
                  ? 'text-emerald-500 bg-white/10'
                  : 'text-white/40 hover:text-emerald-500/70 hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} />
              <span className="hidden md:inline">{tab.label}</span>
              <span className="md:hidden">{tab.mobileLabel}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 hidden md:block rounded-full"
                />
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 pb-24 md:pb-8 max-w-6xl mx-auto w-full">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center">
              <Trophy size={16} />
            </div>
            <h1 className="text-lg font-display font-bold uppercase">H&A Open</h1>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-blue-400 font-bold">{bluePoints}</span>
              <span className="opacity-20">/</span>
              <span className="text-pink-400 font-bold">{pinkPoints}</span>
            </div>
            <span className="text-[8px] font-mono text-white font-bold uppercase tracking-tighter">12.5 to win Cup</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && <HomeView bluePoints={bluePoints} pinkPoints={pinkPoints} />}
            {activeTab === 'crew' && <CrewView />}
            {activeTab === 'leaderboard' && <LeaderboardView matches={matches} />}
            {activeTab === 'matchups' && <MatchupsView matches={matches} onUpdate={updateScore} />}
            {activeTab === 'schedule' && <ScheduleView />}
            {activeTab === 'rules' && <RulesView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function HomeView({ bluePoints, pinkPoints }: { bluePoints: number, pinkPoints: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div className="mb-12">
          <h2 className="text-4xl font-display font-bold mb-3 tracking-tight">The Hackers & Addicts Open</h2>
          <p className="text-emerald-500 font-mono uppercase tracking-widest text-xs">June 24th - 28th, 2026</p>
        </div>

        <section className="glass-panel p-8 rounded-3xl">
          <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-2 tracking-tight">
            Event Overview
          </h3>
          <p className="text-lg leading-relaxed opacity-60 mb-8">
            Welcome to the 6th Annual Hackers & Addicts Open. 12 golfers, 2 teams, 3 days of grueling match play across Iowa's finest courses.
            The Blue Hackers face off against the Pink Addicts in a quest for eternal glory.
              </p>
          <p className="text-lg leading-relaxed opacity-60 mb-8">
                We will leave Wednesday the 24th no later than 5pm in order to arrive to the Riverside Casino by 930p.  We will
              stay the night there in shared rooms with 36 holes on tap for Thursday.  The morning round will be our first competition round with the afternoon
              being up to each player.
          </p>
          <p className="text-lg leading-relaxed opacity-60 mb-8">
                After golf that day we will make the hour drive into Burlington and arrive to Spirit Hollow GC.
              36 holes scheduled Friday and Saturday but again the morning round will be our competition round and the afternoon is up to each player.
              We will have a tee time on the books for early Sunday but in years past it is up in the air on if anyone stays and plays or we head home.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-mono uppercase opacity-40">Thursday</p>
              <p className="font-bold">Blue Top Ride GC</p>
              <p className="text-xs opacity-40">Riverside, IA</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-mono uppercase opacity-40">Friday & Saturday</p>
              <p className="font-bold">Spirit Hollow GC</p>
              <p className="text-xs opacity-40">Burlington, IA</p>
            </div>
          </div>
        </section>
      </div>

      <div className="space-y-8">
        <div className="w-1/2 aspect-[16/6] glass-panel p-6 rounded-3xl flex flex-col justify-center mx-auto">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-mono opacity-50 uppercase tracking-widest">Blue</span>
              <span className="text-2xl font-display font-bold text-blue-400">{bluePoints}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${(bluePoints / (bluePoints + pinkPoints || 1)) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-mono opacity-50 uppercase tracking-widest">Pink</span>
              <span className="text-2xl font-display font-bold text-pink-400">{pinkPoints}</span>
            </div>
            <div className="pt-2 border-t border-white/5 mt-2">
              <p className="text-[13px] font-mono text-white font-bold text-center uppercase tracking-tighter italic">12.5 pts to win Cup</p>
            </div>
          </div>
        </div>

        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 relative group">
          <img
            src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80"
            alt="Spirit Hollow"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="text-[10px] font-mono uppercase tracking-widest mb-1 opacity-50">Featured Course</p>
            <h4 className="text-2xl font-display font-bold">Spirit Hollow</h4>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="glass-panel p-6 rounded-3xl">
            <p className="text-3xl font-display font-bold">2</p>
            <p className="text-[10px] font-mono uppercase opacity-60">Courses</p>
          </div><div className="glass-panel p-6 rounded-3xl">
            <p className="text-3xl font-display font-bold">3</p>
            <p className="text-[10px] font-mono uppercase opacity-60">Rounds</p>
          </div>
            <div className="glass-panel p-6 rounded-3xl">
            <p className="text-3xl font-display font-bold">54</p>
            <p className="text-[10px] font-mono uppercase opacity-60">Holes</p>
          </div>
          <div className="glass-panel p-6 rounded-3xl">
            <p className="text-3xl font-display font-bold">24</p>
            <p className="text-[10px] font-mono uppercase opacity-60">Total Matches</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeaderboardView({ matches }: { matches: Match[] }) {
  const days = ['Thursday', 'Friday', 'Saturday'];

  const getPointsByDay = (day: string, team: string) => {
    return matches
      .filter(m => m.day === day)
      .reduce((acc, m) => acc + (team === 'Blue Hackers' ? m.blue_score : m.pink_score), 0);
  };

  return (
    <div className="space-y-8">
      <div className="glass-panel rounded-3xl overflow-hidden">
        <div className="grid grid-cols-5 p-6 bg-white/5 font-mono text-[10px] uppercase tracking-widest border-b border-white/10">
          <div className="col-span-2">Team Name</div>
          <div className="text-center">Thu</div>
          <div className="text-center">Fri</div>
          <div className="text-center">Sat</div>
        </div>
                <div className="divide-y divide-white/5">
          <div className="grid grid-cols-5 p-6 items-center hover:bg-white/5 transition-colors">
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="font-bold text-sm">Blue Hackers</span>
            </div>
            {days.map(day => (
              <div key={day} className="text-center font-mono text-xl font-bold">{getPointsByDay(day, 'Blue Hackers')}</div>
            ))}
          </div>
          <div className="grid grid-cols-5 p-6 items-center hover:bg-white/5 transition-colors">
            <div className="col-span-2 flex items-center gap-3">
              <div className="w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
              <span className="font-bold text-sm">Pink Addicts</span>
            </div>
            {days.map(day => (
              <div key={day} className="text-center font-mono text-xl font-bold">{getPointsByDay(day, 'Pink Addicts')}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {days.map(day => {
          const blue = getPointsByDay(day, 'Blue Hackers');
          const pink = getPointsByDay(day, 'Pink Addicts');
          const winner = blue > pink ? 'Blue' : pink > blue ? 'Pink' : 'Draw';

          return (
            <div key={day} className="glass-panel p-6 rounded-3xl relative overflow-hidden group">
              <div className={`absolute top-0 right-0 p-2 text-[8px] font-mono uppercase font-bold ${
                winner === 'Blue' ? 'bg-blue-500 text-white' : winner === 'Pink' ? 'bg-pink-500 text-white' : 'bg-white/10'
              }`}>
                {winner === 'Draw' ? 'Halved' : `${winner} Lead`}
              </div>
              <h4 className="text-lg font-display font-bold mb-4 opacity-40">{day} Recap</h4>
              <div className="flex justify-between items-end">
                <div className="text-center">
                  <p className="text-[10px] font-mono opacity-30 mb-1">BLUE</p>
                  <p className="text-4xl font-display font-bold text-blue-400">{blue}</p>
                </div>
                <div className="text-center pb-2 opacity-10 font-mono text-xs">VS</div>
                <div className="text-center">
                  <p className="text-[10px] font-mono opacity-30 mb-1">PINK</p>
                  <p className="text-4xl font-display font-bold text-pink-400">{pink}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MatchupsView({ matches, onUpdate }: { matches: Match[], onUpdate: (id: number, b: number, p: number) => void }) {
  const [selectedDay, setSelectedDay] = useState<'Thursday' | 'Friday' | 'Saturday'>('Thursday');

  const front9Matches = matches.filter(m => m.day === selectedDay && m.session === 'Front 9');
  const back9Matches = matches.filter(m => m.day === selectedDay && m.session === 'Back 9');

  const renderMatch = (match: Match) => {
    return (
      <div key={match.id} className="glass-panel rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:border-white/20 transition-all">
        <div className="p-8 flex-1 border-b md:border-b-0 md:border-r border-white/10">
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-mono uppercase bg-white/10 px-3 py-1 rounded-lg font-bold">{match.match_type}</span>
            <span className="text-xs font-display font-medium opacity-40">{match.day} • {match.session}</span>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 flex-1 w-full">
              <p className="text-[10px] font-mono uppercase text-blue-400 font-bold tracking-widest">Blue Hackers</p>
              <p className="text-xl font-display font-bold">Blue 1</p>
              {match.match_type === '2v2' && <p className="text-xl font-display font-bold">Blue 2</p>}
            </div>

            <div className="text-xs font-mono opacity-20 font-bold py-2 md:py-0">VS</div>

            <div className="space-y-2 flex-1 text-right w-full">
              <p className="text-[10px] font-mono uppercase text-pink-400 font-bold tracking-widest">Pink Addicts</p>
              <p className="text-xl font-display font-bold">Pink 1</p>
              {match.match_type === '2v2' && <p className="text-xl font-display font-bold">Pink 2</p>}
            </div>
          </div>
        </div>

        <div className="p-8 bg-white/5 w-full md:w-64 flex flex-col justify-center items-center gap-4">
          <p className="text-[10px] font-mono uppercase opacity-30 font-bold">Match Score</p>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => onUpdate(match.id, match.blue_score + 0.5, match.pink_score)}
                className="w-8 h-8 flex items-center justify-center bg-blue-500/20 hover:bg-blue-500/40 rounded-full text-blue-400 transition-colors"
              ><Plus size={14}/></button>
              <span className="text-4xl font-display font-bold">{match.blue_score}</span>
              <button
                onClick={() => onUpdate(match.id, Math.max(0, match.blue_score - 0.5), match.pink_score)}
                className="w-8 h-8 flex items-center justify-center bg-blue-500/10 hover:bg-blue-500/20 rounded-full text-blue-400/50 transition-colors"
              ><Minus size={14}/></button>
            </div>
            <div className="text-2xl opacity-10 font-display">:</div>
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={() => onUpdate(match.id, match.blue_score, match.pink_score + 0.5)}
                className="w-8 h-8 flex items-center justify-center bg-pink-500/20 hover:bg-pink-500/40 rounded-full text-pink-400 transition-colors"
              ><Plus size={14}/></button>
              <span className="text-4xl font-display font-bold">{match.pink_score}</span>
              <button
                onClick={() => onUpdate(match.id, match.blue_score, Math.max(0, match.pink_score - 0.5))}
                className="w-8 h-8 flex items-center justify-center bg-pink-500/10 hover:bg-pink-500/20 rounded-full text-pink-400/50 transition-colors"
              ><Minus size={14}/></button>
            </div>
          </div>
          {match.winner && (
            <div className={`mt-2 px-4 py-1 rounded-full text-[10px] font-mono uppercase font-bold ${
              match.winner === 'Draw' ? 'bg-white/10 text-white/60' : match.winner.includes('Blue') ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'
            }`}>
              {match.winner === 'Draw' ? 'Match Halved' : `${match.winner.split(' ')[0]} Wins`}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <div className="flex justify-center">
        <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
          {['Thursday', 'Friday', 'Saturday'].map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day as any)}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
                selectedDay === day ? 'bg-white text-black' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-display font-bold tracking-tight">Front 9 Matches</h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {front9Matches.length > 0 ? (
              front9Matches.map(renderMatch)
            ) : (
              <p className="text-center py-12 opacity-30 font-mono text-xs italic">No matches scheduled for this session</p>
            )}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-2xl font-display font-bold tracking-tight">Back 9 Matches</h3>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {back9Matches.length > 0 ? (
              back9Matches.map(renderMatch)
            ) : (
              <p className="text-center py-12 opacity-30 font-mono text-xs italic">No matches scheduled for this session</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function ScheduleView() {
  return (
    <div className="space-y-14">
      {SCHEDULE.map((day) => (
        <div key={day.day}>
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold tracking-tight">{day.day} the {(day as any).date}</h2>
            <p className="flex items-center gap-2 text-emerald-500 font-mono uppercase tracking-widest text-xs mt-2">
              <MapPin size={12} /> {day.location}
            </p>
          </div>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-emerald-500/25" />

            <div className="space-y-3">
              {day.events.map((event, eIdx) => (
                <div key={eIdx} className="flex items-start gap-5">
                  {/* Dot */}
                  <div className="shrink-0 w-[15px] flex justify-center mt-5 relative z-10">
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                  {/* Card */}
                  <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-5">
                    <p className="text-emerald-500 font-mono text-sm font-bold mb-2">{event.time}</p>
                    <p className="text-white font-display font-bold text-xl">{event.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface CrewMember {
  name: string;
  nickname: string;
  handicap: number;
  age: number;
  image: string;
  likes: string[];
  dislikes: string[];
}

const CREW: CrewMember[] = [
  { name: 'Mike Sorum',      nickname: 'Old',    handicap: 8,  age: 45, image: mikePic,   likes: [], dislikes: [] },
  { name: 'Kyle Koehler',    nickname: 'Killer', handicap: 16, age: 45, image: kyleKPic,  likes: [], dislikes: [] },
  { name: 'Kevin DeMarco',   nickname: 'Outs',   handicap: 14, age: 40, image: kevinPic,  likes: [], dislikes: [] },
  { name: 'Derek Bernacchi', nickname: 'Juice',  handicap: 27, age: 39, image: derekPic,  likes: [], dislikes: [] },
  { name: 'Jeff Fitzke',     nickname: 'OoBR',   handicap: 14, age: 49, image: fitzkePic, likes: [], dislikes: [] },
  { name: 'Rob Fabian',      nickname: 'DDC',    handicap: 12, age: 44, image: robPic,    likes: [], dislikes: [] },
  { name: 'Kyle Swart',      nickname: 'Super',  handicap: 4,  age: 40, image: swartPic,  likes: [], dislikes: [] },
  { name: 'Eric Wakefield',  nickname: 'Oldest', handicap: 11, age: 57, image: ericPic,   likes: [], dislikes: [] },
  { name: 'Karl Rohrbaugh',  nickname: 'Life',   handicap: 14, age: 51, image: karlPic,   likes: [], dislikes: [] },
  { name: 'Troy Thompson',   nickname: 'BM3',    handicap: 8,  age: 47, image: troyPic,   likes: [], dislikes: [] },
  { name: 'Scott Kardell',   nickname: 'Chill',  handicap: 20, age: 57, image: scottPic,  likes: [], dislikes: [] },
];

function CrewView() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-display font-bold tracking-tight">The Crew</h2>
        <p className="text-emerald-500 font-mono uppercase tracking-widest text-xs mt-2">12 Golfers · 2 Teams · 1 Cup</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CREW.map(player => (
          <PlayerCard key={player.name} player={player} />
        ))}
      </div>
    </div>
  );
}

function PlayerCard({ player }: { player: CrewMember }) {
  return (
    <div className="glass-panel rounded-3xl overflow-hidden flex flex-col">
      {/* Photo */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={player.image}
          alt={player.name}
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-display font-bold leading-tight">{player.name}</h3>
          <p className="text-base font-mono text-white mt-1">Nickname: {player.nickname}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10">
        <div className="p-4 text-center">
          <p className="text-2xl font-display font-bold">{player.handicap}</p>
          <p className="text-[10px] font-mono uppercase opacity-40 mt-1">Handicap</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-2xl font-display font-bold">{player.age}</p>
          <p className="text-[10px] font-mono uppercase opacity-40 mt-1">Age</p>
        </div>
      </div>

      {/* Likes */}
      <div className="p-6 border-b border-white/10 flex-1">
        <p className="text-[10px] font-mono uppercase font-bold mb-3 flex items-center gap-2 text-emerald-500">
          <ThumbsUp size={11} /> Likes
        </p>
        {player.likes.length > 0 ? (
          <ul className="space-y-2">
            {player.likes.map((item, i) => (
              <li key={i} className="text-sm opacity-70 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs opacity-25 italic font-mono">Coming soon...</p>
        )}
      </div>

      {/* Dislikes */}
      <div className="p-6">
        <p className="text-[10px] font-mono uppercase font-bold mb-3 flex items-center gap-2 text-red-400">
          <ThumbsDown size={11} /> Dislikes
        </p>
        {player.dislikes.length > 0 ? (
          <ul className="space-y-2">
            {player.dislikes.map((item, i) => (
              <li key={i} className="text-sm opacity-70 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-red-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs opacity-25 italic font-mono">Coming soon...</p>
        )}
      </div>
    </div>
  );
}

function RulesView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <section className="glass-panel p-8 rounded-3xl">
        <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
          <ShieldCheck className="accent-text" />
          Tournament Rules
        </h3>
        <ul className="space-y-8">
          {RULES.map((rule, idx) => (
            <li key={idx} className="flex gap-6 items-start group">
              <span className="font-mono text-[10px] opacity-20 group-hover:opacity-100 transition-opacity mt-1 font-bold">0{idx + 1}</span>
              <p className="text-lg leading-relaxed opacity-70 group-hover:opacity-100 transition-opacity">{rule}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass-panel p-8 rounded-3xl">
        <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
          <Gift className="accent-text" />
          Prizes & Rewards
        </h3>
        <div className="space-y-4">
          {PRIZES.map((prize, idx) => (
            <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center group hover:bg-white hover:text-black transition-all duration-500 cursor-default">
              <div>
                <p className="text-[10px] font-mono uppercase opacity-40 group-hover:opacity-60 font-bold mb-1">{prize.rank}</p>
                <p className="font-bold text-xl tracking-tight">{prize.reward}</p>
              </div>
              <ChevronRight className="opacity-20 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}