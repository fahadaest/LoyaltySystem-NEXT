import React, { useState, useCallback, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from 'components/link/NavLink';
import DashIcon from 'components/icons/DashIcon';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const SidebarLinks = ({ routes }: { routes: RoutesType[] }): JSX.Element => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [submenuHeights, setSubmenuHeights] = useState<Record<string, number>>({});

  const activeRoute = useCallback(
    (routePath: string) => {
      const fullPath = pathname || '';
      return fullPath === routePath || fullPath.startsWith(`${routePath}/`);
    },
    [pathname]
  );

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => {
      const isCurrentlyOpen = !!prev[name];
      return {
        ...Object.keys(prev).reduce((acc, key) => {
          acc[key] = false;
          return acc;
        }, {} as Record<string, boolean>),
        [name]: !isCurrentlyOpen,
      };
    });
  };

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      const submenuRef = useRef<HTMLDivElement>(null);
      const isSubmenu = route.submenu && route.submenu.length > 0;
      const isActiveSub = isSubmenu && route.submenu?.some((r) => activeRoute(`${r.layout}/${r.path}`));
      const isOpen = openMenus[route.name] !== undefined ? openMenus[route.name] : isActiveSub;
      const isActive = isOpen;

      useEffect(() => {
        if (isOpen && submenuRef.current) {
          setSubmenuHeights((prev) => ({
            ...prev,
            [route.name]: submenuRef.current?.scrollHeight || 0,
          }));
        } else {
          setSubmenuHeights((prev) => ({
            ...prev,
            [route.name]: 0,
          }));
        }
      }, [isOpen, route.name]);

      const lineHeight = submenuHeights[route.name] || 0;

      return (
        <div key={index} className="mb-2 relative">
          {isSubmenu ? (
            <>
              <div
                onClick={() => toggleMenu(route.name)}
                className={`relative flex items-center px-6 py-3 cursor-pointer rounded-lg transition-all duration-200 
                ${isActive ? 'bg-white/10 text-white font-semibold' : 'hover:bg-white/10 text-white'}`}
              >
                <span className="text-lg w-5 h-5 flex items-center justify-center">
                  {route.icon || <DashIcon />}
                </span>
                <p className="ml-4 font-medium">{route.name}</p>
                <span className="ml-auto">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>

                {isOpen && lineHeight > 0 && (
                  <span
                    className="absolute left-8 top-full w-px bg-white/30 z-0"
                    style={{ height: lineHeight + 'px' }}
                  />
                )}
              </div>

              <div
                ref={submenuRef}
                className={`ml-6 mt-2 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                {route.submenu.map((sub, subIndex) => (
                  <NavLink key={subIndex} href={`${sub.layout}/${sub.path}`}>
                    <li
                      className={`my-2 flex items-center px-4 py-2 rounded-md cursor-pointer transition-colors
                      ${activeRoute(`${sub.layout}/${sub.path}`)
                          ? ' text-white font-semibold'
                          : 'hover:bg-white/10 text-white'
                        }`}
                    >
                      <p className="ml-3">{sub.name}</p>
                    </li>
                  </NavLink>
                ))}
              </div>
            </>
          ) : (
            <NavLink href={route.layout + '/' + route.path}>
              <div className="relative mb-1">
                <li
                  className={`flex items-center px-6 py-3 rounded-lg cursor-pointer transition-colors 
                  ${activeRoute(`${route.layout}/${route.path}`)
                      ? 'bg-white/10 text-white font-semibold'
                      : 'hover:bg-white/10 text-white'
                    }`}
                >
                  {route.icon || <DashIcon />}
                  <p className="ml-4">{route.name}</p>
                </li>
              </div>
            </NavLink>
          )}
        </div>
      );
    });
  };

  return <div className="space-y-1 px-4">{createLinks(routes)}</div>;
};

export default SidebarLinks;