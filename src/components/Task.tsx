import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { api } from "~/utils/api";

export default function Task(props: {
  name: string;
  id: number;
  index: number;
}) {
  const taskQuery = api.task.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const deleteTask = api.task.delete.useMutation({
    onSuccess: async () => {
      await taskQuery.refetch();
    },
  });

  function onDelete() {
    deleteTask.mutate(props.id);
  }

  return (
    <div data-test="task-element" className="flex items-center gap-2 py-1">
      <Button
        data-test="delete-task-button"
        onClick={onDelete}
        variant={"outline"}
        className="h-6 w-8 p-2"
      >
        <TrashIcon />
      </Button>
      <div key={props.id}>
        {props.index + 1}. {props.name}
      </div>
    </div>
  );
}
