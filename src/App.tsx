import { Route, Routes } from "react-router-dom";
import { Nav } from "./components/Nav";
import HomePage from "./pages/HomePage";
import ExplainerPage from "./pages/ExplainerPage";
import DiagnosticPage from "./pages/DiagnosticPage";
import FrameworkPage from "./pages/FrameworkPage";
import ReleaseNavigatorPage from "./pages/ReleaseNavigatorPage";
import PaperPage from "./pages/PaperPage";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explainer" element={<ExplainerPage />} />
        <Route path="/diagnostic" element={<DiagnosticPage />} />
        <Route path="/framework" element={<FrameworkPage />} />
        <Route path="/release" element={<ReleaseNavigatorPage />} />
        <Route path="/paper" element={<PaperPage />} />
      </Routes>
    </>
  );
}
