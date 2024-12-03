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
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/create-template"
          element={
            <PrivateRoute>
              <CreateTemplatePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-template"
          element={
            <PrivateRoute>
              <EditTemplatePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/template/:templateId/forms"
          element={
            <PrivateRoute>
              <FormsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/template/:templateId/forms/:formId"
          element={
            <PrivateRoute>
              <FormPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
