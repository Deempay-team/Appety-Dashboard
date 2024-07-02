import React from "react";
import  Sidebar  from "./Sidebar";
import  HeaderPage  from "./Header";

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