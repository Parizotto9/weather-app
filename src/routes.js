// import Menu from "./components/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import City from "./pages/City";
// import Catalog from "./pages/Catalog";
import Home from "./pages/Home";

export default function AppRouter() {
  return (
    <main>
      <Router>
        {/* <Menu /> */}
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="city/:place" element={<City />} />
            {/* <Route path="catalog" element={<Catalog />} /> */}
          </Route>
        </Routes>
      </Router>
    </main>
  );
}
