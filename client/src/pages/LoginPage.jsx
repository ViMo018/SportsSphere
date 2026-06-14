import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import AuthForm from "../components/AuthForm";
import Toast from "../components/Toast";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, isLoggedIn } = useAuth();

  const redirectPath = location.state?.from || "/sports/cricket";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "vishva@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectPath);
    }
  }, [isLoggedIn, navigate, redirectPath]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/api/auth/login", formData);

      login(res.data.data, res.data.token);

      setToast({
        type: "success",
        message: res.data.message || "Login successful",
      });

      navigate(redirectPath);
    } catch (err) {
      setToast({
        type: "error",
        message: err.response?.data?.message || "Unable to login",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      <AuthForm
        title="Welcome back"
        buttonText="Login"
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        footerText="New to SportsSphere?"
        footerLinkText="Create account"
        onFooterClick={() => navigate("/register", { state: location.state })}
      />
    </>
  );
}

export default LoginPage;