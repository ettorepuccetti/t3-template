import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useMergedStoreContext } from "~/hooks/useStoreContext";

export function AddTask() {
  const { data: sessionData } = useSession();
  const taskNextIndex = useMergedStoreContext((store) => store.taskNextIndex);
  const [taskName, setTaskName] = useState<string>("");
  const addTask = useMergedStoreContext((store) => store.addTask);

  if (!addTask) return <div>loading...</div>;

  const onAddTask = (): void => {
    setTaskName("");
    addTask.mutate({ name: taskName });
  };

  return (
    <>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <div data-test="next-task-index">#{taskNextIndex}</div>
        <Input
          data-test="add-task-input"
          disabled={!sessionData}
          type="text"
          placeholder="new task"
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
        <div
          data-test="login-hint-message"
          className="mt-3 flex items-center gap-1 text-sm"
        >
          <LockClosedIcon /> you must login for creating a task
        </div>
      )}
    </>
  );
}
