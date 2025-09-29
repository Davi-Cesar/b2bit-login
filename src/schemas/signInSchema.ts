import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  password: Yup.string()
    .min(8, "Mínimo 8 caracteres")
    .required("Campo obrigatório"),
});
