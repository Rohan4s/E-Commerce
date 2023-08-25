import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function DynamicTable() {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState();
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth/login");
        console.log("no session");
      } else {
        setEmail(session.user.email);
        console.log(session.user.email);
      }
    });

    async function fetchData() {
      try {
        const response = await fetch("http://localhost:4000/get-transactions");
        const result = await response.json();
        setData(result.ans);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              TrxID
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            {(email == "supplier.com" || email == "ecommerce@gmail.com") && (
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((e, id) => {
            if (
              e.email === email ||
              (email == "supplier.com" && e.status!='pending') ||
              email == "ecommerce@gmail.com"
            ) {
              return (
                <tr
                  key={id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {e.trxId}
                  </th>
                  <td className="px-6 py-4">{e.productQuantity}</td>
                  <td className="px-6 py-4">{e.cost}</td>
                  <td className="px-6 py-4">{e.address}</td>
                  <td className="px-6 py-4">{e.status}</td>
                  {(email == "supplier.com" ||
                    email == "ecommerce@gmail.com") && (
                    <button
                      className="bg-transparent hover:bg-sky-300 text-white font-semibold hover:text-white py-2 px-4 border border-cyan-500 hover:border-transparent rounded"
                      onClick={() => {
                        
                        // console.log(e.status)
                        // console.log(e.status=='Confirmed')
                        // console.log(email == "supplier.com")
                        // console.log(email == 'supplier.com' && e.status=='Confirmed')
                        
                        if (
                          email == "ecommerce@gmail.com" &&
                          e.status == "pending"
                        ) {
                          console.log("Confirming..");
                          fetch(
                            `http://localhost:4000/confirm-order?txid=${e.trxId}`
                          )
                            .then((ans) => {
                              return ans.json();
                            })
                            .then((anss) => {
                              console.log("confirmed?");
                              console.log(anss);
                              Swal.fire("Confired Successfully. Supplier can now supply the product");

                              // refetch data
                              fetch("http://localhost:4000/get-transactions")
                                .then((response) => response.json())
                                .then((result) => {
                                  setData(result.ans);
                                })
                                .catch((error) => {
                                  console.error("Error fetching data:", error);
                                });
                            })
                            .catch((error) => {
                              console.error("Error fetching data:", error);
                            });
                        } 
                        else if (email == 'supplier.com' && e.status=='Confirmed') {

                          console.log('delivering');
                          fetch(
                            `http://localhost:4000/make-order-done?txid=${e.trxId}`
                          )
                            .then((ans) => {
                              return ans.json();
                            })
                            .then((anss) => {
                              console.log(anss);
                              Swal.fire("Delivered Successfully");
                              var cost = e.cost * 0.9;
                              updateSupplier(cost);
                              degradeAdmin(cost);

                              // refetch data
                              fetch("http://localhost:4000/get-transactions")
                                .then((response) => response.json())
                                .then((result) => {
                                  setData(result.ans);
                                })
                                .catch((error) => {
                                  console.error("Error fetching data:", error);
                                });
                            });
                        }
                      }}
                    >
                      {e.status == "pending" ? " Confirm " : e.status=='Confirmed'?"Confirmed": "Delivered" }
                    </button>
                  )}
                </tr>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </table>
    </div>
  );

  function updateSupplier(cost) {
    fetch("http://localhost:4000/update-supplier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "64e7a8044c2b180f0a725d96",
        money: cost,
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((ans) => {
        console.log(ans.user);
      });
  }
  function degradeAdmin(cost) {
    fetch("http://localhost:4000/degrade-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "64e79a9d16f4e086651c2567",
        money: cost,
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

export default DynamicTable;

// import OneOrder from "@/components/orders/Order";
// import { getSession } from "next-auth/client";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

// export default function ShowOrders() {
//   const [data, setData] = useState(null);
//   const [userEmail, setUserEmail] = useState(""); // Initialize userEmail in state
//   const router = useRouter();

//   useEffect(() => {
//     getSession().then((session) => {
//       if (!session) {
//         router.replace("/auth/login");
//         console.log("no session");
//       } else {
//         setUserEmail(session.user.email); // Update userEmail state
//         // console.log(`userEmail set to ${userEmail}`);
//         // console.log(typeof userEmail);
//       }
//     });

//     fetch("http://localhost:4000/get-transactions")
//       .then((resp) => resp.json())
//       .then((anss) => {
//         console.log(anss);
//         setData(anss);
//       });
//   }, []);

//   return (
//     <div>
//       <ul>
//         {data &&
//           data.ans.map((e, id) => {
//             // console.log(`${e.email} -> ${e.cost} === ${userEmail}`);
//             // console.log(e.email === userEmail);
//             if(e.email == userEmail)
//               return <OneOrder e={e} key={id} />;
//           })}
//       </ul>
//     </div>
//   );
// }
