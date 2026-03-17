import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const GITHUB_USERNAME = 'Vishal-Sharma-6033';

const fallbackProfile = {
  followers: 0,
  following: 0,
  publicRepos: 0,
};

function StatCard({ label, value, accent }) {
  return (
    <div
      className="glass rounded-xl p-5 border border-white/10"
      style={{ boxShadow: `inset 0 0 0 1px ${accent}20` }}
    >
      <p className="text-white/40 text-xs uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className="text-3xl font-black" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

export default function GitHub() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' });

  const [profile, setProfile] = useState(fallbackProfile);
  const [repos, setRepos] = useState([]);
  const [mostUsedLanguage, setMostUsedLanguage] = useState('N/A');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadGitHubData = async () => {
      try {
        const [profileRes, reposRes, languageReposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=4`
          ),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
          ),
        ]);

        if (!mounted) return;

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile({
            followers: profileData.followers ?? 0,
            following: profileData.following ?? 0,
            publicRepos: profileData.public_repos ?? 0,
          });
        }

        if (reposRes.ok) {
          const repoData = await reposRes.json();
          setRepos(Array.isArray(repoData) ? repoData : []);
        }

        if (languageReposRes.ok) {
          const languageRepoData = await languageReposRes.json();
          const languageCount = (Array.isArray(languageRepoData) ? languageRepoData : []).reduce(
            (acc, repo) => {
              const language = repo?.language;
              if (language) {
                acc[language] = (acc[language] || 0) + 1;
              }
              return acc;
            },
            {}
          );

          const topLanguage = Object.entries(languageCount).sort((a, b) => b[1] - a[1])[0]?.[0];
          setMostUsedLanguage(topLanguage || 'N/A');
        }
      } catch {
        // Keep fallback values if GitHub API is unavailable.
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadGitHubData();

    return () => {
      mounted = false;
    };
  }, []);

  const stats = useMemo(
    () => [
      { label: 'Public Repos', value: profile.publicRepos, accent: '#3b82f6' },
      { label: 'Followers', value: profile.followers, accent: '#22c55e' },
      { label: 'Following', value: profile.following, accent: '#f97316' },
      { label: 'Most Used', value: mostUsedLanguage, accent: '#a855f7' },
    ],
    [profile, mostUsedLanguage]
  );

  return (
    <section id="github" className="relative py-28 px-6 overflow-hidden">
      <div className="absolute left-0 top-1/3 w-[420px] h-[320px] bg-emerald-600/8 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 text-center"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-violet-400 mb-4 font-medium">Code</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            GitHub <span className="text-gradient">Details</span>
          </h2>
          <p className="text-white/45 mt-5 max-w-2xl mx-auto">
            Snapshot of my GitHub profile with latest repositories and activity highlights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <StatCard label={s.label} value={loading ? '...' : s.value} accent={s.accent} />
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6 md:p-8 border border-white/10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-white">Latest Repositories</h3>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-violet-400/50 transition-all duration-300"
            >
              Visit Profile
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {repos.length === 0 && !loading && (
              <p className="text-white/50 text-sm">No repositories available right now.</p>
            )}

            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="rounded-xl border border-white/10 p-4 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-1/2 mb-3" />
                  <div className="h-3 bg-white/10 rounded w-4/5" />
                </div>
              ))}

            {!loading &&
              repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-white/10 p-4 hover:border-violet-500/40 transition-colors duration-300"
                >
                  <p className="text-white font-semibold mb-1">{repo.name}</p>
                  <p className="text-white/45 text-sm mb-3 line-clamp-2">
                    {repo.description || 'No description available.'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/50">
                    <span>Language: {repo.language || 'N/A'}</span>
                    <span>Stars: {repo.stargazers_count}</span>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}