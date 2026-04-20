import React, { useState } from "react";
import { FileText, Lock, Mail } from "lucide-react";
import { authAPI } from "../../services/authAPI";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface AuthScreenProps {
  onLoginSuccess: (token: string) => void;
}

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      let data;
      if (isLogin) {
        data = await authAPI.login(email, password);
      } else {
        data = await authAPI.register(email, password);
      }

      // Save token to localStorage and update App state
      localStorage.setItem("token", data.token);
      onLoginSuccess(data.token);
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex p-3 bg-blue-100 rounded-2xl mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">
          {isLogin ? "Welcome back" : "Create an account"}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isLogin
            ? "Sign in to access your knowledge base"
            : "Start extracting answers from your documents"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10 border border-gray-100">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-4" />
              <Input
                type="email"
                placeholder="Email address"
                className="pl-11 py-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-4" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-11 py-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full py-3" isLoading={isLoading}>
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
