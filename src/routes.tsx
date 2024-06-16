import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormDataProvider } from "./context/FormDataContext";
import LoadingComponent from "./components/LoadingComponent";

const PaginaPadrao = lazy(() => import("./pages/PaginaPadrao"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Home = lazy(() => import("./pages/Home"));

export default function AppRouter() {
  return (
    <main>
      <Router>
        <Suspense fallback={<LoadingComponent />}>
          <FormDataProvider>
            <Routes>
              <Route path="/" element={<PaginaPadrao />}>
                <Route index element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
              <Route path="/home" element={<Home />} />
            </Routes>
          </FormDataProvider>
        </Suspense>
      </Router>
    </main>
  );
}
