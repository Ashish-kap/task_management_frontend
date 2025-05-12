import { loginSchema, registerSchema } from "@/schemas/auth";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthTabs } from "@/components/auth/auth-tabs";
import { AuthForm } from "@/components/auth/auth-form";
import { useAuthForm } from "@/hooks/use-auth";

type LoginType = { username: string; password: string };

type RegisterType = {
  username: string;
  password: string;
  confirmPassword: string;
};

const Login = () => {
  const navigate = useNavigate();
  const loginForm = useAuthForm(loginSchema);
  const registerForm = useAuthForm(registerSchema);

  const handleAuthAction = async (
    action: "login" | "register",
    values: LoginType | RegisterType
  ) => {
    try {
      const credentials =
        action === "register"
          ? { username: values.username, password: values.password }
          : values;

      const data = await authService[action](credentials);

      useAuthStore
        .getState()
        [action]({ id: data.id, username: data.username }, data.token);

      navigate("/");
    } catch (error) {
      const form = action === "login" ? loginForm : registerForm;
      form.setError("root", {
        message:
          action === "login" ? "Invalid credentials" : "Registration failed",
      });
    }
  };

  return (
    <AuthCard title="Welcome to Task Manager">
      <AuthTabs
        defaultValue="login"
        tabs={[
          {
            value: "login",
            label: "Login",
            content: (
              <AuthForm
                form={loginForm}
                onSubmit={(values: LoginType) =>
                  handleAuthAction("login", values)
                }
                fields={[
                  { name: "username", label: "Username" },
                  { name: "password", label: "Password", type: "password" },
                ]}
                error={loginForm.formState.errors.root?.message}
                submitText="Login"
              />
            ),
          },
          {
            value: "register",
            label: "Register",
            content: (
              <AuthForm
                form={registerForm}
                onSubmit={(values: RegisterType) =>
                  handleAuthAction("register", values)
                }
                fields={[
                  { name: "username", label: "Username" },
                  { name: "password", label: "Password", type: "password" },
                  {
                    name: "confirmPassword",
                    label: "Confirm Password",
                    type: "password",
                  },
                ]}
                error={registerForm.formState.errors.root?.message}
                submitText="Register"
              />
            ),
          },
        ]}
      />
    </AuthCard>
  );
};

export default Login;
