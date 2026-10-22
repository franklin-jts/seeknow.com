import useInit from '../hooks/useInit';
import init from '../scripts/s7-trust.js';

export default function Trust() {
  useInit(init);
  return (
    <section className="s7" id="trust" aria-labelledby="s7-title">
      <div className="wrap">
        <div className="inner">
          <div className="s7-intro s7-fade" data-f="">
            <span className="eyebrow">The Trust Behind Seek Now</span>
            <h2 className="s7-h2" id="s7-title">
              <span>Built on Trust.</span>
              <span className="soft">Driven by People.</span>
            </h2>
            <p className="s7-lede">Workforce technology is about more than software. It's about the people, teams and organisations that depend on reliable recruitment and employee operations.</p>
          </div>
          {/* Part 1 · Relationships (rendered only from approved logos) */}
          <div className="s7-rel" id="s7-rel" hidden>
            <div className="s7-rel-head s7-fade" data-f="">
              <div>
                <span className="eyebrow">Our Business Relationships</span>
                <h3>Relationships That Move Business Forward.</h3>
              </div>
              <p>We value the organisations and teams we work with, building lasting relationships through people-focused business services.</p>
            </div>
            <div className="s7-mq" aria-label="Organisations we work with" role="region"> <div className="s7-mq-track" id="s7-track" /></div>
            <div className="s7-mq-note" id="s7-mq-note" />
          </div>
          {/* Part 2 · Testimonials (rendered only from approved quotes) */}
          <div className="s7-tst dim" id="s7-tst" hidden>
            <h3 className="sr">What customers say</h3>
            <div className="s7-stage" role="region" aria-roledescription="carousel" aria-label="Customer testimonials">
              <span className="s7-tst-dev" id="s7-tst-dev" hidden>
                <span className="s7-dev">Dev placeholder · not for publication</span>
              </span>
              {' '}
              <svg className="s7-qm" viewBox="0 0 64 48" aria-hidden="true"> <path d="M0 48V28C0 12 8 3 24 0l3 7C18 10 14 15 13 22h11v26zm36 0V28C36 12 44 3 60 0l3 7c-9 3-13 8-14 15h11v26z" /></svg>
              <div className="s7-slides" id="s7-slides" aria-live="polite" />
              <div className="s7-ctrl">
                <div className="s7-prog" id="s7-prog" aria-hidden="true" />
                <span className="s7-count" id="s7-count" />
                <div className="s7-btns">
                  <button type="button" id="s7-prev" aria-label="Previous testimonial">
                    <svg viewBox="0 0 24 24"> <path d="M15 6l-6 6 6 6" /></svg>
                  </button>
                  {' '}
                  <button type="button" id="s7-next" aria-label="Next testimonial">
                    <svg viewBox="0 0 24 24"> <path d="M9 6l6 6-6 6" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Part 3 · Facts (rendered only from verified figures) */}
          <div className="s7-facts s7-fade" id="s7-facts" data-f="" hidden>
            <h3 className="sr">Seek Now in facts</h3>
            <div className="s7-facts-dev" id="s7-facts-dev" hidden>
              <span className="s7-dev">Dev placeholder · verified figures required</span>
            </div>
            <ul className="s7-fl" id="s7-fl" />
          </div>
        </div>
      </div>
      {/* Part 4 · Human statement */}
      <div className="s7-band wrap" id="s7-band">
        <div className="inner">
          <span className="eyebrow">The People Behind the Platform</span>
          <h3 id="s7-band-h">
            <span className="w">Technology</span>
            {' '}
            <span className="w">Built</span>
            {' '}
            <span className="w">Around</span>
            {' '}
            <span className="w">People.</span>
          </h3>
          <div className="s7-band-row s7-fade" data-f="">
            <p>Behind every job application, hiring decision and workday is a person. Seek Now is designed with that responsibility in mind.</p>
            <p>That thinking shapes everything from our recruitment services and HR technology to the workforce management and employee management tools teams use every day.</p>
          </div>
        </div>
      </div>
      {/* Part 5 · Soft conversion */}
      <div className="wrap">
        <div className="s7-cta s7-fade" data-f="">
          <h3>Let's Build a Better Way to Work.</h3>
          <p>See how Seek Now can support your organisation's recruitment and employee management needs.</p>
          <div className="ctas">
            <a className="btn btn-primary" href="#" data-route="contact">
              Talk to Our Team
              {' '}
              <span className="arr" aria-hidden="true">→</span>
            </a>
            {' '}
            <a className="btn btn-ghost" href="#" data-route="solutions">
              Explore Our Solutions
              {' '}
              <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
