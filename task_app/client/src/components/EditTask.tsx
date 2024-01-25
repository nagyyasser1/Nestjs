import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getTaskById, updateTask } from "../api/tasksApi";
import { useContext, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import Error from "./Error";
import { ApiErrorResponse } from "../types";
import { MyAppContext } from "../context/appContext";

const EditTask = () => {
  const { taskId } = useParams();
  const { accessToken } = useContext(MyAppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { isLoading, isError, error } = useQuery(
    ["tasks", taskId],
    async () => {
      if (taskId) {
        const task = await getTaskById(taskId, accessToken);
        return task;
      }
    },
    {
      onSuccess: ({ title, description }) => {
        setTitle(title);
        setDescription(description);
      },
    }
  );

  const { mutate } = useMutation(async () => {
    if (taskId)
      return updateTask(
        { title, description, id: +taskId },
        accessToken
      );
  });

  if (isLoading) {
    return <p>loading</p>;
  }

  if (isError) {
    return <p>error oucured</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !taskId) return;

    mutate();
    setTitle("");
    setDescription("");
    navigate(`/task/${taskId}`);
  };

  if (!taskId) return <p>no taskId provided</p>;

  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit} className="mt-5">
          <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              className="border-dark shadow-none"
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={description}
              onChange={handleChange}
              className="border-dark shadow-none"
            />
          </Form.Group>

          <div className="d-flex justify-content-end mt-3">
            <Button variant="dark" type="submit">
              update
            </Button>
          </div>

          {isLoading && <p>Loading...</p>}
          {isError && <Error reesponse={error as ApiErrorResponse} />}
        </Form>
      </Row>
    </Container>
  );
};

export default EditTask;
