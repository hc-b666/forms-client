import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoute";
import LoadingSpinner from "./components/LoadingSpinner";

const HomePage = lazy(() => import("./pages/home/Home"));
const LoginPage = lazy(() => import("./pages/login/Login"));
const RegisterPage = lazy(() => import("./pages/register/Register"));
const TemplatesPage = lazy(() => import("./pages/templates/Templates"));
const TemplatePage = lazy(() => import("./pages/template/Template"));
const SearchPage = lazy(() => import("./pages/search/Search"));

const ProfilePage = lazy(() => import("./pages/profile/Profile"));
const CreateTemplatePage = lazy(() => import("./pages/create-template/CreateTemplate"));
const EditTemplatePage = lazy(() => import("./pages/edit-template/EditTemplate"));
const FormsPage = lazy(() => import("./pages/forms/Forms"));
const FormPage = lazy(() => import("./pages/form/Form"));
const AdminPage = lazy(() => import("./pages/admin/Admin"));

const NotFoundPage = lazy(() => import("./pages/notfound/NotFound"));

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
            <PrivateRoute roles={["user", "admin"]} component={ProfilePage} />
          }
        />

        <Route
          path="/create-template"
          element={
            <PrivateRoute roles={["user", "admin"]} component={CreateTemplatePage} />
          }
        />

        <Route
          path="/edit-template/:templateId"
          element={
            <PrivateRoute roles={["user", "admin"]} component={EditTemplatePage} />
          }
        />

        <Route
          path="/template/:templateId/forms"
          element={
            <PrivateRoute roles={["user", "admin"]} component={FormsPage} />
          }
        />

        <Route
          path="/template/:templateId/forms/:formId"
          element={
            <PrivateRoute roles={["user", "admin"]} component={FormPage} />
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute roles={["admin"]} component={AdminPage} />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
