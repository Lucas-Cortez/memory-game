"use client";

import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "components/Atoms/Input";
import { SignInButton } from "components/Atoms/Button/SignIn";
import { signIn } from "next-auth/react";
import { Errors } from "enum/errors";

const errorsMessages = {
  [Errors.INVALID_USERNAME]: "Nome ou apelido inválido",
  [Errors.APPLICATION_ERROR]: "Algo de errado aconteceu",
};

export function SignInForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
  }, []);

  const handleFormSubmission = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      if (!username) {
        setError(errorsMessages.invalid_username);
        return;
      }

      const response = await signIn("credentials", { username, redirect: false });

      console.log(response);

      if (!response || response.error) {
        setError(errorsMessages.application_error);
        return;
      }

      if (response.ok && !response.error) router.push("/game");
    },
    [router, username]
  );

  return (
    <form onSubmit={handleFormSubmission}>
      <Input value={username} onChange={handleUsernameChange} />
      <SignInButton type="submit">Entrar</SignInButton>
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
