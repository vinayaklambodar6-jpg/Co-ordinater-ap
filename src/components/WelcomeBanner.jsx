export default function WelcomeBanner({ name, subtitle, compact = false }) {
  const firstName = (name || '').split(' ')[0]

  return (
    <section className={`welcome-banner${compact ? ' compact' : ''} no-print`}>
      <div className="welcome-copy">
        <p className="welcome-eyebrow">School Coordinator Portal</p>
        <h2>Welcome{firstName ? `, ${firstName}` : ''} 👋</h2>
        <p className="welcome-sub">
          {subtitle ||
            'Aaj ke school operations ek nazar mein — timetable, substitutions, diary aur test papers sab yahin se manage karein.'}
        </p>
        <div className="welcome-pills">
          <span className="welcome-pill">📅 Timetable</span>
          <span className="welcome-pill">📝 Test Papers</span>
          <span className="welcome-pill">🔔 Alerts</span>
        </div>
      </div>

      <div className="welcome-art" aria-hidden="true">
        <svg viewBox="0 0 420 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wb-screen" x1="130" y1="76" x2="306" y2="176" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e0f2fe" />
              <stop offset="1" stopColor="#f0fdf4" />
            </linearGradient>
            <linearGradient id="wb-cap" x1="285" y1="26" x2="355" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#15803d" />
              <stop offset="1" stopColor="#0e7490" />
            </linearGradient>
          </defs>

          <circle cx="340" cy="46" r="52" fill="#bae6fd" opacity="0.45" />
          <circle cx="72" cy="212" r="62" fill="#bbf7d0" opacity="0.45" />

          {/* floating maths / study symbols */}
          <circle cx="52" cy="82" r="5" fill="#0e7490" opacity="0.5" />
          <circle cx="382" cy="150" r="4" fill="#15803d" opacity="0.5" />
          <path d="M56 128v16M48 136h16" stroke="#0e7490" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
          <path d="M370 96v14M363 103h14" stroke="#15803d" strokeWidth="3" strokeLinecap="round" opacity="0.55" />
          <circle cx="90" cy="42" r="4" fill="#f59e0b" opacity="0.7" />

          {/* light bulb */}
          <path
            d="M82 96c0-9.4 7.6-17 17-17s17 7.6 17 17c0 6-3.1 10.1-6.2 13.6-2 2.2-3.3 4-3.8 6.4h-14c-.5-2.4-1.8-4.2-3.8-6.4C85.1 106.1 82 102 82 96z"
            fill="#fde68a"
            stroke="#b45309"
            strokeWidth="2"
          />
          <path d="M96 122h6" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M97 128h4" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M99 79v-7" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />

          {/* laptop */}
          <rect x="119" y="63" width="200" height="128" rx="12" fill="#0f172a" />
          <rect x="128" y="72" width="182" height="110" rx="8" fill="url(#wb-screen)" />

          {/* dashboard on screen */}
          <rect x="140" y="86" width="62" height="8" rx="4" fill="#0e7490" opacity="0.85" />
          <rect x="140" y="102" width="44" height="6" rx="3" fill="#64748b" opacity="0.6" />
          <rect x="140" y="140" width="16" height="28" rx="3" fill="#15803d" />
          <rect x="163" y="128" width="16" height="40" rx="3" fill="#0e7490" />
          <rect x="186" y="118" width="16" height="50" rx="3" fill="#38bdf8" />
          <rect x="209" y="134" width="16" height="34" rx="3" fill="#f59e0b" />
          <rect x="140" y="172" width="85" height="2" rx="1" fill="#94a3b8" />
          <rect x="240" y="86" width="54" height="34" rx="6" fill="#ffffff" stroke="#bae6fd" />
          <path d="M249 104l7-7 5 5 9-10" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="240" y="130" width="54" height="44" rx="6" fill="#ffffff" stroke="#bae6fd" />
          <circle cx="256" cy="146" r="6" fill="#bfdbfe" />
          <rect x="267" y="141" width="20" height="4" rx="2" fill="#94a3b8" />
          <rect x="267" y="149" width="14" height="3" rx="1.5" fill="#cbd5e1" />
          <rect x="248" y="160" width="38" height="3" rx="1.5" fill="#cbd5e1" />
          <rect x="248" y="166" width="26" height="3" rx="1.5" fill="#e2e8f0" />

          {/* laptop base */}
          <path d="M100 191h238l12 14H88l12-14z" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="186" y="196" width="66" height="5" rx="2.5" fill="#94a3b8" />

          {/* graduation cap */}
          <path d="M320 30l38 14-38 14-38-14 38-14z" fill="url(#wb-cap)" />
          <path d="M300 51v13c0 5 9 9 20 9s20-4 20-9V51" stroke="#0f766e" strokeWidth="3" fill="none" />
          <path d="M358 44v20" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="358" cy="66" r="3.5" fill="#f59e0b" />

          {/* books */}
          <rect x="34" y="206" width="96" height="15" rx="4" fill="#15803d" />
          <rect x="42" y="192" width="88" height="14" rx="4" fill="#f59e0b" />
          <rect x="38" y="178" width="92" height="14" rx="4" fill="#0e7490" />
          <rect x="46" y="182" width="76" height="3" rx="1.5" fill="#ffffff" opacity="0.8" />
          <rect x="50" y="196" width="72" height="3" rx="1.5" fill="#ffffff" opacity="0.8" />
          <rect x="42" y="210" width="80" height="3" rx="1.5" fill="#ffffff" opacity="0.8" />

          {/* floating pencil */}
          <g transform="rotate(32 378 196)">
            <rect x="370" y="170" width="12" height="44" rx="2" fill="#fbbf24" />
            <path d="M370 214l6 12 6-12h-12z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
            <rect x="370" y="166" width="12" height="7" rx="2" fill="#f472b6" />
          </g>
        </svg>
      </div>
    </section>
  )
}
