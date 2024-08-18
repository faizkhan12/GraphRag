import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import TextInput from "../../components/text-input";
import Button from "../../components/button";
import FormGroup from "../../components/form-group";
import Alert from "../../components/alert";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { signup, clearErrors, error, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return alert("Passwords do not match");
    }
    clearErrors();
    signup(email, password);
  };

  useEffect(() => {
    if (user) {
      navigate("/documents");
    }
  }, [user, navigate]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-black border border-gray-700 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-3xl font-extrabold text-white">
              Sign Up
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Already have an account?{" "}
              <a
                className="text-blue-500 decoration-2 hover:underline font-medium"
                href="/signin"
              >
                Sign In Here
              </a>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <FormGroup label="Email">
                  <TextInput
                    value={email}
                    onChange={setEmail}
                    type="email"
                    placeholder="Enter Email"
                  />
                </FormGroup>

                <FormGroup label="Password">
                  <TextInput
                    value={password}
                    onChange={setPassword}
                    type="password"
                    placeholder="Enter Password"
                  />
                </FormGroup>

                <FormGroup label="Confirm Password">
                  <TextInput
                    value={passwordConfirm}
                    onChange={setPasswordConfirm}
                    type="password"
                    placeholder="Confirm Password"
                  />
                </FormGroup>

                {error && <Alert type="error">Error: {error}</Alert>}

                <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105">
                  Sign Up
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
