import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; import api from "../services/api";
import AuthForm from "../components/AuthForm";
import Toast from "../components/Toast";

function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/sports/cricket";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Vishva",
    },
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
      placeholder: "At least 6 characters",
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

      const res = await api.post("/api/auth/register", formData);

      localStorage.setItem("sportssphere_token", res.data.token);
      localStorage.setItem("sportssphere_user", JSON.stringify(res.data.data));

      setToast({
        type: "success",
        message: res.data.message || "Registration successful",
      });

      setTimeout(() => {
        navigate(redirectPath);
      }, 700);
    } catch (err) {
      setToast({
        type: "error",
        message: err.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      <AuthForm
        title="Create your account"
        buttonText="Register"
        fields={fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
        footerText="Already have an account?"
        footerLinkText="Login"
        onFooterClick={() => navigate("/login")}
      />
    </>
  );
}

export default RegisterPage;