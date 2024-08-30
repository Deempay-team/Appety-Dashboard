import React from "react";
import  HeaderPage  from "./AdminHeader";
import Sidebar from "./AdminSidebar";

function Layout({ children }) {
  return (
    <>
      <div>
        <main>
         <HeaderPage />
          <Sidebar />
            {children}
        </main>
      </div>
    </>
  );
}

export default Layout;