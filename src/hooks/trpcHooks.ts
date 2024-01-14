import { api } from "~/utils/api";

//------------------------------
//------- QUERIES HOOKS --------
//------------------------------

export const useTaskQuery = () => {
  return api.task.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
};

//-------------------------------
//------- MUTATION HOOKS --------
//-------------------------------

export const useAddTask = () => {
  const taskQuery = useTaskQuery();

  return api.task.create.useMutation({
    onSuccess: async () => {
      await taskQuery.refetch();
    },
  });
};

export const useDeleteTask = () => {
  const taskQuery = useTaskQuery();

  return api.task.delete.useMutation({
    onSuccess: async () => {
      await taskQuery.refetch();
    },
  });
};
