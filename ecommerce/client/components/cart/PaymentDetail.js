import CartContext from "@/contexts/cart-context";
import { findProductQuantity } from "@/utils/product-cart";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert2";

const PaymentDetail = ({ isLoading, data, cartDetail }) => {

  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [secret, setSecret] = useState("");
  let gaddress, gmobile, gsecret;

  const [accountID, setAccountID] = useState("");
  const [password, setPassword] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  let gid, gpass;
  let fid,
    fpass,
    stat = true;

  const toggleOrderPlaced = () => {
    setOrderPlaced((prevValue) => !prevValue);
  };
  const toggle = React.useCallback(() => setOrderPlaced(!orderPlaced));
  const router = new useRouter();
  const [sessionEmail, setSessionEmail] = useState("");

  function calTotalPrice() {
    let total = 0;
    data.map((e) => {
      total = total + +e.price * +findProductQuantity(e._id, cartDetail);
    });
    return total;
  }
  const cardContext = useContext(CartContext);
  console.log(cardContext);
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





  return (
    <section className="flex flex-col items-center h-96 bg-indigo-400 ">
      <Head>
        <title>Your Cart</title>
      </Head>
      {/* <div className="flex justify-between pr-8 items-center">
        <span className="p-3 mx-16 mt-16 mb-8 rounded-md font-semibold text-orange-600 text-4xl ">
          total:
        </span>
        <span className="p-3 mt-16 ml-8 mb-8 rounded-md font-semibold text-4xl text-white bg-orange-400">
          {!isLoading && data && calTotalPrice()} $
        </span>
      </div> */}

      <section id="ongoing-paayment">
        <section className="w-2/3 m-auto mt-12 pb-8">
          {!orderPlaced && (
             <form className="w-full max-w-sm mt-20" onSubmit={placeOrder}>
             <div className="md:flex md:items-center mb-6">
               <div className="md:w-1/3">
                 <label
                   className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   for="inline-full-name"
                 >
                   Address
                 </label>
               </div>
               <div className="md:w-2/3">
                 <input
                   className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-60 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                   id="inline-full-name"
                   type="text"
                   value={address}
                   placeholder="Enter your address"
                   onChange={(event) => {
                     setAddress(event.target.value);
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
                   Phone Number
                 </label>
               </div>
               <div className="md:w-2/3">
                 <input
                   className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-60 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                   id="inline-password"
                   type="text"
                   value={mobile}
                   placeholder="Enter your Phone number"
                   onChange={(event) => {
                     setMobile(event.target.value);
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
                   Next
                 </button>
               </div>
             </div>
           </form>

          )}
          {orderPlaced && (
             <form className="w-full max-w-sm mt-20" onSubmit={handleTransaction}>
              
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
                   className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-60 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                   id="inline-full-name"
                   type="text"
                   value={accountID}
                   placeholder="Account ID"
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
                   className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-60 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                   id="inline-password"
                   type="password"
                   value={password}
                   placeholder="***********"
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
                   Place Order
                 </button>
               </div>
             </div>
           </form>

          )}          
        </section>
      </section>
    </section>
  );

  function placeOrder(e) {
    e.preventDefault();
    console.log("inside placeholder");
    gaddress = address;
    // gsecret = secret;
    gmobile = mobile;

    console.log(gaddress);
    // console.log(gsecret);
    console.log(gmobile);
    console.log(orderPlaced);
    toggle();
  }


  function handleTransaction(e) {

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
          // fmoney = ans.user.money;

          console.log(`fetching ${fid}`);
          console.log(fpass);
          console.log(fid);

          if (fpass == gpass) {
            const data = {
              address: address,
              email: sessionEmail,
              mobile: mobile,
              productQuantity:
                cardContext.state[0].quantity +
                cardContext.state[1].quantity +
                cardContext.state[2].quantity,
              cost: calTotalPrice(),
            };
            console.log(data);

            //Transaction

            fetch("http://localhost:4000/transaction", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((ans) => {
                return ans.json();
              })
              .then((anss) => {
                console.log(anss);
                if (anss.msg === "transaction complete") {
                  swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Succesfully placed order',
                    timer: 1500,
                    showConfirmButton: false
                  });
                  
                  router.replace('/orders');
                  
                  console.log(`asdasd ${data.cost}`);
                  
                  updateEcommerce('64e79a9d16f4e086651c2567',data.cost);

                }else{                  
                  swal.fire({
                  icon: 'error',
                  title: 'Something went wrong!',
                  text: 'You do not have enough balance to complete this transaction' 
                });
                }
              });
          }
        })
        .catch((e) => {
          alert('No such account');
          stat = false;
          console.log("no account");
          console.log(e);
        });
    }

    function updateEcommerce(accountID,cost){
      fetch("http://localhost:4000/update-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: accountID,
          money: cost
        }),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((ans) => {
            console.log(ans.user);
        });

    }

  }


};

export default PaymentDetail;

