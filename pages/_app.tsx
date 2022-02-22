import { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import { createContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient: QueryClient = new QueryClient();

interface AppContextType {
  isLogged: String;
  setIsLogged: React.Dispatch<React.SetStateAction<string>>;
  cart: Number;
  setCart: React.Dispatch<React.SetStateAction<number>>;
}
export const AppContext = createContext<AppContextType>({} as AppContextType);

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  });

  const [cart, setCart] = useState(0);
  const [isLogged, setIsLogged] = useState("");

  return (
    <AppContext.Provider value={{ isLogged, setIsLogged, cart, setCart }}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
