import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Homepage from "./pages/Homepage.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import CountriesList from "./components/CountryList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
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
      </AuthProvider>
    </CitiesProvider>
  );
}

export default App;
