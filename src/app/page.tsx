export default function Page() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-950 to-indigo-950 text-white overflow-hidden px-6">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

      <div className="max-w-2xl text-center space-y-8 z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <span>✨ Ready to Build</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            Your Creative Canvas
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-lg mx-auto leading-relaxed">
            The workspace has been successfully cleared. Start editing files to bring your unique developer portfolio to life.
          </p>
        </div>

        {/* Quick Start Card */}
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-left space-y-4">
          <h2 className="text-lg font-semibold text-slate-200">Quick Start Guide</h2>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs">1</span>
              <span>Open and edit <code className="text-indigo-300 font-mono">src/app/page.tsx</code> to modify this landing page.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs">2</span>
              <span>Add global styles or configure Tailwind theme inside <code className="text-indigo-300 font-mono">tailwind.config.js</code>.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs">3</span>
              <span>Create new reusable components in a <code className="text-indigo-300 font-mono">src/components/</code> directory.</span>
            </li>
          </ul>
        </div>

        <div className="pt-4 text-xs text-slate-500">
          Tailwind CSS & Next.js are pre-configured and active.
        </div>
      </div>
    </main>
  );
}
