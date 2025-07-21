import React from 'react';
import Dropdown from 'components/dropdown';
import { FiAlignJustify, FiSearch, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import NavLink from 'components/link/NavLink';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { Typewriter } from 'react-simple-typewriter';
import { useRouter } from 'next/navigation';
import { useGetMyProfileQuery } from 'store/apiEndPoints/userApi';
import { useAuth } from 'hooks/useAuth';
import { getImageUrl } from 'utils/imageUtils';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Navbar = ({ onOpenSidenav, brandText }) => {
  const [darkmode, setDarkmode] = React.useState(
    document.body.classList.contains('dark')
  );
  const router = useRouter();
  const { data } = useGetMyProfileQuery();
  const { logout, isSuperAdmin } = useAuth();

  const profileUrl = isSuperAdmin ? '/superadmin/profile' : '/admin/profile';
  const avatar = getImageUrl(data?.profileImage);
  const userName = data?.firstName + ' ' + data?.lastName;

  const toggleDarkMode = () => {
    if (darkmode) {
      document.body.classList.remove('dark');
      setDarkmode(false);
    } else {
      document.body.classList.add('dark');
      setDarkmode(true);
    }
  };

  return (
    <nav className=" mx-2 sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]">
      {/* Left Section - Welcome Message */}
      <div className="ml-[6px]">
        <div className="hidden sm:inline">
          <p className="flex shrink items-center gap-2 text-[20px] xs:text-[20px] sm:text-[30px] capitalize text-navy-700 dark:text-white">
            <NavLink href="#" className="font-bold capitalize hover:text-navy-700 dark:hover:text-white">
              Welcome{' '}
              <Typewriter
                words={[userName || 'User!']}
                loop={false}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={20}
                delaySpeed={3000}
              />
            </NavLink>
            <span className="animate-wave text-2xl">👋</span>
          </p>
          <div className="text-sm text-navy-700 dark:text-white">
            Pages / <span className="capitalize">{brandText}</span>
          </div>
        </div>
      </div>

      {/* Right Section - Controls */}
      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">

        {/* Search Bar */}
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <FiSearch className="ml-3 h-4 w-4 text-gray-400 dark:text-white" />
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full rounded-full bg-lightPrimary px-2 text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>

        {/* Notifications */}
        <Dropdown
          button={
            <div className="relative cursor-pointer p-2">
              <IoMdNotificationsOutline className="h-5 w-5 text-gray-600 dark:text-white" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            </div>
          }
          classNames="py-2 top-4 -left-[280px] md:-left-[320px] w-max"
        >
          <div className="flex w-[320px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl dark:!bg-navy-700 dark:text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white">Notifications</h3>
              <button className="text-sm text-blue-500 hover:text-blue-600">Mark all read</button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-600 cursor-pointer">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">!</div>
                <div className="flex-1">
                  <p className="font-medium text-sm">System Update Available</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-800 cursor-pointer">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Profile Updated Successfully</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </Dropdown>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors"
          title={darkmode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </button>

        {/* User Dropdown */}
        <Dropdown
          button={
            <div className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-200 dark:hover:bg-navy-600 transition-colors">
              <img
                className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 dark:border-navy-600"
                src={avatar}
                alt={userName}
              />
            </div>
          }
          classNames="py-2 top-10 -left-[160px] w-max"
        >
          <div className="flex w-48 flex-col rounded-[20px] bg-white shadow-xl dark:!bg-navy-700 dark:text-white">
            {/* User Info Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={avatar}
                  alt={userName}
                />
                <div>
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {isSuperAdmin ? 'Super Admin' : 'Admin'}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <a
                href={profileUrl}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-navy-600 rounded-lg transition-colors"
              >
                <FiUser className="h-4 w-4" />
                Profile Settings
              </a>

              <a
                href="/settings"
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-navy-600 rounded-lg transition-colors"
              >
                <FiSettings className="h-4 w-4" />
                Account Settings
              </a>

              <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>

              <button
                onClick={logout}
                className="flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors w-full text-left"
              >
                <FiLogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;