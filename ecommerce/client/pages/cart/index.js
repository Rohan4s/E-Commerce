import PaymentDetail from "@/components/cart/PaymentDetail";
import CartContext from "@/contexts/cart-context";
import { findProductQuantity } from "@/utils/product-cart";
import { useContext, useState } from "react";
import useSWR from "swr";

export default function ShowCart() {
  const cartCtx = useContext(CartContext);
  async function fetcher() {
    const response = await fetch("/api/products");
    return await response.json();
  }
  const { data, error, isLoading } = useSWR("/api/products", fetcher);
  console.log(data);
  const [paymentStatus, setPaymentStatus] = useState(false);
  if (error) {
    return <p>sorry we are having trouble now.Please visit later</p>;
  }
  function calculateTotalForASingleItem(productId, productPrice) {
    const product = cartCtx.state.find((e) => {
      return e.id === productId;
    });
    return product.quantity * productPrice;
  }

  function calTotalPrice(data) {
    let total = 0;
    data?.map((e) => {
      total = total + e.price * findProductQuantity(e._id, cartCtx);
    });
    console.log(`total = ${total}`);
    return total;
  }
  const total=calTotalPrice(data);

  return (
    <>
      <div className="flex-col mt-0">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left bg-slate-300 text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((e) =>(
                  <tr className="bg-slate-800">
                    <td className="px-6 py-4">{e.name}</td>
                    <td className="px-6 py-4">{e.price}</td>
                    <td className="px-6 py-4">
                      {findProductQuantity(e._id, cartCtx)}
                    </td>
                    <td className="px-6 py-4">
                      {calculateTotalForASingleItem(e._id, e.price)}
                    </td>
                  </tr>)
                )
              }
              <tr className="text-xl text-white uppercase bg-slate-300 dark:bg-gray-700 dark:text-gray-400">
                <td>Total Price</td>
                <td></td>
                <td></td>
                <td>${total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <PaymentDetail isLoading={isLoading} data={data} cartDetail={cartCtx} />
        {/* {paymentStatus && <PaymentStatus status={0} msg={"incomplete"} />} */}
      </div>
    </>
  );
}
