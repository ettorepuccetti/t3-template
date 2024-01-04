import { useEffect } from "react";
import { useAddTask, useDeleteTask, useTaskQuery } from "~/hooks/trpcHooks";
import { useMergedStoreContext } from "~/hooks/useStoreContext";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const taskQuery = useTaskQuery();
  const setTaskQuery = useMergedStoreContext((store) => store.setTaskQuery);

  const addTask = useAddTask();
  const setAddTask = useMergedStoreContext((store) => store.setAddTask);

  const deleteTask = useDeleteTask();
  const setDeleteTask = useMergedStoreContext((store) => store.setDeleteTask);

  useEffect(() => {
    setTaskQuery(taskQuery);
    setAddTask(addTask);
    setDeleteTask(deleteTask);
  }, [taskQuery, addTask, deleteTask]); 

  return <>{children}</>;
};
