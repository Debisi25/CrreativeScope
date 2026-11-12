import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ClientView from "./pages/ClientView";
import Overview from "./pages/Overview";
import ProjectDetail from "./pages/ProjectDetail";
import AgreementBuilder from "./pages/AgreementBuilder.tsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Overview />} />
        <Route
          path="projects"
          element={<Navigate to="/projects/1" replace />}
        />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="projects/new" element={<AgreementBuilder />} />
      </Route>

      {/* Outside Layout on purpose: clients don't see the sidebar */}
      <Route path="client/:id" element={<ClientView />} />
    </Routes>
  );
}
