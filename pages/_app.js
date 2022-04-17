import "tailwindcss/tailwind.css";
import "../styles/index.css";
import { Provider } from "react-redux";
import "glider-js/glider.min.css";
import "../components/ItemSlider/itemSlider.css";
import store from "../Redux/store/store";
import Layout from "../components/Layout";
import Head from "../components/Head";
import { useEffect } from "react";
import { saveToLocalStorage } from "../Redux/persistStorage";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    store.subscribe(() => {
      saveToLocalStorage(store.getState());
    });
    // router.push("/maintenance");
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Head />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
