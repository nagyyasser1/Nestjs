import React, { useState } from "react";
import { useRegisterMutation } from "../../api/authApi";
import { ApiErrorResponse } from "../../types";
import { Form, Button, Container, Row, Nav } from "react-bootstrap";
import Error from './../../components/Error';
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { data: userData, isLoading, isError, isSuccess, error: errObj, mutate } = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if(name === "password") {
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

  if(isSuccess) navigate('/login')
  
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="col-12 col-md-8 col-lg-6">
        <div className="d-flex align-items-center col-md-6">
          <h4 className="mb-4 w-100">Register</h4>
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
              Register
            </Button>
          </div>
          <Nav.Link as={Link} to="/login">
            Aready have account!
          </Nav.Link>
        </Form>

        {isLoading && <p>Loading...</p>}
        {isError && <Error reesponse={errObj as ApiErrorResponse} />}
        {userData && <p>Registration successful!</p>}
      </Row>
    </Container>
  );
};

export default Register;
