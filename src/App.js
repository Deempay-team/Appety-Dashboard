import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import "antd/dist/antd.min.css";
import 'react-image-crop/dist/ReactCrop.css'
import { QueryClient, QueryClientProvider } from "react-query";
import storage from "./utils/storage";
import { useAuth } from "./hooks/useAuth";
import auth from "./utils/auth";
import { LoginPage } from "./pages/login";
import { AdminHomePage } from "./pages/admin/home";
import { ResetPasswordPage } from "./pages/password/ResetPassword";
import { ForgotPasswordPage } from "./pages/password/ForgotPassword";
import { SignUpPage } from "./pages/signup";
import PrivateRoute from "./routes/PrivateRoute";
import HomePage from "./pages/Home";
import { NotFoundPage } from "./pages/not-found";
import { UserHomePage } from "./pages/user";
import { MerchantHomePage } from "./pages/merchant/home/Home";
import LinkSettingsPage from "./pages/merchant/linksettings/LinkSettings";
import ImageSettingsPage from "./pages/merchant/imagesettings/ImageSettings";
import QueueSettingsPage from "./pages/merchant/queuesettings/QueueSettings";
import { VerifyPage } from "./pages/verify";
import { TvPage } from "./pages/tv";
import { AdminMerchantListPage } from "./pages/admin/merchant-list";
import TablePage from "./pages/merchant/queuesettings/Table";

//import  BaseRoute  from "./routes/BaseRoute";

const queryClient = new QueryClient();

const App = () => {
  const { authenticate } = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated()) {
      const token = storage.fetch("token");
      authenticate(token);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />} exact>
            <Route path="/dashboard/admin/overview" element={<AdminHomePage />} exact />
            <Route
              path="/dashboard/admin/merchantlist"
              element={<AdminMerchantListPage />}
              exact
            />
            <Route path="/dashboard/tv" element={<TvPage />} exact />
            <Route path="/dashboard/merchant" element={<MerchantHomePage />} exact />
            <Route path="/dashboard/merchant/settings/link" element={<LinkSettingsPage />} exact />
            <Route path="/dashboard/merchant/settings/image" element={<ImageSettingsPage />} exact />
            <Route path="/dashboard/merchant/settings/queue" element={<QueueSettingsPage />} exact />
          </Route>
          <Route path="/user/:linkUrl" element={<UserHomePage />} exact />
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/password/reset" exact element={<ResetPasswordPage />} />
          <Route path="/password/forgot" exact element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignUpPage />} exact />
          <Route path="/verify-account/:userEmail?" element={<VerifyPage />} exact />
          <Route path="/table" element={<TablePage />} exact />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
