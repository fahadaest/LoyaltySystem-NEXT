import { HiX } from 'react-icons/hi';
import Links from './components/Links';
import { IRoute } from 'types/navigation';

function Sidebar(props: { routes: IRoute[];[x: string]: any }) {
  const { routes, open, setOpen } = props;
  return (
    <div className={`w-[280px] sm:none duration-175 linear fixed !z-50 flex h-screen flex-col bg-brandGreen shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'}`} >
      <span className="absolute right-4 top-4 block cursor-pointer xl:hidden" onClick={() => setOpen(false)} >
        <HiX />
      </span>

      <div className="flex-shrink-0">
        <div className="mx-[50px] mt-[30px] flex items-center">
          <img src="/img/logo/logo.png"
            alt="Reward Hive Logo"
            className="h-9 w-auto object-contain" />
        </div>

        <div className="mb-0 mt-[38px] h-px bg-gray-300 dark:bg-white/30" />
      </div>

      <div className="flex-1 min-h-0">
        <ul className="h-full overflow-y-auto overflow-x-hidden pt-1 pb-10">
          <Links routes={routes} />
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;