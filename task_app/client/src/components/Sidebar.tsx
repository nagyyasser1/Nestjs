import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import SidebarFooter from "./SidebarFooter";
import SidebarMenuIcon from "./SidebarMenuIcon";
import "./sidebar.css";

interface SidebarMenuIconProps {
  handleToggleSideBar: () => void;
  isSidebarOpend: boolean;
}

const Sidebar: React.FC<SidebarMenuIconProps> = ({
  handleToggleSideBar,
  isSidebarOpend,
}) => {
  return (
    <div
      className={`${
        isSidebarOpend ? "sidebar-opend" : "sidebar-closed"
      } sidebar`}
    >
      <div>
        <Nav
          defaultActiveKey="/"
          className="flex-column"
          onClick={handleToggleSideBar}
        >
          <Nav.Link
            as={Link}
            to="/"
            className="text-dark border-bottom border-dark"
          >
            My Tasks
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/create"
            className="text-dark border-bottom border-dark"
          >
            New
          </Nav.Link>
        </Nav>
      </div>
      <SidebarFooter />
      <SidebarMenuIcon
        handleToggleSideBar={handleToggleSideBar}
        isSidebarOpend={isSidebarOpend}
      />
    </div>
  );
};

export default Sidebar;
