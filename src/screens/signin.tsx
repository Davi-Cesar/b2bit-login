import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLogin } from "@/hooks/useLogin";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { X } from "lucide-react";

import logo from "@/assets/logo.png";
import { SignInSchema } from "@/schemas/signInSchema";

export function SignIn() {
  useAuth();
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
  const [showError, setShowError] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <img src={logo} alt="b2bit logo" className="h-12" />
        </div>
        <div className=" mb-4 flex justify-center align-center">
          {error && showError && (
            <>
              <p className="text-sm p-2 text-red-500 ">{error}</p>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Fechar"
                onClick={() => setShowError(false)}
              >
                <X className="h-4 w-4 text-red-500 " />
              </Button>
            </>
          )}
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={async (values) => {
            try {
              const res = await login(values);
              if (res?.tokens?.access) {
                localStorage.setItem("token", res.tokens.access);

                navigate("/profile");
              }
              console.log("Login feito!", res);
            } catch {
              console.error("Falha no login");
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="email" className="text-sm font-semibold">
                  E-mail
                </Label>
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="@gmail.com"
                  className="mt-1"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  className="mt-1"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#002147] hover:bg-[#00152f] text-white flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
