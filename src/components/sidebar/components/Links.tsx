import React, { useState, useCallback, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from 'components/link/NavLink';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const SidebarLinks = ({ routes, }: { routes: RoutesType[]; }): JSX.Element => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [submenuHeights, setSubmenuHeights] = useState<Record<string, number>>({},);

  console.log("routes", routes)

  const activeRoute = useCallback(
    (routePath: string) => {
      const fullPath = pathname || '';
      return fullPath === routePath || fullPath.startsWith(`${routePath}/`);
    },
    [pathname],
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
      const isActiveSub = isSubmenu && route.submenu?.some((r: { layout: any; path: any }) => activeRoute(`${r.layout}/${r.path}`),);
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
        <div key={index} className="relative">
          {route.heading && (
            <div className=" px-4 py-3 mt-3">
              <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                {route.heading}
              </h3>
            </div>
          )}

          {isSubmenu ? (
            <>
              <div onClick={() => toggleMenu(route.name)} className={` relative flex cursor-pointer items-center rounded-lg px-6 py-3 transition-all duration-200 
              ${isActive ? 'bg-white/10 font-semibold text-white' : 'text-white hover:bg-white/10'}`}
              >
                <span className="flex h-5 w-5 items-center justify-center text-lg">
                  {route.icon}
                </span>
                <p className="ml-4 font-medium">{route.name}</p>
                <span className="ml-auto">
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>

                {isOpen &&
                  lineHeight > 0 &&
                  route.submenu &&
                  route.submenu.length > 0 && (
                    <span
                      className="absolute left-8 top-full z-0 w-0.5 bg-white/30"
                      style={{ height: lineHeight - (route.submenu.length > 0 ? 24 : 0) + 'px', }}
                    />
                  )}
              </div>

              <div ref={submenuRef} className={`ml-6 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}  >
                {route.submenu.map((sub, subIndex) => (
                  <div key={subIndex} className="relative">
                    {isOpen && (
                      <div className="pointer-events-none absolute left-2 top-1/2 z-0 h-4 w-6">
                        <svg
                          width="24"
                          height="16"
                          viewBox="0 0 24 16"
                          className="absolute -translate-y-1/2"
                        >
                          <path
                            d="M 0 0 Q 0 8 12 8"
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth="2"
                            fill="none"
                          />
                          <circle
                            cx="12"
                            cy="8"
                            r="2.5"
                            fill="rgba(255, 255, 255, 0.3)"
                          />
                        </svg>
                      </div>
                    )}

                    <NavLink href={`${sub.layout}/${sub.path}`}>
                      <li className={`relative z-10 my-2 ml-4 flex cursor-pointer items-center rounded-md py-2 transition-colors  
                      ${activeRoute(`${sub.layout}/${sub.path}`)
                          ? 'bg-white/10 px-4 font-semibold text-white'
                          : 'px-4 text-white hover:bg-white/10'
                        }`}
                      >
                        <p className="ml-3">{sub.name}</p>
                      </li>
                    </NavLink>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <NavLink href={route.layout + '/' + route.path}>
              <div className="relative mb-1">
                <li
                  className={`flex cursor-pointer items-center rounded-lg px-6 py-3 transition-colors 
                ${activeRoute(`${route.layout}/${route.path}`)
                      ? 'bg-white/10 font-semibold text-white'
                      : 'text-white hover:bg-white/10'
                    }`}
                >
                  <span className="flex h-5 w-5 items-center justify-center text-lg">
                    {route.icon}
                  </span>
                  <p className="ml-4">{route.name}</p>
                </li>
              </div>
            </NavLink>
          )}

          {route.showDivider !== false && <hr className="border-t-2 border-white/20 my-2" />}
        </div>
      );
    });
  };

  return (
    <div className="space-y-1 px-4 pb-6">
      {createLinks(routes)}
    </div>
  );
};

export default SidebarLinks;