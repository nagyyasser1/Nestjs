import { useContext, useState } from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import { createTask } from "../api/tasksApi";
import Error from "./Error";
import { ApiErrorResponse } from "../types";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { MyAppContext } from "../context/appContext";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const { accessToken } = useContext(MyAppContext);
  
  const navigate = useNavigate();

  const queryClient = useQueryClient()

  const {
    data: taskInfo,
    isLoading,
    isError,
    error: errObj,
    mutate,
  } = useMutation(() => {
    return createTask({ title, description }, accessToken);
  },{
    onSuccess: ()=> queryClient.invalidateQueries('tasks'),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  // Handle submit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!title || !description) return ;

    mutate();
    setTitle("");
    setDescription("");
    navigate("/");
  };

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
              Create
            </Button>
          </div>

          {isLoading && <p>Loading...</p>}
          {isError && <Error reesponse={errObj as ApiErrorResponse} />}
          {taskInfo && <p>Login successful!</p>}
        </Form>
      </Row>
    </Container>
  );
};

export default CreateTask;
