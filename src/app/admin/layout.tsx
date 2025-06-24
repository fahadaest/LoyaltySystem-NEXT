'use client';
// Layout components
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import routes from 'routes';
import {
  getActiveNavbar,
  getActiveRoute,
  isWindowAvailable,
} from 'utils/navigation';
import React from 'react';
import { Portal } from '@chakra-ui/portal';
import Navbar from 'components/navbar';
import Sidebar from 'components/sidebar';

export default function Admin({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  if (isWindowAvailable()) document.documentElement.dir = 'ltr';

  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    const superAdminSession = localStorage.getItem('superadmin_session');

    if (superAdminSession) {
      router.replace('/superadmin/manage-admin/list');
    } else if (!session) {
      router.replace('/auth/sign-in/');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-100 dark:bg-background-900">
        <p className="text-lg font-medium">Loading & Verifying Session...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
      <Sidebar
        routes={routes.routes}
        open={open}
        setOpen={setOpen}
        variant="admin"
      />
      <div className="h-full w-full font-dm dark:bg-navy-900">
        <main
          className={`mx-2.5  flex-none transition-all dark:bg-navy-900 
              md:pr-2 xl:ml-[323px]`}
        >
          <div>
            <Navbar
              onOpenSidenav={() => setOpen(!open)}
              brandText={getActiveRoute(routes.routes, pathname)}
              secondary={getActiveNavbar(routes.routes, pathname)}
            />
            <div className="mx-auto min-h-screen p-2 !pt-[10px] md:p-2">
              {children}
            </div>
            {/* <div className="p-3">
              <Footer />
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}
