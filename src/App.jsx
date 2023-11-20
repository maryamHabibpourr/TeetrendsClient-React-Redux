import { Routes, Route } from "react-router-dom";

//components
import {
  Home,
  SignIn,
  Register,
  Layout,
  CartForItems,
  ScrollToTop,
  NotFound,
} from "./pages";
import { ProductDetail, ProductList, Profile } from "./components";


//redux needs
import { Provider } from "react-redux";
import store from "./redux/store";

//ant
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
import frFR from "antd/locale/fr_FR";
import locale from "antd/es/date-picker/locale/fa_IR";

function App() {
  return (
    <div>
      <StyleProvider hashPriority="high" dir="rtl">
        <ConfigProvider locale={frFR}>
          <Provider store={store}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/products"
                element={
                  <Layout>
                    <ProductList />
                  </Layout>
                }
              />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
              <Route
                path="/cart"
                element={
                  <Layout>
                    <CartForItems />
                  </Layout>
                }
              />
              <Route
                path="/profile"
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
            </Routes>
          </Provider>
        </ConfigProvider>
      </StyleProvider>
    </div>
  );
}

export default App;
