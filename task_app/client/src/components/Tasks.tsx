import { Nav } from "react-bootstrap";
import { getTasks } from "../api/tasksApi";
import { ApiErrorResponse } from "../types";
import { Task } from "../types/TasksTypes";
import Error from "./Error";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { useContext } from "react";
import { MyAppContext } from "../context/appContext";
import { HiOutlineArrowSmRight } from "react-icons/hi";

const Tasks = () => {
  const { accessToken } = useContext(MyAppContext);
  const queryClient = useQueryClient();

  const {
    isLoading,
    error: errObj,
    data: tasks,
  } = useQuery("tasks", () => getTasks(accessToken), {
    onError: () => {
      queryClient.invalidateQueries("accessToken");
    },
  });

  const sortedTasks = tasks?.sort(
    (a: { id: number }, b: { id: number }) => b.id - a.id
  );

  if (isLoading) {
    return (
      <>
        <p>loading...</p>
      </>
    );
  }

  if (errObj) {
    return <Error reesponse={errObj as ApiErrorResponse} />;
  }

  if(sortedTasks.length === 0) {
    return <Nav.Link as = {Link} to={'/create'} className="m-4">
      create your first task ?
    </Nav.Link>
  }

  return (
    <div className="m-4">
      {sortedTasks.map((t: Task, idx: number) => {
        return (
          <div className="p-1 m-2 d-flex gap-3" key={idx}>
            <Nav.Link as={Link} to={`/task/${t.id}`}>
              <strong className="m-3">{t.title}</strong>
              <HiOutlineArrowSmRight className="fs-4" />
            </Nav.Link>
          </div>
        );
      })}
    </div>
  );
};
export default Tasks;
