import { DATA } from "@/app/data";
import {
  Navbar,
  Header,
  Experience,
  ContributionGraph,
  Skills,
  Projects,
  Contact,
} from "@/components/sections";
import { InfiniteGridBg } from "@/components/infinite-grid-bg";

export default function Page() {
  return (
    <InfiniteGridBg>
      <Navbar />

      {/* Hero section spans full viewport width */}
      <Header data={DATA.HEADER} />

      <main className="mx-auto max-w-5xl px-6 flex flex-col items-center gap-16 md:gap-24 w-full pt-20">
        <Experience data={DATA.EXPERIENCE} />
        <ContributionGraph />
        <Skills data={DATA.SKILLS} />
        <Projects data={DATA.PROJECTS} />
        <Contact data={DATA.HEADER} />
      </main>

      <footer className="w-full border-t border-slate-200/40 dark:border-slate-800/40 py-8 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Nilesh Sharma. All rights reserved.</p>
      </footer>
    </InfiniteGridBg>
  );
}
