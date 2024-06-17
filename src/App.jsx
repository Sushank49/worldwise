import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

import CityList from "./components/CityList.jsx";
import CountriesList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// import Product from "./pages/Product.jsx";
// import Pricing from "./pages/Pricing.jsx";
// import PageNotFound from "./pages/PageNotFound.jsx";
// import AppLayout from "./pages/AppLayout.jsx";
// import Homepage from "./pages/Homepage.jsx";
// import Login from "./pages/Login.jsx";

const Homepage = lazy(() => import("./pages/Homepage.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Homepage></Homepage>}></Route>
              <Route path="product" element={<Product></Product>}></Route>
              <Route path="pricing" element={<Pricing></Pricing>}></Route>

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout></AppLayout>
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={<Navigate to="cities" replace></Navigate>}
                ></Route>
                <Route path="cities" element={<CityList></CityList>} />
                <Route path="cities/:id" element={<City></City>} />
                <Route
                  path="countries"
                  element={<CountriesList></CountriesList>}
                ></Route>
                <Route path="form" element={<Form></Form>}></Route>
              </Route>

              <Route path="login" element={<Login></Login>}></Route>
              <Route path="*" element={<PageNotFound></PageNotFound>}>
                {" "}
              </Route>
            </Routes>
          </BrowserRouter>
        </Suspense>
      </AuthProvider>
    </CitiesProvider>
  );
}

export default App;
