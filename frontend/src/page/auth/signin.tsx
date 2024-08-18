import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import TextInput from "../../components/text-input";
import Button from "../../components/button";
import FormGroup from "../../components/form-group";
import Alert from "../../components/alert";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, error, signin, clearErrors } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    signin(email, password);
  };

  useEffect(() => {
    if (user) {
      navigate("/documents");
    }
  }, [user, navigate]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-6 bg-black border border-red-500 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-3xl font-extrabold text-white">
              Sign In
            </h1>
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

                {error && <Alert type="error">Error: {error}</Alert>}

                <Button className="mt-4 bg-red-600 text-white hover:bg-red-700 transition-colors duration-300 ease-in-out">
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
