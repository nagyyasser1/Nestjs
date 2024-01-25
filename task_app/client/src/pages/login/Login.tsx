import React, { useContext, useState } from "react";
import { useLoginMutation } from "../../api/authApi";
import { Form, Button, Container, Row, Nav } from "react-bootstrap";
import { ApiErrorResponse } from "../../types";
import Error from "../../components/Error";
import { Link, useNavigate } from "react-router-dom";
import { MyAppContext } from "../../context/appContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleIsLoggedIn, handleSetAccessToken, handleSetUsername } = useContext(MyAppContext);

  const navigate = useNavigate();

  const {
    data: userData,
    isLoading,
    isError,
    error: errObj,
    isSuccess,
    mutate,
    data,
  } = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      return;
    }

    mutate({ username, password });
  };

  if (isSuccess && data) {
    handleIsLoggedIn(true);
    handleSetAccessToken(data.data.accessToken);
    handleSetUsername(data.data.username);
    navigate("/");
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="col-12 col-md-8 col-lg-6">
        <div className="d-flex align-items-center col-md-6">
          <h4 className="mb-4 w-100">Login</h4>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              className="border-dark shadow-none"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="border-dark shadow-none"
            />
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <Button type="submit" variant="dark">
              Login
            </Button>
          </div>
          <Nav.Link as={Link} to="/register">
            Don't have account?
          </Nav.Link>
        </Form>

        {isLoading && <p>Loading...</p>}
        {isError && <Error reesponse={errObj as ApiErrorResponse} />}
        {userData && <p>Login successful!</p>}
      </Row>
    </Container>
  );
};

export default Login;
