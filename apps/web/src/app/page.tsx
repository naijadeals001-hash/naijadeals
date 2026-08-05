import { platformRoles } from '@naijadeals/types';

const foundationModules = [
  'Frontend shell',
  'Backend shell',
  'Shared contracts',
  'Integration gateway skeleton',
  'Health checks',
  'Configuration system'
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/20">
          <p className="mb-3 inline-flex rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Milestone 1.0
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white">NaijaDeals Platform Foundation</h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            Shared enterprise skeleton only. No identity flows. No wallet. No commerce. No magic tricks dressed up as scope control.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">Foundation coverage</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {foundationModules.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-white">Governed role surface</h2>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-300">
              {platformRoles.map((role) => (
                <span key={role} className="rounded-full border border-slate-700 px-3 py-1">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
