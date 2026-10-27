import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { login } from "@/services/authApi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await login(formData);

    sessionStorage.setItem("adminToken", response.data.token);

sessionStorage.setItem("adminName", response.data.admin.full_name);

sessionStorage.setItem("adminId", response.data.admin.id);

sessionStorage.setItem("username", response.data.admin.username);

      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">

      <Card className="w-full max-w-md rounded-xl shadow-lg">

        <CardHeader className="space-y-2 text-center">

          <CardTitle className="text-2xl font-bold">
            Admin Login
          </CardTitle>

          <CardDescription>
            Sign in to continue
          </CardDescription>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div className="space-y-2">

              <Label>
                Username
              </Label>

              <Input
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
              />

            </div>

            <div className="space-y-2">

  <Label>Password</Label>

  <div className="relative">

    <Input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Enter Password"
      value={formData.password}
      onChange={handleChange}
      required
      className="pr-10"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
    >
      {showPassword ? (
        <EyeOff className="h-5 w-5" />
      ) : (
        <Eye className="h-5 w-5" />
      )}
    </button>

  </div>

</div>

            {error && (

              <Alert variant="destructive">

                <AlertDescription>
                  {error}
                </AlertDescription>

              </Alert>

            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>

          </form>

        </CardContent>

      </Card>

    </div>
  );
};

export default Login;