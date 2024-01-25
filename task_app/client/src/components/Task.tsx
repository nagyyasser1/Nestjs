import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTask, updateTaskStatus, useGetTaskByIdQuery } from "../api/tasksApi";
import Error from "./Error";
import { ApiErrorResponse } from "../types";
import { Button, Dropdown, Nav } from "react-bootstrap";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { useContext } from "react";
import { MyAppContext } from "../context/appContext";

const Task = () => {
  const { taskId } = useParams();
  const { accessToken } = useContext(MyAppContext);
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  let selectedStatus = "";
  

  const {
    data: taskData,
    isLoading,
    isError,
    error: errObj,
    refetch
  } = useGetTaskByIdQuery(`${taskId}`);

  const deleteMutaion = useMutation(
    async () => {
      if (taskId) return deleteTask(taskId, accessToken);
    },
    {
      onSuccess: () => queryClient.invalidateQueries("tasks"),
    }
  );
  
  const updateStatusMutaion = useMutation(
    async () => {
      if (taskId) return updateTaskStatus({id: +taskId, status: selectedStatus} , accessToken);
    },
    {
      onSuccess: () => refetch(),
    }
  );

  const handleDeleteTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteMutaion.mutate();
    navigate("/");
  };
  
  const handleStatusChange = (selectedEventKey) => {
    selectedStatus = selectedEventKey;
    updateStatusMutaion.mutate();
  };
  

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <div>task not found</div>;

  return (
    <div>
      {isError && <Error reesponse={errObj as ApiErrorResponse} />}
      {taskData && (
        <div
          style={{
            padding: "5px",
            margin: "40px 5px",
          }}
        >
          <p>
            {taskData.title} <strong>{taskData.status}</strong>
          </p>
          <p>{taskData.description}</p>
        </div>
      )}
      <div className="d-flex justify-content-end align-items-center gap-2">
        <Dropdown onSelect={handleStatusChange}>
          <Dropdown.Toggle
            variant="light"
            id="taskStatusDropdown"
            className="icon"
          >
            <span style={{ color: "black" }}>Status</span>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as={Button} eventKey="DONE">
              Done
            </Dropdown.Item>
            <Dropdown.Item as={Button} eventKey="IN_PROGRESS">
              In Progress
            </Dropdown.Item>
            <Dropdown.Item as={Button} eventKey="OPEN">
              Open
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Nav.Link as={Link} to={`/task/update/${taskData?.id}`}>
          <FaEdit className="nested-icon" />
        </Nav.Link>
        <FaTrashAlt className="icon" onClick={handleDeleteTask} />
      </div>
    </div>
  );
};

export default Task;
