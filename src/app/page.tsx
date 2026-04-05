import { DATA } from "@/app/data";
import {
  Contact,
  Experience,
  Header,
  Navbar,
  Projects,
  Skills,
} from "@/components/sections";

export default function Page() {
  return (
    <>
      <Navbar />

      <main className="flex flex-col items-center gap-12 p-8 w-full">
        <Header data={DATA.HEADER} />
        <Experience data={DATA.EXPERIENCE} />
        <Skills data={DATA.SKILLS} />
        <Projects data={DATA.PROJECTS} />
        <Contact data={DATA.HEADER} />
      </main>
    </>
  );
}
