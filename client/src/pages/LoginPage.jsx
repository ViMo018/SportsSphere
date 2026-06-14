import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; import api from "../services/api";
import AuthForm from "../components/AuthForm";
import Toast from "../components/Toast";
function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
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

      localStorage.setItem("sportssphere_token", res.data.token);
      localStorage.setItem("sportssphere_user", JSON.stringify(res.data.data));

      setToast({
        type: "success",
        message: res.data.message || "Login successful",
      });

      setTimeout(() => {
        navigate(redirectPath);
      }, 700);
    } catch (err) {
      setToast({
        type: "error",
        message: err.response?.data?.message || "Login failed",
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
        onFooterClick={() => navigate("/register")}
      />
    </>
  );
}

export default LoginPage;