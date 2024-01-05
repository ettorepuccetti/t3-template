import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useMergedStoreContext } from "~/hooks/useStoreContext";

export default function Task(props: {
  name: string;
  id: number;
  index: number;
  userId: string;
}) {
  const deleteTask = useMergedStoreContext((store) => store.deleteTask);
  const { data: session } = useSession();
  if (!deleteTask) return <div>loading...</div>;

  const onDelete = () => {
    deleteTask.mutate(props.id);
  };

  return (
    <div data-test="task-element" className="flex items-center gap-2 py-1">
      <Button
        data-test="delete-task-button"
        onClick={onDelete}
        variant={"outline"}
        className="h-6 w-8 p-2"
        disabled={session?.user?.id !== props.userId}
      >
        <TrashIcon />
      </Button>
      <div key={props.id}>
        {props.index + 1}. {props.name}
      </div>
    </div>
  );
}
