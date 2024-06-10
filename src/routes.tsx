import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormDataProvider } from "./context/FormDataContext";
import LoadingComponent from "./components/LoadingComponent";

const PaginaPadrao = lazy(() => import("./pages/PaginaPadrao"));
const Etapa1 = lazy(() => import("./pages/Etapa1"));
const Etapa2PF = lazy(() => import("./pages/Etapa2PF"));
const Etapa2PJ = lazy(() => import("./pages/Etapa2PJ"));
const Etapa3 = lazy(() => import("./pages/Etapa3"));
const Etapa4PF = lazy(() => import("./pages/Etapa4PF"));
const Etapa4PJ = lazy(() => import("./pages/Etapa4PJ"));

export default function AppRouter() {
  return (
    <main>
      <Router>
        <Suspense fallback={<LoadingComponent />}>
          <FormDataProvider>
            <Routes>
              <Route path="/" element={<PaginaPadrao />}>
                <Route path="/registration" element={<Etapa1 />} />
                <Route path="etapa2-pf" element={<Etapa2PF />} />
                <Route path="etapa2-pj" element={<Etapa2PJ />} />
                <Route path="etapa3/:id" element={<Etapa3 />} />
                <Route path="etapa4-pf" element={<Etapa4PF />} />
                <Route path="etapa4-pj" element={<Etapa4PJ />} />
              </Route>
            </Routes>
          </FormDataProvider>
        </Suspense>
      </Router>
    </main>
  );
}
