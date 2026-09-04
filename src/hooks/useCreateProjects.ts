
import { createProject } from "../api/ProjectsApi";
import { useMutation } from "@tanstack/react-query";

const useCreateProjects = () => {

    const mutation = useMutation({
        mutationFn: createProject,
    });
  return mutation
}
  
export default useCreateProjects


