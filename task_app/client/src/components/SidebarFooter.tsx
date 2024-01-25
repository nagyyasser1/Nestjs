import { useContext } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MyAppContext } from "../context/appContext";
import { useLogOutMutaion } from "../api/authApi";

const SidebarFooter = () => {
  const navigate = useNavigate();
  const { handleIsLoggedIn, handleSetAccessToken, username } = useContext(MyAppContext);
  const {mutate} = useLogOutMutaion()

  const handleLogOut = () => {
    mutate();
    handleIsLoggedIn(false);
    handleSetAccessToken("");
    navigate("/login");
  };
  
  return (
    <div className="d-flex justify-content-between align-items-center p-3">
      <div>
        <h6 className="m-0">@{username}</h6>
      </div>
      <Button variant="dark"  onClick={handleLogOut}>
        LogOut?
      </Button>
    </div>
  );
};

export default SidebarFooter;
