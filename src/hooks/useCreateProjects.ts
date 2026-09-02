
import { createProject } from "../api/ProjectsApi";
import { setNotification } from "../store/uiSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../store/hooks";

const useCreateProjects = () => {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch()

    const mutation = useMutation({
        mutationFn: createProject,
    });
  return mutation
}
  
export default useCreateProjects


