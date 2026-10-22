import ReferWindow from './ReferWindow.jsx';
import ConsoleWindow from './ConsoleWindow.jsx';
import PeopleWindow from './PeopleWindow.jsx';

export default function Story() {
  return (
    <div id="platform" style={{ scrollMarginTop: '0' }}>
      <section
        className="story-static"
        id="story"
        aria-labelledby="story-title"
      >
        {/* ── Heading + CTA — sits ABOVE the windows, not inside the stage ── */}
        <div className="story-copy">
          <h2 className="story-h2" id="story-title">
            Three Products.<br />One Workforce Operating System.
          </h2>
          <p className="story-sub">
            One connected journey, from talent discovery to everyday workforce management.
          </p>
          <a className="btn btn-primary story-cta" href="#why-seek-now">
            Discover Seek Now <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>

        {/* ── Window stage — separate from copy so no overlap ── */}
        <div className="stage-static" aria-label="Seek Now products: Refer Now, Console and Seek People">
          <div className="space">
            {/* Orbit ring SVG */}
            <svg className="orbit" id="orbit" aria-hidden="true">
              <defs>
                <linearGradient id="linkGrad" x1="0" x2="1">
                  <stop offset="0"  stopColor="#8660F8" />
                  <stop offset=".5" stopColor="#B991FF" />
                  <stop offset="1"  stopColor="#8660F8" />
                </linearGradient>
              </defs>
              <ellipse className="ring2" id="o-ring2" />
              <ellipse className="ring"  id="o-ring"  />
              <path    className="link"  id="o-link"  />
              <circle className="node" r="5" id="o-n0" />
              <circle className="node" r="5" id="o-n1" />
              <circle className="node" r="5" id="o-n2" />
              <circle className="spark-halo" r="9" id="o-halo" />
              <circle className="spark"      r="3" id="o-spark" />
            </svg>

            {/* 3 product windows — positioned by JS */}
            <div className="pw story-pw" data-slot="refer"   data-key="refer">  <ReferWindow   /></div>
            <div className="pw story-pw" data-slot="console" data-key="console"><ConsoleWindow /></div>
            <div className="pw story-pw" data-slot="people"  data-key="people"> <PeopleWindow  /></div>
          </div>

          <p className="fine">Interfaces shown with illustrative sample data</p>
        </div>
      </section>
    </div>
  );
}
