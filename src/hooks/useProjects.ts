import { getProjects } from "../api/ProjectsApi";
import { useQuery } from "@tanstack/react-query";
import { adaptProject } from "../adaptos/ProjectAdaptor";

const useProjects = (debouncedSearch: string, page: number) => {

    const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["projects", debouncedSearch, page],
    queryFn: async () =>{
        const projectData = await getProjects(debouncedSearch,page)
        return{
            ...projectData,
            projects: projectData.projects.map(project => adaptProject(project))
        }
    } ,
    placeholderData: (prevData) => prevData,
    staleTime: 10 * 1000,
    gcTime: 20 * 1000,
    });

    return { data, isLoading, isError, isFetching }
}

export default useProjects