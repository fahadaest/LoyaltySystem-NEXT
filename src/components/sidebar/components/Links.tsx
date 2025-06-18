import React, { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from 'components/link/NavLink';
import DashIcon from 'components/icons/DashIcon';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const SidebarLinks = ({ routes }: { routes: RoutesType[] }): JSX.Element => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const activeRoute = useCallback(
    (routeName: string) => pathname?.includes(routeName),
    [pathname]
  );

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      const isSubmenu = route.submenu && route.submenu.length > 0;
      const isActiveSub = isSubmenu && route.submenu?.some((r) => activeRoute(r.path));
      const isActive = activeRoute(route.path) || isActiveSub;
      const isOpen = openMenus[route.name] || isActiveSub;

      return (
        <div key={index} className="mb-2">
          {isSubmenu ? (
            <>
              <div onClick={() => toggleMenu(route.name)} className="flex cursor-pointer items-center px-8">
                <span className={`${isActive ? 'font-bold text-white' : 'font-medium text-white'}`}>
                  {route.icon || <DashIcon />}
                </span>
                <p className={`ml-4 ${isActive ? 'font-bold text-white' : 'font-medium text-white'}`}>
                  {route.name}
                </p>
                <span className="ml-auto text-white">
                  {isOpen ? <ChevronUp size={20} /> : < ChevronDown size={20} />}
                </span>
              </div>

              <div className={`ml-10 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                {route.submenu.map((sub, subIndex) => (
                  <NavLink key={subIndex} href={`${sub.layout}/${sub.path}`}>
                    <li className={`my-[6px] flex cursor-pointer items-center px-4 ${activeRoute(sub.path) ? 'font-bold text-white' : 'font-medium text-white'}`}>
                      {sub.icon || <DashIcon />}
                      <p className="ml-3">{sub.name}</p>
                    </li>
                  </NavLink>
                ))}
              </div>
            </>
          ) : (
            <NavLink href={route.layout + '/' + route.path}>
              <div className="relative mb-1 flex hover:cursor-pointer">
                <li className={`my-[3px] flex cursor-pointer items-center px-8 ${isActive ? 'font-bold text-white' : 'font-medium text-white'}`}>
                  {route.icon || <DashIcon />}
                  <p className="leading-1 ml-4">{route.name}</p>
                </li>
                {isActive && (
                  <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-white dark:bg-brand-400" />
                )}
              </div>
            </NavLink>
          )}
        </div>
      );

    });
  };

  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
