'use client';
import { PropsWithChildren } from 'react';
interface AuthProps extends PropsWithChildren { }

export default function AuthLayout({ children }: AuthProps) {
  return (
    <div>
      <div className="relative h-screen w-screen dark:!bg-navy-900 ">
        <main className={`h-screen `}>
          {children}
        </main>
      </div>
    </div>
  );
}
