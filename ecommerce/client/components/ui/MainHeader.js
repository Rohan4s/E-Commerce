import Link from "next/link";
import MainNavBar from "./MainNavBar";
const MainHeader = () => {
  return (
    <header className="flex justify-between items-center p-5 px-20 bg-sky-950 ">
      <Link
        href={"/"}
        className="shadow p-4 rounded-xl shadow-fuchsia-300 hover:shadow-slate-500"
      >
        <div>
          <span className="text-yellow-50 hover:text-blue-700">
          Ecommerce
          </span>
        </div>
      </Link>
      <MainNavBar />
    </header>
  );
};

export default MainHeader;
