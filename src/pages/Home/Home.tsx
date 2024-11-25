import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <header>
        <nav className="flex fixed  w-full justify-between py-5 px-8 2xl:px-16 2xl:py-8 m-auto z-10">
          <h1 className="text-2xl font-bold text-white">HLVS</h1>
          <Link to="/login" className="hover:text-black transition-all ease-in text-white">
            LOG IN
          </Link>
        </nav>
        <div className="flex flex-col px-8 h-[100vh] justify-center 2xl:px-36 2xl:m-auto bg-gradient-to-tr from-zinc-700 to-zinc-900 ">
          <h1 className="text-4xl text-center mb-8 font-bold md:text-left 2xl:text-7xl text-white ">
            Residential <br /> Security System
          </h1>
          <h2 className="font-light text-center mb-10 md:text-start 2xl:text-xl text-white">
            Take control of your residential security with our innovative access
            control system.
          </h2>
          <div className="self-center md:self-start">
            <Link
              to="/login"
              className="py-3 px-5 border-white border-[1px] text-white rounded-full font-semibold uppercase hover:shadow-lg transition-all ease-in-out 2xl:px-8"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
