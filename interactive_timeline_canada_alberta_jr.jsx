import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, ChevronLeft, ChevronRight, Info } from "lucide-react";

// --- Data ---------------------------------------------------------------
// Curated, age‑appropriate highlights aligned with common Jr. High (AB) themes:
// Confederation & Nation‑building, Indigenous Perspectives, Rights & Freedoms,
// Alberta Milestones, Global Conflicts, Language & Identity.

const EVENTS = [
  {
    id: "1763-royal-proclamation",
    year: 1763,
    title: "Royal Proclamation",
    blurb:
      "Recognized Indigenous title to lands not ceded by treaty and set rules for settlement after the Seven Years' War.",
    themes: ["Indigenous", "Government & Law"],
    region: "National",
  },
  {
    id: "1867-confederation",
    year: 1867,
    title: "Confederation (BNA Act)",
    blurb:
      "Ontario, Québec, Nova Scotia, and New Brunswick form the Dominion of Canada; federal system established.",
    themes: ["Confederation", "Government & Law"],
    region: "National",
  },
  {
    id: "1870-hbc-transfer",
    year: 1870,
    title: "Transfer of Rupert's Land",
    blurb:
      "Britain transfers Hudson's Bay Company lands to Canada, reshaping the Prairies and negotiations with Métis and First Nations.",
    themes: ["Westward Expansion", "Indigenous"],
    region: "Prairies",
  },
  {
    id: "1870-manitoba-act",
    year: 1870,
    title: "Manitoba Act & Métis Rights",
    blurb:
      "Creates Manitoba and protects certain Métis land and language rights following the Red River Resistance.",
    themes: ["Indigenous", "Government & Law"],
    region: "Prairies",
  },
  {
    id: "1871-1921-numbered-treaties",
    year: 1871,
    title: "Numbered Treaties (1871–1921)",
    blurb:
      "A series of agreements between First Nations and the Crown across the Prairies, North, and parts of Ontario.",
    themes: ["Indigenous", "Treaties"],
    region: "Prairies & North",
    range: [1871, 1921],
  },
  {
    id: "1876-indian-act",
    year: 1876,
    title: "Indian Act",
    blurb:
      "Federal law governing many aspects of First Nations peoples' lives; amended many times; widely debated.",
    themes: ["Indigenous", "Government & Law"],
    region: "National",
  },
  {
    id: "1876-treaty-6",
    year: 1876,
    title: "Treaty 6",
    blurb:
      "Covers central Alberta and Saskatchewan; includes promises such as medicine chest and famine relief.",
    themes: ["Indigenous", "Treaties"],
    region: "Alberta & Saskatchewan",
  },
  {
    id: "1877-treaty-7",
    year: 1877,
    title: "Treaty 7",
    blurb:
      "Signed with several First Nations in southern Alberta; shaped settlement and reserve systems in the region.",
    themes: ["Indigenous", "Treaties"],
    region: "Alberta",
  },
  {
    id: "1885-nw-resistance",
    year: 1885,
    title: "North‑West Resistance",
    blurb:
      "Métis and First Nations resist federal policies; Battle of Batoche; long‑term impacts on Prairie peoples.",
    themes: ["Indigenous", "Westward Expansion"],
    region: "Prairies",
  },
  {
    id: "1885-cpr-complete",
    year: 1885,
    title: "CPR Completed",
    blurb:
      "The Canadian Pacific Railway links east and west, accelerating settlement, trade, and immigration.",
    themes: ["Infrastructure", "Westward Expansion"],
    region: "National",
  },
  {
    id: "1896-immigration-boom",
    year: 1896,
    title: "Prairie Immigration Boom",
    blurb:
      "Newcomers arrive from Europe, the U.S., and beyond; dramatic demographic and economic change on the Prairies.",
    themes: ["Immigration", "Westward Expansion"],
    region: "Prairies",
    range: [1896, 1914],
  },
  {
    id: "1905-alberta-province",
    year: 1905,
    title: "Alberta Becomes a Province",
    blurb:
      "Alberta and Saskatchewan created as provinces; debates over education, resources, and identity.",
    themes: ["Alberta Milestones", "Government & Law"],
    region: "Alberta",
  },
  {
    id: "1914-ww1",
    year: 1914,
    title: "First World War (1914–1918)",
    blurb:
      "Over 600,000 Canadians serve; major social and political effects, including the 1917 Conscription Crisis.",
    themes: ["Global Conflicts", "Society"],
    region: "Global",
    range: [1914, 1918],
  },
  {
    id: "1916-womens-suffrage-ab",
    year: 1916,
    title: "Women's Suffrage in Alberta",
    blurb:
      "Women gain the provincial right to vote and hold office; part of a broader movement across Canada.",
    themes: ["Rights & Freedoms", "Alberta Milestones"],
    region: "Alberta",
  },
  {
    id: "1929-persons-case",
    year: 1929,
    title: "The Persons Case",
    blurb:
      "The Famous Five help win a ruling that women are 'persons' under Canadian law and eligible for the Senate.",
    themes: ["Rights & Freedoms", "Government & Law"],
    region: "National",
  },
  {
    id: "1939-ww2",
    year: 1939,
    title: "Second World War (1939–1945)",
    blurb:
      "Canada declares war in 1939; major mobilization, industrial change, and postwar impacts.",
    themes: ["Global Conflicts", "Society"],
    region: "Global",
    range: [1939, 1945],
  },
  {
    id: "1960-bill-of-rights",
    year: 1960,
    title: "Canadian Bill of Rights",
    blurb:
      "A federal statute protecting certain rights and freedoms; a step toward later constitutional protections.",
    themes: ["Rights & Freedoms", "Government & Law"],
    region: "National",
  },
  {
    id: "1960s-quiet-revolution",
    year: 1960,
    title: "Quiet Revolution (1960s)",
    blurb:
      "Rapid social, economic, and political change in Québec; debates over identity and federalism intensify.",
    themes: ["Language & Identity", "Society"],
    region: "Québec",
    range: [1960, 1969],
  },
  {
    id: "1969-official-languages",
    year: 1969,
    title: "Official Languages Act",
    blurb:
      "Federal bilingualism policy makes English and French the official languages of Canada.",
    themes: ["Language & Identity", "Government & Law"],
    region: "National",
  },
  {
    id: "1971-multiculturalism",
    year: 1971,
    title: "Multiculturalism Policy",
    blurb:
      "Canada adopts multiculturalism as official policy, recognizing cultural diversity as a national strength.",
    themes: ["Immigration", "Society"],
    region: "National",
  },
  {
    id: "1980-quebec-referendum",
    year: 1980,
    title: "Québec Referendum (1980)",
    blurb:
      "Québec votes on sovereignty‑association; the 'No' side wins; constitutional debates continue.",
    themes: ["Language & Identity", "Government & Law"],
    region: "Québec",
  },
  {
    id: "1982-charter",
    year: 1982,
    title: "Constitution Act & Charter",
    blurb:
      "Canada patriates its Constitution and enacts the Charter of Rights and Freedoms, protecting fundamental rights.",
    themes: ["Rights & Freedoms", "Government & Law"],
    region: "National",
  },
  {
    id: "1987-meech",
    year: 1987,
    title: "Meech Lake Accord (1987–1990)",
    blurb:
      "Attempt to amend the Constitution recognizing Québec as a 'distinct society'; accord ultimately fails.",
    themes: ["Government & Law", "Language & Identity"],
    region: "National",
    range: [1987, 1990],
  },
  {
    id: "1992-charlottetown",
    year: 1992,
    title: "Charlottetown Accord",
    blurb:
      "Another constitutional reform attempt put to a national referendum; rejected by voters.",
    themes: ["Government & Law"],
    region: "National",
  },
  {
    id: "1995-quebec-referendum",
    year: 1995,
    title: "Québec Referendum (1995)",
    blurb:
      "A second vote on sovereignty; the 'No' side wins by a narrow margin.",
    themes: ["Language & Identity", "Government & Law"],
    region: "Québec",
  },
  {
    id: "1999-nunavut",
    year: 1999,
    title: "Creation of Nunavut",
    blurb:
      "New territory formed after Inuit land claim agreements; major step in northern governance.",
    themes: ["Indigenous", "Government & Law"],
    region: "North",
  },
  {
    id: "2008-trc",
    year: 2008,
    title: "Truth & Reconciliation Commission (2008–2015)",
    blurb:
      "Established to document the history and impacts of residential schools and to guide reconciliation.",
    themes: ["Indigenous", "Rights & Freedoms"],
    region: "National",
    range: [2008, 2015],
  },
  {
    id: "2015-trc-calls",
    year: 2015,
    title: "TRC Calls to Action",
    blurb:
      "TRC releases 94 Calls to Action aimed at governments and institutions to advance reconciliation.",
    themes: ["Indigenous", "Education"],
    region: "National",
  },
  {
    id: "2021-nunavut-inuktitut-education",
    year: 2021,
    title: "Inuit Language Education Steps",
    blurb:
      "Ongoing initiatives expand Indigenous language education in the North; reflects wider revitalization efforts.",
    themes: ["Indigenous", "Education"],
    region: "North",
  },
];

const THEMES = [
  "All",
  "Confederation",
  "Indigenous",
  "Treaties",
  "Alberta Milestones",
  "Rights & Freedoms",
  "Government & Law",
  "Language & Identity",
  "Immigration",
  "Infrastructure",
  "Westward Expansion",
  "Global Conflicts",
  "Society",
  "Education",
];

// --- Helpers ------------------------------------------------------------
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const unique = (arr) => Array.from(new Set(arr));

const MIN_YEAR = 1760;
const MAX_YEAR = 2025;

function yearToPct(year) {
  return ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
}

function inRange(ev, y) {
  if (ev.range) return y >= ev.range[0] && y <= ev.range[1];
  return Math.floor(ev.year) === Math.floor(y);
}

// --- Components ---------------------------------------------------------
function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border text-sm transition-all ${
        active ? "bg-black text-white border-black" : "bg-white border-gray-300 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}

function Modal({ open, onClose, event }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            className="relative w-full md:max-w-2xl bg-white rounded-t-2xl md:rounded-2xl shadow-2xl p-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
          >
            <button
              aria-label="Close"
              className="absolute right-3 top-3 p-2 rounded-full hover:bg-gray-100"
              onClick={onClose}
            >
              <X size={18} />
            </button>
            <div className="flex gap-3 items-start">
              <div className="p-2 rounded-xl bg-gray-100"><Info size={20} /></div>
              <div>
                <h3 className="text-xl font-semibold">{event.title} <span className="text-gray-500 font-normal">({event.range ? `${event.range[0]}–${event.range[1]}` : event.year})</span></h3>
                <p className="mt-2 text-gray-700 leading-relaxed">{event.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {event.themes.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100 border border-gray-200">{t}</span>
                  ))}
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-50 border border-dashed border-gray-200">{event.region}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EventDot({ ev, selected, onSelect }) {
  const left = `${yearToPct(ev.year)}%`;
  return (
    <motion.button
      style={{ left }}
      onClick={() => onSelect(ev)}
      className={`absolute -translate-x-1/2 -translate-y-1/2 top-1/2 h-4 w-4 rounded-full border-2 ${
        selected ? "bg-black border-black" : "bg-white border-black hover:scale-110"
      }`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.15 }}
      title={`${ev.title} (${ev.range ? `${ev.range[0]}–${ev.range[1]}` : ev.year})`}
      aria-label={`${ev.title} (${ev.range ? `${ev.range[0]}–${ev.range[1]}` : ev.year})`}
    />
  );
}

function YearScrubber({ year, setYear }) {
  const pct = clamp(((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100, 0, 100);
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-full border hover:bg-gray-50"
          onClick={() => setYear((y) => clamp(y - 10, MIN_YEAR, MAX_YEAR))}
          aria-label="Previous 10 years"
        >
          <ChevronLeft />
        </button>
        <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
          <div className="absolute inset-y-0 left-0 bg-black rounded-full" style={{ width: `${pct}%` }} />
          <input
            aria-label="Timeline year"
            type="range"
            min={MIN_YEAR}
            max={MAX_YEAR}
            step={1}
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
        </div>
        <button
          className="p-2 rounded-full border hover:bg-gray-50"
          onClick={() => setYear((y) => clamp(y + 10, MIN_YEAR, MAX_YEAR))}
          aria-label="Next 10 years"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="mt-2 text-center text-sm text-gray-600">Year: <span className="font-medium text-gray-900">{Math.round(year)}</span></div>
    </div>
  );
}

// --- Main Component -----------------------------------------------------
export default function CanadaTimeline() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("All");
  const [year, setYear] = useState(1900);
  const [active, setActive] = useState(null);

  const years = useMemo(() => {
    const ys = unique(
      EVENTS.flatMap((e) => (e.range ? [e.range[0], e.range[1]] : [e.year]))
    ).sort((a, b) => a - b);
    return ys;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EVENTS.filter((e) => {
      const matchesTheme = theme === "All" || e.themes.includes(theme);
      const matchesQuery =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.blurb.toLowerCase().includes(q) ||
        e.region.toLowerCase().includes(q) ||
        e.themes.some((t) => t.toLowerCase().includes(q));
      const nearYear = Math.abs((e.range ? e.range[0] : e.year) - year) <= 25 ||
        (e.range && year >= e.range[0] && year <= e.range[1]);
      return matchesTheme && matchesQuery && nearYear;
    }).sort((a, b) => (a.year === b.year ? a.title.localeCompare(b.title) : a.year - b.year));
  }, [query, theme, year]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">Canada Timeline — Alberta Jr. High</h1>
          <p className="mt-2 text-gray-600 max-w-3xl">
            Explore key events in Canadian history with a focus on Alberta and Indigenous perspectives.
            Use the year scrubber, search, and theme filters. Click a dot to learn more.
          </p>
        </header>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
          <div className="flex items-center gap-2 flex-1 border rounded-2xl px-3 py-2 bg-white shadow-sm">
            <Search size={18} />
            <input
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, themes, regions..."
              className="w-full outline-none"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 border rounded-2xl px-3 py-2 bg-white shadow-sm">
              <Filter size={16} />
              <select
                aria-label="Theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-transparent outline-none"
              >
                {THEMES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Timeline rail */}
        <div className="relative mt-6 md:mt-8 rounded-2xl bg-white shadow-lg p-4 md:p-6">
          <div className="relative h-24 md:h-28">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-gray-200 rounded-full" />

            {filtered.map((ev) => (
              <EventDot
                key={ev.id}
                ev={ev}
                selected={active?.id === ev.id}
                onSelect={setActive}
              />
            ))}

            {/* Year ticks */}
            <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] md:text-xs text-gray-500">
              {[MIN_YEAR, 1800, 1850, 1900, 1950, 2000, MAX_YEAR].map((y) => (
                <div key={y} className="text-center" style={{ transform: "translateX(-50%)", marginLeft: `${yearToPct(y)}%` }}>
                  <div className="h-3 w-0.5 bg-gray-300 mx-auto" />
                  <div className="mt-1">{y}</div>
                </div>
              ))}
            </div>
          </div>

          <YearScrubber year={year} setYear={setYear} />

          {/* Event list */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((ev) => (
              <motion.button
                key={`card-${ev.id}`}
                onClick={() => setActive(ev)}
                className="text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-xs text-gray-500 font-medium">
                  {ev.range ? `${ev.range[0]}–${ev.range[1]}` : ev.year}
                </div>
                <div className="mt-1 font-semibold">{ev.title}</div>
                <div className="mt-2 text-sm text-gray-600 line-clamp-3">{ev.blurb}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ev.themes.slice(0,2).map((t) => (
                    <span key={t} className="text-[10px] px-2 py-1 rounded-full bg-white border border-gray-200">{t}</span>
                  ))}
                </div>
              </motion.button>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-500 text-sm py-6">
                No events match your filters. Try another year, theme, or search term.
              </div>
            )}
          </div>
        </div>

        {/* Quick theme chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <Chip key={`chip-${t}`} label={t} active={t === theme} onClick={() => setTheme(t)} />
          ))}
        </div>

        {/* Accessibility & pedagogy notes */}
        <section className="mt-10 bg-white border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Teacher Notes</h2>
          <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-2 text-sm">
            <li><strong>Curricular tie‑ins:</strong> Confederation and Canadian identity; Indigenous perspectives (Treaties, TRC); Alberta milestones; Rights and responsibilities under the Charter.</li>
            <li><strong>Activities:</strong> Ask students to pick one event and add a primary/secondary source; compare perspectives (e.g., government vs. Indigenous accounts).</li>
            <li><strong>Differentiation:</strong> Use the search for vocabulary support; set the year scrubber to a narrower window for focus.</li>
            <li><strong>Assessment:</strong> Exit ticket: “One new thing I learned, one question I still have.”</li>
          </ul>
        </section>

        <footer className="mt-8 text-xs text-gray-500">
          Made with React + Tailwind + Framer Motion. Content is simplified for Jr. High exploration.
        </footer>
      </div>

      <Modal open={!!active} onClose={() => setActive(null)} event={active || EVENTS[0]} />
    </div>
  );
}
