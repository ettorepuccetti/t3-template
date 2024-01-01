import { api } from "~/utils/api";
import Task from "./Task";

export const TaskList = () => {
  const taskQuery = api.task.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  if (taskQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (taskQuery.isError) {
    return <div>Error</div>;
  }

  return (
    <div className="my-4 flex max-h-[50vh] min-h-[25vh] flex-col items-start overflow-scroll px-8">
      {taskQuery.data?.map((task, index) => (
        <Task name={task.name} id={task.id} index={index} />
      ))}
    </div>
  );
};
