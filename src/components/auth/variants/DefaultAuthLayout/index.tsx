import authImg from '/public/img/auth/auth.png';
import logo from '/public/img/logo/logo.png';
import NavLink from 'components/link/NavLink';
import { Typewriter } from 'react-simple-typewriter';

function Default(props: { maincard: JSX.Element }) {
  const { maincard } = props;
  return (
    <div className="relative flex">
      <div className="w-screen h-screens">
        <div className="mb-auto flex flex-col pl-5 pr-5 md:pl-12 md:pr-0 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
          {maincard}
          <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[50vw] 2xl:w-[50vw]">
            <div className={`absolute flex h-full w-full items-end justify-center bg-brandGreen bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]`}  >
              <div className="relative flex h-full w-full flex-col items-start justify-center pb-20 px-5 md:px-12 xl:px-[70px]">
                <img src={logo.src} alt="Logo" className="max-w-[40%] max-h-[40%]" />
                <div className="mt-8 text-left text-white text-5xl leading-tight">
                  <span className="font-thin">Welcome to</span><br />
                  <span className="font-bold">
                    <Typewriter
                      words={['LOYALTY SYSTEM!']}
                      loop={false}
                      cursor
                      cursorStyle="|"
                      typeSpeed={70}
                      deleteSpeed={20}
                      delaySpeed={1000}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Default;
