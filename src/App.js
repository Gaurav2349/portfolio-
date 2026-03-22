import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// ── CONFIG — update these ──────────────────────────────
const CONFIG = {
  name: "Gaurav Nayak",
  role: "DevOps Engineer",
  github: "Gaurav2349",
  linkedin: "nayakgaurav01",
  email: "gauravmnayak@gmail.com",
  phone: "+91 9579183049",
  location: "Pune, Maharashtra",
  resumeUrl: process.env.PUBLIC_URL + "/resume.pdf",
  devtoUsername: "gauravnayak",
  roles: [
    "DevOps Engineer",
    "Cloud Administrator",
    "Linux Security Expert",
    "CI/CD Pipeline Builder",
    "Infrastructure Automator",
  ],
};

const SKILLS = [
  { category: "Containers & Orchestration", items: [
    { name: "Docker", level: 85 },
    { name: "Kubernetes", level: 75 },
    { name: "Helm", level: 60 },
  ]},
  { category: "CI/CD & Automation", items: [
    { name: "Jenkins", level: 80 },
    { name: "GitHub Actions", level: 75 },
    { name: "Terraform", level: 70 },
  ]},
  { category: "Linux & Security", items: [
    { name: "Linux Admin", level: 90 },
    { name: "Bash Scripting", level: 85 },
    { name: "IDS/IPS & Firewalls", level: 80 },
  ]},
  { category: "Cloud & Monitoring", items: [
    { name: "AWS / GCP", level: 70 },
    { name: "Prometheus & Grafana", level: 72 },
    { name: "ELK Stack", level: 65 },
  ]},
];

const PROJECTS = [
  {
    title: "CI/CD Automation Pipeline",
    date: "Nov 2024",
    desc: "End-to-end automated pipeline using Jenkins — build, test, containerize, deploy with zero manual intervention. GitHub webhooks trigger builds on every commit.",
    stack: ["Jenkins", "Docker", "Kubernetes", "Terraform", "AWS/GCP", "Shell"],
    github: "https://github.com/Gaurav2349/devops-pipeline",
    highlight: true,
  },
  {
    title: "Crop Recommendation System",
    date: "Jan 2024",
    desc: "ML-based system suggesting optimal crops based on soil properties and weather data. Interactive Flask + React web app with Matplotlib visualizations.",
    stack: ["Python", "TensorFlow", "Flask", "React", "NumPy", "Seaborn"],
    github: "https://github.com/Gaurav2349",
    highlight: false,
  },
];

const EXPERIENCE = [
  {
    period: "Aug 2024 – Feb 2025",
    title: "PG Diploma — DITISS",
    org: "CDAC Pune",
    points: [
      "Linux Administration — users, permissions, scripting, services",
      "Networking — TCP/IP, Subnetting, DNS, DHCP, Firewalls, VPN",
      "Security — IDS/IPS, Incident Response, System Hardening",
      "DevOps — Docker, Jenkins, Git, Kubernetes, Terraform",
      "Cloud — AWS/GCP compute, storage, IAM, VPC, monitoring",
    ],
  },
  {
    period: "Sep 2020 – Jun 2024",
    title: "B.E. Information Technology",
    org: "Savitribai Phule Pune University",
    points: [
      "Core: Python, Linux, Shell Scripting, Networking, OS, DBMS",
      "Cloud Computing (AWS/GCP), Security, DevOps Fundamentals",
      "Docker & Containerization, Jenkins CI/CD, Terraform",
    ],
  },
];

// ── COMPONENTS ────────────────────────────────────────

function Cursor() {
  const curRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (curRef.current) { curRef.current.style.left = e.clientX + 'px'; curRef.current.style.top = e.clientY + 'px'; }
      setTimeout(() => { if (ringRef.current) { ringRef.current.style.left = e.clientX + 'px'; ringRef.current.style.top = e.clientY + 'px'; } }, 80);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (<><div ref={curRef} className="cursor-dot" /><div ref={ringRef} className="cursor-ring" /></>);
}

function Typewriter({ roles }) {
  const [text, setText] = useState('');
  const [ri, setRi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = roles[ri];
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, ci + 1));
        if (ci + 1 > word.length) { setTimeout(() => setDeleting(true), 1800); return; }
        setCi(c => c + 1);
      } else {
        setText(word.slice(0, ci - 1));
        if (ci - 1 < 0) { setDeleting(false); setRi(r => (r + 1) % roles.length); setCi(0); return; }
        setCi(c => c - 1);
      }
    }, deleting ? 45 : 85);
    return () => clearTimeout(timer);
  }, [ci, deleting, ri, roles]);
  return <span className="typewriter">&gt; {text}<span className="blink-cursor" /></span>;
}

function SkillBar({ name, level, visible }) {
  return (
    <div className="skill-item">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: visible ? `${level}%` : '0%' }} />
      </div>
    </div>
  );
}

function SkillCard({ category, items, visible }) {
  return (
    <div className="skill-card">
      <div className="skill-cat">{category}</div>
      {items.map(s => <SkillBar key={s.name} {...s} visible={visible} />)}
    </div>
  );
}

function ProjectCard({ title, date, desc, stack, github, highlight }) {
  return (
    <div className={`project-card ${highlight ? 'featured' : ''}`}>
      {highlight && <div className="featured-badge">Featured</div>}
      <div className="project-date">{date}</div>
      <div className="project-title">{title}</div>
      <div className="project-desc">{desc}</div>
      <div className="project-stack">
        {stack.map(t => <span key={t} className="stack-tag">{t}</span>)}
      </div>
      <a href={github} target="_blank" rel="noreferrer" className="project-link">
        View on GitHub →
      </a>
    </div>
  );
}

function GitHubGraph({ username }) {
  return (
    <div className="github-graph">
      <div className="gh-label">GitHub Contributions — {username}</div>
      <img
        src={`https://ghchart.rshah.org/00d4ff/${username}`}
        alt="GitHub contribution graph"
        className="gh-img"
        onError={e => { e.target.style.display = 'none'; }}
      />
      <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="gh-link">
        @{username} on GitHub →
      </a>
    </div>
  );
}

function BlogSection({ username }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://dev.to/api/articles?username=${username}&per_page=3`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [username]);
  return (
    <div className="blog-section">
      {loading && <div className="blog-loading">Loading posts from Dev.to...</div>}
      {!loading && posts.length === 0 && (
        <div className="blog-empty">
          <div className="blog-empty-title">No posts yet</div>
          <div className="blog-empty-desc">Start writing on Dev.to and your posts will appear here automatically.</div>
          <a href={`https://dev.to/${username}`} target="_blank" rel="noreferrer" className="btn-secondary">
            Start Writing on Dev.to →
          </a>
        </div>
      )}
      {posts.map(post => (
        <a key={post.id} href={post.url} target="_blank" rel="noreferrer" className="blog-card">
          <div className="blog-title">{post.title}</div>
          <div className="blog-meta">
            <span>{new Date(post.published_at).toLocaleDateString()}</span>
            <span>{post.reading_time_minutes} min read</span>
            <span>♥ {post.positive_reactions_count}</span>
          </div>
          {post.tag_list && <div className="blog-tags">{post.tag_list.slice(0,3).map(t => <span key={t} className="blog-tag">#{t}</span>)}</div>}
        </a>
      ))}
    </div>
  );
}

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function Section({ id, label, title, accent, children }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <section id={id} ref={ref} className={`section ${visible ? 'section-visible' : ''}`}>
      <div className="sec-label">{label}</div>
      <h2 className="sec-title">{title} <span className="accent">{accent}</span></h2>
      {children}
    </section>
  );
}

// ── MAIN APP ──────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const skillsRef = useRef(null);
  const skillsVisible = useInView(skillsRef);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };

  return (
    <div className="app">
      <Cursor />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" onClick={() => scrollTo('hero')}>
          <span className="nav-dot" />&lt;gaurav.nayak /&gt;
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {['about','skills','projects','experience','blogs','contact'].map(id => (
            <li key={id}><button onClick={() => scrollTo(id)}>{id}</button></li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">// Available for hire — DevOps &amp; Cloud</div>
          <h1 className="hero-name">Gaurav<br /><span className="accent">Nayak.</span></h1>
          <div className="hero-role"><Typewriter roles={CONFIG.roles} /></div>
          <p className="hero-desc">
            DevOps Engineer &amp; Cloud Linux Administrator from Pune.
            CDAC DITISS trained. Hands-on with Docker, Kubernetes,
            Jenkins, Terraform, Linux Security and Cloud infrastructure.
          </p>
          <div className="hero-btns">
            <button onClick={() => scrollTo('projects')} className="btn-primary">View Projects</button>
            <a href={CONFIG.resumeUrl} download className="btn-secondary">Download Resume ↓</a>
            <button onClick={() => scrollTo('contact')} className="btn-outline">Hire Me</button>
          </div>
          <div className="hero-links">
            <a href={`https://github.com/${CONFIG.github}`} target="_blank" rel="noreferrer">GitHub</a>
            <a href={`https://linkedin.com/in/${CONFIG.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={`mailto:${CONFIG.email}`}>Email</a>
          </div>
        </div>

        {/* Terminal */}
        <div className="terminal">
          <div className="t-bar">
            <span className="dot r" /><span className="dot y" /><span className="dot g" />
            <span className="t-title">gaurav@devops:~</span>
          </div>
          <div className="t-body">
            <div><span className="t-prompt">$ </span><span className="t-cmd">whoami</span></div>
            <div className="t-out t-cyan">→ DevOps &amp; Cloud Engineer</div>
            <div style={{marginTop:'0.4rem'}}><span className="t-prompt">$ </span><span className="t-cmd">kubectl get skills</span></div>
            <div className="t-out">NAME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATUS</div>
            {["Docker","Kubernetes","Jenkins","Terraform","Linux","Security"].map(s => (
              <div key={s} className="t-out t-green">{s.padEnd(12,' ')}<span> Running ✓</span></div>
            ))}
            <div style={{marginTop:'0.4rem'}}><span className="t-prompt">$ </span><span className="t-cmd">cat status.txt</span></div>
            <div className="t-out t-green">→ Open to opportunities 🚀</div>
            <div style={{marginTop:'0.4rem'}}><span className="t-prompt">$ </span><span className="t-blink" /></div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" label="01 // about" title="Who I" accent="Am">
        <div className="about-grid">
          <div className="about-text">
            <p>I'm <strong>Gaurav Nayak</strong>, a fresher DevOps Engineer based in Pune with a <strong>B.E. in Information Technology</strong> from SPPU and a <strong>PG Diploma (DITISS) from CDAC Pune</strong> — one of India's most respected IT training programs.</p>
            <p>My training gave me intensive hands-on exposure to <strong>Linux Administration, Networking, Security (IDS/IPS, System Hardening)</strong> and modern DevOps tooling including Docker, Kubernetes, Jenkins, and Terraform.</p>
            <p>I'm actively seeking my first role as a <strong>DevOps / Cloud / Linux Administrator</strong> where I can contribute, learn fast, and grow.</p>
          </div>
          <div className="info-table">
            {[
              ["Location", CONFIG.location],
              ["Education", "B.E. IT + CDAC DITISS"],
              ["Phone", CONFIG.phone],
              ["Email", CONFIG.email],
              ["GitHub", `@${CONFIG.github}`],
              ["Status", "Open to Work ●"],
            ].map(([k, v]) => (
              <div key={k} className="info-row">
                <span className="info-key">{k}</span>
                <span className={`info-val ${k === 'Status' ? 'status-green' : ''}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" label="02 // skills" title="Tech" accent="Stack">
        <div className="skills-grid" ref={skillsRef}>
          {SKILLS.map(s => <SkillCard key={s.category} {...s} visible={skillsVisible} />)}
        </div>
      </Section>

      {/* GITHUB GRAPH */}
      <section className="section section-visible">
        <GitHubGraph username={CONFIG.github} />
      </section>

      {/* PROJECTS */}
      <Section id="projects" label="03 // projects" title="What I've" accent="Built">
        <div className="projects-grid">
          {PROJECTS.map(p => <ProjectCard key={p.title} {...p} />)}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" label="04 // background" title="Education &amp;" accent="Training">
        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="timeline-item">
              <div className="tl-dot" />
              <div className="tl-date">{e.period}</div>
              <div className="tl-title">{e.title}</div>
              <div className="tl-org">{e.org}</div>
              <ul className="tl-points">
                {e.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* BLOGS */}
      <Section id="blogs" label="05 // writing" title="My" accent="Blogs">
        <BlogSection username={CONFIG.devtoUsername} />
      </Section>

      {/* CONTACT */}
      <Section id="contact" label="06 // contact" title="Let's" accent="Talk">
        <p className="contact-sub">I'm actively looking for DevOps, Cloud, or Linux Admin roles. Let's connect!</p>
        <div className="contact-links">
          <a href={`mailto:${CONFIG.email}`} className="contact-link primary">📧 {CONFIG.email}</a>
          <a href={`https://linkedin.com/in/${CONFIG.linkedin}`} target="_blank" rel="noreferrer" className="contact-link">💼 LinkedIn</a>
          <a href={`https://github.com/${CONFIG.github}`} target="_blank" rel="noreferrer" className="contact-link">🐙 GitHub</a>
          <a href={`https://dev.to/${CONFIG.devtoUsername}`} target="_blank" rel="noreferrer" className="contact-link">📝 Dev.to</a>
          <a href={CONFIG.resumeUrl} download className="contact-link">📄 Resume</a>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="footer">
        <span>© 2025 Gaurav Nayak</span>
        <span>DevOps · Cloud · Security · Linux</span>
        <span>Pune, India 🇮🇳</span>
      </footer>
    </div>
  );
}
