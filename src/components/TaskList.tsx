import { useEffect } from "react";
import { useMergedStoreContext } from "~/hooks/useStoreContext";
import Task from "./Task";

export const TaskList = () => {
  const taskQuery = useMergedStoreContext((store) => store.taskQuery);
  const setTaskNextIndex = useMergedStoreContext(
    (store) => store.setTaskNextIndex,
  );

  // setting the index for the next task in the store
  useEffect(() => {
    if (!taskQuery || !taskQuery.data) {
      return;
    }
    setTaskNextIndex(taskQuery.data.length + 1);
  }, [taskQuery, taskQuery?.data]);

  if (!taskQuery) return <div>loading...</div>;

  if (taskQuery.isLoading) {
    return <div>Loading data...</div>;
  }

  if (taskQuery.isError) {
    return <div>Error</div>;
  }

  return (
    <div className="my-4 flex max-h-[50vh] min-h-[25vh] flex-col items-start overflow-scroll px-8">
      {taskQuery.data?.map((task, index) => (
        <Task
          name={task.name}
          id={task.id}
          index={index}
          key={index}
          userId={task.createdById}
        />
      ))}
    </div>
  );
};
