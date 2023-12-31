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
    <div className="flex flex-col items-center">
      {taskQuery.data?.map((task) => <div key={task.id}>{task.name}</div>)}
    </div>
  );
};
