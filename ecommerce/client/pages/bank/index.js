import { getSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PaymentDetail = ({ isLoading, data, cartDetail }) => {
  const [accountID, setAccountID] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  let gid, gpass;
  let fid,
    fpass,
    fmoney,
    fname,
    femail,
    stat = true;

  const toggleLoggedIn = () => {
    setLoggedIn((prevValue) => !prevValue);
  };

  const toggle = React.useCallback(() => setLoggedIn(!loggedIn));

  const router = new useRouter();
  const [sessionEmail, setSessionEmail] = useState("");

  const [money, setMoney] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth/login");
        console.log("no session");
      } else {
        console.log(session);
        setSessionEmail(session.user.email);
      }
    });
  }, []);

  getSession();

  console.log(loggedIn);

  console.log(money);
  console.log(name);
  console.log(email);

  function getAccountInfo(e) {
    e.preventDefault();
    gid = accountID;
    gpass = password;
    console.log(accountID);
    console.log(password);

    getBank(gid);

    function getBank(accountID) {
      fetch("http://localhost:4000/get-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: accountID,
        }),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((ans) => {
          console.log(ans);

          fpass = ans.user.password;
          fid = ans.user._id;
          fmoney = ans.user.money;
          fname = ans.user.name;
          femail = ans.user.email;
          setMoney(fmoney);
          setName(fname);
          setEmail(femail);

          console.log(`fetching ${fid}`);
          console.log(fpass);
          console.log(fid);

          if (fpass == gpass) {
            toggleLoggedIn();
          }
        })
        .catch((e) => {
          alert("No such account");
          stat = false;
          console.log("no account");
          console.log(e);
        });
    }
  }
  return (
    <section>
      <Head>
        <title>Account Info</title>
      </Head>

          {!loggedIn && (
            <form className="w-full ml-96 max-w-sm mt-40" onSubmit={getAccountInfo}>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    Account ID
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-full-name"
                    type="text"
                    value={accountID}
                    placeholder="Enter your ID"
                    onChange={(event) => {
                      setAccountID(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-password"
                  >
                    Password
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    id="inline-password"
                    type="password"
                    value={password}
                    placeholder="Your password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="shadow bg-stone-800 hover:bg-sky-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          )}
          {loggedIn && (
            <div className="bg-sky-950  w-1/3 p-8 m-auto mt-40 rounded-md shadow-md shadow-stone-400 text-white text-xl">
              <div>Name: {name}</div>
              <div>Email: {email}</div>
              <div>Balance: {money}</div>
            </div>
          )}
    </section>
  );

  // return (
  //   <section >
  //     <Head>
  //       <title>Account Info</title>
  //     </Head>

  //       <section className="w-2/3 m-auto mt-12 pb-8">
  //         {!loggedIn && (
  //           <div className="mx-auto">
  //           <form onSubmit={getAccountInfo}>
  //               <input
  //                 type="text"
  //                 value={accountID}
  //                 onChange={(event) => {
  //                   setAccountID(event.target.value);
  //                 }}
  //                 className="border-2 border-slate-600 rounded mb-14 "
  //                 placeholder="Your Account ID"
  //               />
  //             <div>
  //               <input
  //                 type="password"
  //                 value={password}
  //                 className="border-2 border-slate-600 rounded mb-14"
  //                 placeholder="Your password"
  //                 onChange={(event) => {
  //                   setPassword(event.target.value);
  //                 }}
  //               />
  //             </div>
  //             <button className="btn2">Login</button>
  //           </form>
  //           </div>
  //         )}
          // {loggedIn && (
          //   <div className="bg-sky-950  w-1/2 p-8 m-auto mt-20 rounded-md shadow-md shadow-stone-400 text-white text-xl">
          //     <div>Name: {name}</div>
          //     <div>Email: {email}</div>
          //     <div>Balance: {money}</div>
          //   </div>
          // )}
  //       </section>
  //   </section>
  // );
};

export default PaymentDetail;
