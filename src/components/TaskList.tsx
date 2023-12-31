import { api } from "~/utils/api";

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
    <div className="my-4 flex h-[60vh] flex-col items-start overflow-scroll">
      {taskQuery.data?.map((task, index) => (
        <div key={task.id}>
          {index + 1}. {task.name}
        </div>
      ))}
    </div>
  );
};
