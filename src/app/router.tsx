import { Route, Routes } from "react-router-dom";

import { HomePage } from "./pages/home/Home";
import { LoginPage } from "./pages/login/Login";
import { RegisterPage } from "./pages/register/Register";
import { TemplatesPage } from "./pages/templates/Templates";
import { TemplatePage } from "./pages/template/Template";
import { SearchPage } from "./pages/search/Search";

import { ProfilePage } from "./pages/profile/Profile";
import { CreateTemplatePage } from "./pages/create-template/CreateTemplate";
import { EditTemplatePage } from "./pages/edit-template/EditTemplate";
import { FormsPage } from "./pages/forms/Forms";
import { FormPage } from "./pages/form/Form";
import { AdminPage } from "./pages/admin/Admin";

import { NotFoundPage } from "./pages/notfound/NotFound";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/template/:templateId" element={<TemplatePage />} />

      <Route path="/search" element={<SearchPage />} />

      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/create-template" element={<CreateTemplatePage />} />
      <Route path="/edit-template" element={<EditTemplatePage />} />

      <Route path="/template/:templateId/forms" element={<FormsPage />} />
      <Route path="/template/:templateId/forms/:formId" element={<FormPage />} />

      <Route path="/admin" element={<AdminPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
