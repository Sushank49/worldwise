import { useEffect, useState } from "react";
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

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("Error loading data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage></Homepage>}></Route>
        <Route path="product" element={<Product></Product>}></Route>
        <Route path="pricing" element={<Pricing></Pricing>}></Route>
        <Route path="app" element={<AppLayout></AppLayout>}>
          <Route
            index
            element={<Navigate to="cities" replace></Navigate>}
          ></Route>
          <Route
            path="cities"
            element={
              <CityList isLoading={isLoading} cities={cities}></CityList>
            }
          />
          <Route path="cities/:id" element={<City></City>} />
          <Route
            path="countries"
            element={
              <CountriesList
                cities={cities}
                isLoading={isLoading}
              ></CountriesList>
            }
          ></Route>
          <Route path="form" element={<Form></Form>}></Route>
        </Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}>
          {" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
