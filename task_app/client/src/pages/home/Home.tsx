import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const Home: React.FC = () => {
  const [isSidebarOpend, setIsSidebarOpend] = useState(false);

  const handleToggleSideBar = () => {
    setIsSidebarOpend((prev) => !prev);
  };

  return (
    <Container fluid >
      <Outlet />
      <Sidebar
        handleToggleSideBar={handleToggleSideBar}
        isSidebarOpend={isSidebarOpend}
      />
    </Container>
  );
};

export default Home;
