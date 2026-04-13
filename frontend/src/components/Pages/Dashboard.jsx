import { useState, useEffect, useRef } from "react";

const heatAreas = [
  { id: 1, area: "Area 1", name: "Main Hall",    temp: 41, sensor: "TMP-01" },
  { id: 2, area: "Area 2", name: "Lab Block A",  temp: 30, sensor: "TMP-02" },
  { id: 3, area: "Area 3", name: "Library",       temp: 20, sensor: "TMP-03" },
  { id: 4, area: "Area 4", name: "Cafeteria",     temp: 38, sensor: "TMP-04" },
  { id: 5, area: "Area 5", name: "Server Room",   temp: 28, sensor: "TMP-05" },
  { id: 6, area: "Area 6", name: "Admin Block",   temp: 22, sensor: "TMP-06" },
];

const gasKitchens = [
  { id: 1, name: "Main Canteen Kitchen", location: "Ground Floor, Block A",         leak: false },
  { id: 2, name: "Staff Pantry",          location: "First Floor, Admin Wing",       leak: true  },
  { id: 3, name: "Lab Prep Room",         location: "Ground Floor, Lab Block",       leak: false },
  { id: 4, name: "Hostel Mess",           location: "Hostel Building, Ground Floor", leak: false },
];

const garbageBins = [
  { id: 1, area: "Area 1", location: "Main Entrance", binId: "BIN-01", fill: 35 },
  { id: 2, area: "Area 2", location: "Cafeteria",      binId: "BIN-02", fill: 72 },
  { id: 3, area: "Area 3", location: "Lab Block",      binId: "BIN-03", fill: 95 },
  { id: 4, area: "Area 4", location: "Parking",        binId: "BIN-04", fill: 20 },
];

const forecast = [
  { day: "Mon", icon: "☀️",  temp: "36°C" },
  { day: "Tue", icon: "⛅",  temp: "33°C" },
  { day: "Wed", icon: "🌤",  temp: "30°C" },
  { day: "Thu", icon: "🌧",  temp: "28°C" },
  { day: "Fri", icon: "☀️",  temp: "35°C" },
];

const NAV = [
  { id: "overview",  label: "Overview",       icon: "⊞", badge: null },
  { id: "heatmap",   label: "Heat Maps",      icon: "◈", badge: null },
  { id: "gas",       label: "Gas Leakage",    icon: "◎", badge: 1   },
  { id: "footfall",  label: "Footfall",       icon: "◉", badge: null },
  { id: "garbage",   label: "Garbage Status", icon: "◷", badge: 1   },
  { id: "weather",   label: "Weather",        icon: "◌", badge: null },
];

function getTempStyle(temp) {
  if (temp >= 35) return { card: "bg-orange-50 border-orange-200", text: "text-orange-600", bar: "bg-orange-500" };
  if (temp >= 26) return { card: "bg-amber-50 border-amber-200",   text: "text-amber-500",  bar: "bg-amber-400"  };
  return               { card: "bg-blue-50 border-blue-200",       text: "text-blue-500",   bar: "bg-blue-400"   };
}

function getFillStyle(fill) {
  if (fill >= 90) return { text: "text-red-500",   bar: "bg-red-500",   label: "Overflow Warning!", card: "bg-red-50 border-red-200"  };
  if (fill >= 60) return { text: "text-amber-500", bar: "bg-amber-400", label: "Nearing Capacity",  card: "bg-white border-gray-100"  };
  return               { text: "text-green-600", bar: "bg-green-500", label: "Normal",             card: "bg-white border-gray-100"  };
}

function PulseDot() {
  return <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1.5 animate-pulse" />;
}

function DonutChart() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx    = cv.getContext("2d");
    const fills  = garbageBins.map((b) => b.fill);
    const colors = ["#22c55e", "#f59e0b", "#ef4444", "#22c55e"];
    const total  = fills.reduce((a, b) => a + b, 0);
    let start = -Math.PI / 2;
    fills.forEach((v, i) => {
      const slice = (v / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(40, 40, 32, start, start + slice);
      ctx.lineWidth   = 10;
      ctx.strokeStyle = colors[i];
      ctx.stroke();
      start += slice;
    });
    const avg = Math.round(total / fills.length);
    ctx.font          = "bold 13px sans-serif";
    ctx.fillStyle     = "#ea580c";
    ctx.textAlign     = "center";
    ctx.textBaseline  = "middle";
    ctx.fillText(avg + "%", 40, 40);
  }, []);
  return <canvas ref={canvasRef} width={80} height={80} />;
}

// Simple outline bell SVG — clean and minimal
function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      className="text-gray-400"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export default function Dashboard() {
  const [active, setActive] = useState("overview");
  const [clock,  setClock]  = useState("");

  useEffect(() => {
    const tick = () => {
      const now  = new Date();
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const date = now.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short", year: "numeric" });
      setClock(`${date} — ${time}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ── SIDEBAR 20% ── */}
      <aside className="w-1/5 min-w-[155px] bg-white border-r border-gray-100 flex flex-col">

        {/* User info */}
        <div className="px-3.5 pt-4 pb-3 border-b border-gray-100">
          <div className="w-9 h-9 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center font-medium text-orange-600 text-sm mb-2">
            U
          </div>
          <p className="text-[13px] font-medium text-gray-800">Welcome, User</p>
          <p className="text-[11px] text-gray-400 mt-0.5">IoT Administrator</p>
        </div>

        {/* Clock + bell row */}
        <div className="px-3.5 py-2 border-b border-gray-100 flex items-center justify-between">
          <span className="text-[11px] text-gray-400">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          <div className="relative cursor-pointer" onClick={() => setActive("overview")}>
            <BellIcon />
            <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-semibold rounded-full w-3.5 h-3.5 flex items-center justify-center">
              2
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-1">
          <p className="px-3.5 pt-3 pb-1 text-[10px] font-medium text-gray-400 uppercase tracking-widest">
            Monitoring
          </p>
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 text-[12.5px] transition-colors text-left
                ${active === item.id
                  ? "bg-orange-50 text-orange-600 font-medium border-l-[3px] border-orange-500"
                  : "text-gray-600 hover:bg-orange-50 hover:text-orange-600 border-l-[3px] border-transparent"
                }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </span>
              {item.badge && (
                <span className="bg-red-500 text-white text-[9px] font-semibold rounded-full px-1.5 py-0.5">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-3.5 py-3 border-t border-gray-100 text-[11px] text-gray-400">
          Smart IoT Platform v2.0
        </div>
      </aside>

      {/* ── MAIN 80% ── */}
      <main className="flex-1 overflow-y-auto px-6 py-5">

        {/* Live clock bar */}
        <div className="flex justify-between items-center mb-4 pb-3.5 border-b border-gray-100">
          <span className="text-[13px] text-gray-500">{clock}</span>
          <span className="text-[11px] text-gray-400">Last synced: just now</span>
        </div>

        {/* ── OVERVIEW ── */}
        {active === "overview" && (
          <div>
            <div className="mb-5">
              <h1 className="text-xl font-semibold text-gray-800">Dashboard Overview</h1>
              <p className="text-sm text-gray-500 mt-1">Real-time campus monitoring — Adityapur</p>
            </div>

            {/* Description banner */}
            <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-blue-50 p-6 flex justify-between items-center mb-5">
              <div>
                <h2 className="text-[16px] font-medium text-gray-800">Smart IoT Monitoring System</h2>
                <p className="text-[13px] text-gray-500 mt-2 max-w-lg leading-relaxed">
                  This platform provides real-time monitoring of heat maps, gas leakage sensors,
                  footfall counters, garbage fill levels, and campus weather — all from a single,
                  unified dashboard. Select a module from the left panel to get started.
                </p>
              </div>
              <div className="flex gap-3 shrink-0 ml-6">
                {[["12","Devices"],["4","Alerts"],["98%","Uptime"]].map(([v, l]) => (
                  <div key={l} className="bg-white border border-orange-200 rounded-lg px-4 py-3 text-center">
                    <div className="text-xl font-semibold text-orange-600">{v}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {[
                { label: "Devices Online",  val: "12",  bg: "bg-orange-50 border-orange-200", vc: "text-orange-600", lc: "text-orange-700" },
                { label: "Active Alerts",   val: "2",   bg: "bg-red-50 border-red-200",        vc: "text-red-500",    lc: "text-red-700"    },
                { label: "System Uptime",   val: "98%", bg: "bg-green-50 border-green-200",    vc: "text-green-600",  lc: "text-green-700"  },
                { label: "Areas Monitored", val: "6",   bg: "bg-blue-50 border-blue-200",      vc: "text-blue-500",   lc: "text-blue-700"   },
              ].map(({ label, val, bg, vc, lc }) => (
                <div key={label} className={`${bg} border rounded-xl px-4 py-3.5`}>
                  <div className={`text-[11px] font-medium ${lc}`}>{label}</div>
                  <div className={`text-2xl font-semibold mt-1 ${vc}`}>{val}</div>
                </div>
              ))}
            </div>

            {/* Recent alerts */}
            <div className="bg-white border border-gray-100 rounded-xl p-4">
              <div className="text-[13px] font-medium text-gray-700 mb-2.5">Recent Alerts</div>
              <div className="flex items-center gap-3 py-2 border-b border-gray-50">
                <span className="text-[11px] bg-red-50 text-red-600 border border-red-200 rounded-lg px-2 py-0.5">Gas</span>
                <span className="text-[13px] text-gray-800">Staff Pantry — Gas leak detected</span>
                <span className="text-[11px] text-gray-400 ml-auto">2 min ago</span>
              </div>
              <div className="flex items-center gap-3 py-2">
                <span className="text-[11px] bg-red-50 text-red-600 border border-red-200 rounded-lg px-2 py-0.5">Garbage</span>
                <span className="text-[13px] text-gray-800">Lab Block BIN-03 — Overflow warning</span>
                <span className="text-[11px] text-gray-400 ml-auto">8 min ago</span>
              </div>
            </div>
          </div>
        )}

        {/* ── HEAT MAPS ── */}
        {active === "heatmap" && (
          <div>
            <div className="mb-5">
              <h1 className="text-xl font-semibold text-gray-800">Heat Maps</h1>
              <p className="text-sm text-gray-500 mt-1">Live temperature from heat sensors — campus areas</p>
            </div>
            <p className="text-[13px] font-medium text-gray-700 mb-3">Campus areas</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {heatAreas.map((area) => {
                const s    = getTempStyle(area.temp);
                const barW = Math.min(Math.round((area.temp / 50) * 100), 100);
                const isCritical = area.temp >= 38;
                return (
                  <div key={area.id} className={`border rounded-xl p-4 ${s.card}`}>
                    <p className="text-[11px] text-gray-400">{area.area}</p>
                    <p className="text-[13px] font-medium text-gray-800 mt-0.5 mb-3">{area.name}</p>
                    <div className="h-1.5 bg-white/70 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${s.bar} transition-all duration-700`} style={{ width: `${barW}%` }} />
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1.5">Sensor: {area.sensor}</p>
                    <p className={`text-[22px] font-semibold mt-1.5 ${s.text}`}>{area.temp}°C</p>
                    {isCritical && (
                      <span className="inline-flex items-center bg-red-50 text-red-600 border border-red-200 text-[10px] font-medium rounded-full px-2 py-0.5 mt-1.5">
                        <PulseDot />Critical
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── GAS LEAKAGE ── */}
        {active === "gas" && (
          <div>
            <div className="mb-5">
              <h1 className="text-xl font-semibold text-gray-800">Gas Leakage</h1>
              <p className="text-sm text-gray-500 mt-1">Real-time gas sensor status from kitchen areas</p>
            </div>
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-[13px] font-medium text-red-800">
              <PulseDot />
              1 of 4 kitchens has an active gas leak — immediate attention required
            </div>
            <div className="flex flex-col gap-3">
              {gasKitchens.map((k) => (
                <div
                  key={k.id}
                  className={`border rounded-xl px-5 py-4 flex justify-between items-center transition-colors
                    ${k.leak ? "bg-red-50 border-red-200" : "bg-white border-gray-100"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{k.leak ? "🔥" : "👁"}</span>
                    <div>
                      <p className="text-[14px] font-medium text-gray-800">{k.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{k.location}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-medium px-3 py-1.5 rounded-full border
                    ${k.leak
                      ? "bg-red-50 text-red-600 border-red-300 animate-pulse"
                      : "bg-green-50 text-green-700 border-green-200"
                    }`}
                  >
                    {k.leak ? "Gas Leak Detected!" : "No Leak Detected"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FOOTFALL ── */}
        {active === "footfall" && (
          <div>
            <div className="mb-5">
              <h1 className="text-xl font-semibold text-gray-800">Footfall</h1>
              <p className="text-sm text-gray-500 mt-1">People counting across entry/exit points</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl py-16 text-center">
              <p className="text-[15px] font-medium text-gray-700">Module under development</p>
              <p className="text-[13px] text-gray-400 mt-2">
                Footfall sensors are being calibrated. Data will appear here once integration is complete.
              </p>
            </div>
          </div>
        )}

        {/* ── GARBAGE STATUS ── */}
        {active === "garbage" && (
          <div>
            <div className="mb-5">
              <h1 className="text-xl font-semibold text-gray-800">Garbage Status</h1>
              <p className="text-sm text-gray-500 mt-1">IR/UV sensor readings — bin fill levels</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center gap-5 mb-4">
              <DonutChart />
              <div>
                <p className="text-[13px] font-medium text-gray-800">Campus average fill</p>
                <p className="text-[26px] font-semibold text-orange-600 mt-0.5">55%</p>
                <p className="text-[11px] text-gray-400">across 4 monitored bins</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {garbageBins.map((bin) => {
                const f = getFillStyle(bin.fill);
                return (
                  <div key={bin.id} className={`border rounded-xl px-5 py-4 ${f.card}`}>
                    <div className="flex justify-between items-center mb-2.5">
                      <div>
                        <p className="text-[14px] font-medium text-gray-800">{bin.area} — {bin.location}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Bin ID: {bin.binId}</p>
                      </div>
                      <span className={`text-[13px] font-semibold ${f.text}`}>{bin.fill}% Full</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${f.bar} transition-all duration-500`} style={{ width: `${bin.fill}%` }} />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1.5">Status: {f.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── WEATHER ── */}
        {active === "weather" && (
          <div>
            <div className="mb-5">
              <h1 className="text-xl font-semibold text-gray-800">Weather</h1>
              <p className="text-sm text-gray-500 mt-1">Current conditions — Adityapur, Jharkhand</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl px-6 py-5 flex items-center gap-8 mb-4">
              <span className="text-5xl">⛅</span>
              <div className="flex-1">
                <p className="text-[16px] font-medium text-gray-800">Adityapur, Jharkhand</p>
                <p className="text-[13px] text-gray-500 mt-1">Partly Cloudy — feels like 36°C</p>
              </div>
              <p className="text-5xl font-semibold text-orange-600">34°C</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                ["Humidity",   "68%"],
                ["Wind",       "12 km/h →"],
                ["UV Index",   "6 — High"],
                ["Visibility", "8 km"],
                ["Pressure",   "1008 hPa"],
                ["Dew Point",  "27°C"],
              ].map(([label, value]) => (
                <div key={label} className="bg-white border border-gray-100 rounded-xl px-4 py-3">
                  <p className="text-[11px] text-gray-400">{label}</p>
                  <p className="text-[16px] font-medium text-gray-800 mt-1">{value}</p>
                </div>
              ))}
            </div>
            <p className="text-[13px] font-medium text-gray-700 mb-2.5">5-day forecast</p>
            <div className="flex gap-3">
              {forecast.map((f) => (
                <div key={f.day} className="flex-1 bg-white border border-gray-100 rounded-xl py-3 text-center">
                  <p className="text-[11px] text-gray-400">{f.day}</p>
                  <p className="text-lg my-1">{f.icon}</p>
                  <p className="text-[13px] font-medium text-gray-800">{f.temp}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
