import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

export function AddTask() {
  const { data: sessionData } = useSession();
  const [taskName, setTaskName] = useState<string>("");
  const taskQuery = api.task.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const addTask = api.task.create.useMutation({
    onSuccess: async () => {
      await taskQuery.refetch();
    },
  });

  const onAddTask = (): void => {
    setTaskName("");
    addTask.mutate({ name: taskName });
  };

  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          data-test="add-task-input"
          disabled={!sessionData}
          type="text"
          placeholder="new item"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onAddTask();
            }
          }}
        />
        <Button
          data-test="add-task-button"
          type="submit"
          onClick={onAddTask}
          disabled={!sessionData}
        >
          Add
        </Button>
      </div>
      {!sessionData && (
        <div data-test="login-hint-message" className="mt-3 flex items-center gap-1 text-sm">
          <LockClosedIcon /> you must login for creating a task
        </div>
      )}
    </div>
  );
}
