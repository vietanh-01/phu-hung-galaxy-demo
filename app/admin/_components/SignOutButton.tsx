'use client';

import { signOut } from "next-auth/react";
import { Button } from "./ui/Button";

export function SignOutButton() {
  return (
    <Button
      variant="destructive"
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      Sign Out
    </Button>
  );
} 