'use client';

import { Suspense, lazy } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center bg-transparent text-slate-500 ${className}`}>
          <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
          </svg>
        </div>
      }
    >
      <div className="w-full h-full pointer-events-auto overflow-hidden relative">
        {/* 
          We expand the Spline container 80px downwards and to the right beyond its parent. 
          Because the watermark is pinned to the bottom-right corner of this internal container,
          it gets pushed completely outside the visible overflow-hidden bounds of the parent.
          The 3D model remains centered and fully visible.
        */}
        <div className="absolute top-0 left-0 right-[-80px] bottom-[-80px]">
          <Spline
            scene={scene}
            className={className}
          />
        </div>
      </div>
    </Suspense>
  );
}
