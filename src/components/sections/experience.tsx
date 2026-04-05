"use client";

import { Calendar, MapPin } from "lucide-react";
import type { IExperienceData } from "@/app/data";

export function Experience({ data }: { data: IExperienceData[] }) {
  return (
    <section id="experience" className="w-full py-12">
      <h2 className="font-bold text-gray-900 text-2xl mb-8 dark:text-gray-100">
        Experience
      </h2>
      
      <div className="space-y-8">
        {data.map((exp, index) => (
          <div key={index} className="border-l-2 border-gray-200 pl-6 relative dark:border-gray-700">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-900 rounded-full dark:bg-gray-100"></div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 text-lg dark:text-gray-100">
                {exp.ROLE}
              </h3>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{exp.COMPANY}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{exp.DURATION}</span>
                </div>
              </div>
              
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                {exp.DESCRIPTION.map((desc, descIndex) => (
                  <li key={descIndex} className="flex items-start gap-2">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
              
              {exp.SKILLS && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {exp.SKILLS.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm dark:bg-gray-800 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
