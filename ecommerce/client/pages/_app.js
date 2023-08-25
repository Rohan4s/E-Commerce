import MainLayout from "@/components/layouts/MainLayout";
import MainHeader from "@/components/ui/MainHeader";
import { BankContextProvider } from "@/contexts/bank-context";
import { CartContextProvider } from "@/contexts/cart-context";
import "@/styles/globals.css";
import { Provider } from "next-auth/client";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <BankContextProvider>
        <CartContextProvider>
          <MainLayout>
            <Head>
              <title>Ecommerce</title>
            </Head>
            <MainHeader />
            <Component {...pageProps} />
          </MainLayout>
        </CartContextProvider>
      </BankContextProvider>
    </Provider>
  );
}
