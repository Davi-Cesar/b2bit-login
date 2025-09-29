// src/components/SignIn.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useLogin } from "@/hooks/useLogin";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { SignIn } from "@/screens/signin";

interface LoginData {
  email: string;
  password: string;
}

jest.mock("@/hooks/useLogin");
const mockedUseLogin = useLogin as jest.Mock;

const loginMock = jest.fn() as jest.MockedFunction<
  (data: LoginData) => Promise<{ tokens: { access: string } }>
>;

describe("<SignIn />", () => {
  beforeEach(() => {
    mockedUseLogin.mockReturnValue({
      login: loginMock,
      loading: false,
      error: null,
    });
  });

  function renderComponent() {
    return render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
  }

  it("renderiza o formulário corretamente", () => {
    renderComponent();
    expect(screen.getByLabelText(/e-mail/i)).toBeInstanceOf(HTMLInputElement);
    expect(screen.getByLabelText(/password/i)).toBeInstanceOf(HTMLInputElement);
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInstanceOf(
      HTMLInputElement
    );
  });

  it("mostra erro de validação se email estiver vazio", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/campo obrigatório/i)).toBeInstanceOf(
      HTMLInputElement
    );
  });

  it("mostra erro de validação se email for inválido", async () => {
    renderComponent();
    const emailInput = screen.getByLabelText(/e-mail/i);

    await userEvent.type(emailInput, "emailinvalido");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText(/e-mail inválido/i)).toBeInstanceOf(
      HTMLInputElement
    );
  });

  it("mostra erro de validação se password estiver vazio", async () => {
    renderComponent();
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    const erros = await screen.findAllByText(/campo obrigatório/i);
    expect(erros).toHaveLength(2);
  });

  it("exibe mensagem de erro do hook useLogin", async () => {
    mockedUseLogin.mockReturnValue({
      login: loginMock,
      loading: false,
      error: "Erro no login",
    });

    renderComponent();

    expect(screen.getByText(/erro no login/i)).toBeInstanceOf(HTMLInputElement);
  });
});
