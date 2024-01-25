import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";

interface SidebarMenuIconProps {
  handleToggleSideBar: () => void;
  isSidebarOpend: boolean
}


const SidebarMenuIcon: React.FC<SidebarMenuIconProps> = ({
  handleToggleSideBar,
  isSidebarOpend,
}) => {
  return (
    <div className="sidebar-menu-icon" onClick={handleToggleSideBar}>
      {isSidebarOpend ? (
        <MdKeyboardDoubleArrowLeft />
      ) : (
        <MdKeyboardDoubleArrowRight />
      )}
    </div>
  );
};

export default SidebarMenuIcon;
