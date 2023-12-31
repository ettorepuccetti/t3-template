import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { api } from "~/utils/api";

export function AddTask() {
  const [taskName, setTaskName] = useState<string>("");
  const taskQuery = api.task.getAll.useQuery();
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
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="text"
        placeholder="new item"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <Button type="submit" onClick={onAddTask}>
        Add
      </Button>
    </div>
  );
}
