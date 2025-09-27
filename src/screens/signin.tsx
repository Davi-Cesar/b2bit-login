import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLogin } from "@/hooks/useLogin";
import { Loader2 } from "lucide-react";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Obrigatório"),
  password: Yup.string().min(8, "Mínimo 8 caracteres").required("Obrigatório"),
});

export function SignIn() {
  const { login, loading, error } = useLogin();
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img src={logo} alt="b2bit logo" className="h-12" />
        </div>

        {/* Formik */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={async (values) => {
            try {
              const res = await login(values);
              console.log("Login feito!", res);
            } catch {
              console.error("Falha no login");
            }
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {/* E-mail */}
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

              {/* Password */}
              <div className="mb-6">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="**************"
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
                  "Entrar"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
