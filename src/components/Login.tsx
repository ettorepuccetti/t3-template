import { Button } from "@/components/ui/button";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { signIn, signOut, useSession } from "next-auth/react";

export const Login = () => {
  const { data: sessionData } = useSession();

  if (sessionData) {
    return (
      <div className="flex items-center gap-1">
        <div>
          Welcome <span className="font-bold">{sessionData.user.name}</span>
        </div>
        <Button
          className="h-8"
          variant={"outline"}
          onClick={() => void signOut()}
        >
          <ExitIcon />
        </Button>
      </div>
    );
  }
  if (!sessionData) {
    return (
      <>
        <Button
          className="h-8"
          variant={"outline"}
          onClick={() => void signIn("auth0")}
        >
          Login
          <EnterIcon className="ml-2" />
        </Button>
      </>
    );
  }
};
