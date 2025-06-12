import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import "antd/dist/antd.min.css";
import { QueryClient, QueryClientProvider } from "react-query";
import storage from "./utils/storage";
import { useAuth } from "./hooks/useAuth";
import auth from "./utils/auth";
import { LoginPage } from "./pages/login";
import { AdminHomePage } from "./pages/admin/home";
import { ResetPasswordPage } from "./pages/password/ResetPassword";
import { ForgotPasswordPage } from "./pages/password/ForgotPassword";
import { SignUpPage } from "./pages/signup";
import { SignUpVerifyPage } from "./pages/signup";
import PrivateRoute from "./routes/PrivateRoute";
import { NotFoundPage } from "./pages/not-found";
import { UserHomePage } from "./pages/user";
import { MerchantHomePage } from "./pages/merchant/home/Home";
import LinkSettingsPage from "./pages/merchant/linksettings/LinkSettings";
import ImageSettingsPage from "./pages/merchant/imagesettings/ImageSettings";
import QueueSettingsPage from "./pages/merchant/queuesettings/QueueSettings";
import { TvPage } from "./pages/tv";
import { MonitorPage } from "./pages/monitor"
import { AdminMerchantListPage } from "./pages/admin/merchant-list";

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
            <Route path="/dashboard/merchant/:customerId?" element={<MerchantHomePage />} exact />
            <Route path="/dashboard/merchant/settings/link" element={<LinkSettingsPage />} exact />
            <Route path="/dashboard/merchant/settings/image" element={<ImageSettingsPage />} exact />
            <Route path="/dashboard/merchant/settings/queue" element={<QueueSettingsPage />} exact />
          </Route>
          <Route path="/user/:linkUrl" element={<UserHomePage />} exact />
          <Route path="/" exact element={<LoginPage />} />
          <Route path="/login" exact element={<LoginPage />} />
          <Route path="/password/reset/:email?/:token?" exact element={<ResetPasswordPage />} />
          <Route path="/password/forgot" exact element={<ForgotPasswordPage />} />
          <Route path="/display-tv/:monitorUrl?" element={<TvPage />} exact />
          <Route path="/tablet/:linkUrl?" element={<MonitorPage />} exact />
          <Route path="/signup" element={<SignUpPage />} exact />
          <Route path="/signup/verify/:email?/:token?" element={<SignUpVerifyPage />} exact />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
