import React, { useState } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  Users, 
  Ticket, 
  CheckCircle2, 
  Share2, 
  Tag, 
  Search,
  ExternalLink,
  Award
} from 'lucide-react';
import { CollegeEvent } from '../types';

interface EventsSectionProps {
  events: CollegeEvent[];
  onRegisterEvent: (event: CollegeEvent) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  onRegisterEvent
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [calendarToast, setCalendarToast] = useState<string | null>(null);

  const categories = ['ALL', 'Technical', 'Conference', 'Career', 'Cultural', 'Workshop', 'Sports'];

  const filteredEvents = events.filter((evt) => {
    const matchesCat = selectedCategory === 'ALL' || evt.category === selectedCategory;
    const matchesSearch = 
      searchQuery.trim() === '' ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.chiefGuestOrSpeaker && evt.chiefGuestOrSpeaker.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  const handleAddToCalendar = (title: string) => {
    setCalendarToast(`Added "${title}" to your academic calendar.`);
    setTimeout(() => setCalendarToast(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Life & Extracurriculars</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Campus Events & Technical Symposiums
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl">
              National hackathons, IEEE conferences, cultural festivals, sports tournaments, and placement bootcamps.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-center min-w-[130px]">
            <span className="text-xs text-slate-400 font-medium">Upcoming Events</span>
            <div className="text-2xl font-bold text-rose-400">{events.length}</div>
            <span className="text-[10px] text-emerald-400 font-medium">Registrations Open</span>
          </div>
        </div>

        {calendarToast && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-xl text-xs flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              {calendarToast}
            </span>
            <button onClick={() => setCalendarToast(null)}>✕</button>
          </div>
        )}
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events by title, guest speaker, venue, or club organizer..."
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 px-2 py-0.5 rounded"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'All Events' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing <strong>{filteredEvents.length}</strong> campus events</span>
          <span>Earn activity points & certificates upon participation</span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Sparkles className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-700">No events match your search</h3>
            <p className="text-xs text-slate-500">Try selecting a different category or clearing your query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => {
              const pctFilled = Math.min(Math.round((evt.enrolledCount / evt.capacity) * 100), 100);
              return (
                <div
                  key={evt.id}
                  className="bg-white rounded-3xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Top Colored Header Badge */}
                  <div className={`p-5 text-white ${
                    evt.category === 'Technical' ? 'bg-gradient-to-r from-blue-900 to-indigo-900' :
                    evt.category === 'Cultural' ? 'bg-gradient-to-r from-purple-900 to-pink-900' :
                    evt.category === 'Career' ? 'bg-gradient-to-r from-emerald-900 to-teal-900' :
                    evt.category === 'Workshop' ? 'bg-gradient-to-r from-amber-900 to-orange-900' :
                    evt.category === 'Sports' ? 'bg-gradient-to-r from-red-900 to-rose-900' :
                    'bg-gradient-to-r from-slate-900 to-slate-800'
                  }`}>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs">
                        {evt.category}
                      </span>
                      <span className="text-xs font-semibold text-white/90">
                        {evt.entryFee}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-blue-200 transition-colors">
                      {evt.title}
                    </h3>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-4 flex-1">
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>

                    {/* Speaker / Guest */}
                    {evt.chiefGuestOrSpeaker && (
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                        <div className="text-[10px] font-bold uppercase text-slate-400">Chief Guest / Speaker</div>
                        <div className="font-semibold text-slate-800 truncate">{evt.chiefGuestOrSpeaker}</div>
                      </div>
                    )}

                    {/* Metadata items */}
                    <div className="space-y-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-800">{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                        <span className="truncate">{evt.venue}</span>
                      </div>
                    </div>

                    {/* Capacity Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Registration Status</span>
                        <span className="font-mono font-semibold">{evt.enrolledCount} / {evt.capacity} registered ({pctFilled}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${pctFilled >= 90 ? 'bg-rose-500' : 'bg-blue-600'}`}
                          style={{ width: `${pctFilled}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="p-5 pt-0 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleAddToCalendar(evt.title)}
                      className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors"
                      title="Add to My Calendar"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                    </button>

                    {evt.isRegistered ? (
                      <div className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Registered (Pass Issued)</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => onRegisterEvent(evt)}
                        className="flex-1 py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Register Now</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
