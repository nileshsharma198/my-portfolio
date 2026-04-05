"use client";

export function Skills({ data }: { data: Record<string, string[]> }) {
  return (
    <section id="skills" className="w-full py-12">
      <h2 className="font-bold text-gray-900 text-2xl mb-8 dark:text-gray-100">
        Skills
      </h2>
      
      <div className="space-y-8">
        {Object.entries(data).map(([category, skills]) => (
          <div key={category}>
            <h3 className="font-semibold text-gray-900 text-lg mb-4 dark:text-gray-100">
              {category}
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium dark:bg-gray-800 dark:text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
