// import '../../public/stylehome.css';
// import home from '../../public/stylehome';
//import '../../styles/globals.css';
import Link from "next/link";
const WelcomePage = () => {
  return (
    <>
      <div className="back">
        <h1 className="text-center text-3xl text-white mb-5 pt-20">Description</h1>
        <button className="mx-auto  mt-0 block bg-stone-400 text-base-content-800 font-extrabold  shadow-xl text-xl shadow-success-content rounded-xl hover:text-sky-900 hover:font-bold hover:shadow-2xl hover:shadow-cyan-800">
          <Link href={"/products"} className="inline-block p-5">
            Browse, Click, Delight &#8594;
          </Link>
        </button>
      </div>
      {/* <div className="back"></div> */}
      {/* <Info />
      <Footer /> */}
    </>
  );
};

export default WelcomePage;
