import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export const Login = () => {
  const { data: sessionData } = useSession();

  if (sessionData) {
    return (
      <>
        <div>Welcome {sessionData.user.name}</div>
        <Button onClick={() => void signOut()}> Logout</Button>
      </>
    );
  }
  if (!sessionData) {
    return (
      <>
        <Button onClick={() => void signIn("auth0")}> Login</Button>
      </>
    );
  }
};
