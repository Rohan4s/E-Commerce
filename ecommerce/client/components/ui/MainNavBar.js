import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
const MainNavBar = () => {
  const [session, loading] = useSession();
  console.log(session);
  function logOut() {
    signOut();
  }
  return (
    <nav >
      <ul className="flex justify-around">
        {!session && (
          <li className="px-2 py-2 m-4  bg-sky-950 text-yellow-50  rounded-md hover:font-bold hover:text-white">
            <Link href={"/auth/login"}>Login</Link>
          </li>
        )}
        {!session && (
          <li className="px-4 py-2 m-4  bg-sky-950 text-yellow-50  rounded-md hover:font-bold hover:text-white">
            <Link href={"/auth/signup"}>SignUp</Link>
          </li>
        )}
        {session &&  (
          <li className="px-4 py-2 m-4  bg-sky-950 text-yellow-50  rounded-md hover:font-bold hover:text-white">
            <Link href={"/bank"}>Bank </Link>
          </li>
        )}
        {session &&(
          <li className="px-4 py-2 m-4  bg-sky-950 text-yellow-50  rounded-md hover:font-bold hover:text-white">
            <Link href={"/orders"}>Orders</Link>
          </li>
        )}
        {session && session.user.email!='supplier.com' &&session.user.email!='ecommerce@gmail.com' &&(
          <li className="px-4 py-2 m-4  bg-sky-950 text-yellow-50  rounded-md hover:font-bold hover:text-white">
            <Link href={"/products"}>Shop Here</Link>
          </li>
        )}
        {session && session.user.email!='supplier.com' && session.user.email!='ecommerce@gmail.com'&&(
          <li className="px-4 py-2 m-4  bg-sky-950 text-yellow-50  rounded-md hover:font-bold hover:text-white">
            <Link href={"/cart"}>View Cart</Link>
          </li>
        )}
        {session && (
          <li className="px-4 py-2 m-4  bg-sky-950 text-yellow-50  rounded-md hover:font-bold hover:text-white">
            <button onClick={logOut}>Log Out</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavBar;
