"use client";

import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";
import { useSession } from "next-auth/react";

type SaveStatusButtonProps = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "onClick"
>;

export function SaveStatusButton({ children, ...other }: SaveStatusButtonProps) {
  const { data } = useSession();

  const onSaveClick = async () => {
    const itWon = Math.random() > 0.5;

    console.log({ ...data?.user, itWon });

    if (data?.user) {
      const response = await fetch(`/api/game/${data.user.id}`, {
        method: "POST",
        body: JSON.stringify({ itWon }),
      });

      console.log(await response.json());
    }
  };

  return (
    <button {...other} onClick={onSaveClick}>
      Save
    </button>
  );
}
