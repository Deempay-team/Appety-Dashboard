// Authentication
import { LoginPage } from "../pages/login";
import { SignUpPage } from "../pages/signup";
import { ForgotPasswordPage } from "../pages/password/ForgotPassword";
import { ResetPasswordPage } from "../pages/password/ResetPassword";

// Admin
import { AdminHomePage } from "../pages/admin/home";
import { AdminSettingsPage } from "../pages/admin/settings";

//import { NotFoundPage } from "../pages/not-found-page";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  public: [
    {
      exact: true,
      path: "/",
      element: LoginPage,
    },
    {
      exact: true,
      path: "/login",
      element: LoginPage,
    },
    {
      exact: true,
      path: "/signup",
      element: SignUpPage,
    },
    {
      exact: true,
      path: "/password/forgot",
      element: ForgotPasswordPage,
    },
    {
      exact: true,
      path: "/password/reset",
      element: ResetPasswordPage,
    },

  ],

  private: [
    // Admin
    {
      exact: true,
      path: "/dashboard/admin",
      element: AdminHomePage,
    },
    {
      exact: true,
      path: "/dashboard/admin/settings",
      element: AdminSettingsPage,
    },
 
  
    // Not FoundPage
    // {
    //   path: "*",
    //   component: NotFoundPage,
    // },
  ],
};
