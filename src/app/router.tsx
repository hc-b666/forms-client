import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PrivateRoute } from "@/components/layout/PrivateRoute";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const HomePage = lazy(() => import("@/pages/Home"));
const LoginPage = lazy(() => import("@/pages/Login"));
const RegisterPage = lazy(() => import("@/pages/Register"));
const TemplatesPage = lazy(() => import("@/pages/Templates"));
const TemplatePage = lazy(() => import("@/pages/Template"));
const SearchPage = lazy(() => import("@/pages/Search"));

const ProfilePage = lazy(() => import("@/pages/Profile"));
const CreateTemplatePage = lazy(() => import("@/pages/CreateTemplate"));
const FormsPage = lazy(() => import("@/pages/Forms"));
const FormPage = lazy(() => import("@/pages/Form"));
const AdminPage = lazy(() => import("@/pages/Admin"));

const NotFoundPage = lazy(() => import("@/pages/NotFound"));

export function Router() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/template/:templateId" element={<TemplatePage />} />

        <Route path="/search" element={<SearchPage />} />

        <Route
          path="/profile/:userId"
          element={
            <PrivateRoute roles={["USER", "ADMIN"]} component={ProfilePage} />
          }
        />

        <Route
          path="/create-template"
          element={
            <PrivateRoute roles={["USER", "ADMIN"]} component={CreateTemplatePage} />
          }
        />

        <Route
          path="/template/:templateId/forms"
          element={
            <PrivateRoute roles={["USER", "ADMIN"]} component={FormsPage} />
          }
        />

        <Route
          path="/template/:templateId/forms/:formId"
          element={
            <PrivateRoute roles={["USER", "ADMIN"]} component={FormPage} />
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["ADMIN"]} component={AdminPage} />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
