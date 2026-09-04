import { useEffect, useState } from "react";
import { hasPermission, type Role } from "../../auth/Permissions";
import { useAuth } from "../../auth/AuthContext";
import {  useQueryClient } from "@tanstack/react-query";
import { type projectForm, projectSchema } from "../../schemas/projectSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setNotification } from "../../store/uiSlice";
import { useAppDispatch } from "../../store/hooks";
import useProjects  from "../../hooks/useProjects"
import useCreateProjects from "../../hooks/useCreateProjects";

const Projects = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page,setPage] = useState(1)
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch()
  const { data, isLoading, isError, isFetching } = useProjects(debouncedSearch, page)

  const hasNextPage = data && page*data.pageSize < data.total;
  const mutation = useCreateProjects()

  // const mutation = useMutation({
  //   mutationFn: createProject,
  //   onSuccess: (newProject) => {
  //     console.log("Proects created",newProject)
  //     queryClient.invalidateQueries({ queryKey: ["projects"] });
  //     dispatch(setNotification("Project Created Succesfully!!!"))
  //     reset();
  //   },
  // });



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<projectForm>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = (data: projectForm) => {
    console.log(data);
    mutation.mutate(data,{
      onSuccess: (newProject) => {
      console.log("Proects created",newProject)
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      dispatch(setNotification("Project Created Succesfully!!!"))
      reset();
    },
    });
  };

  useEffect(() => {
    console.log("search:", search);
    let timeoutId = setTimeout(() => {
      console.log("debounced search", debouncedSearch);
      setDebouncedSearch(search);
      setPage(1)
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Error loading page...</h1>;

  console.log(data)

  return (
    <div>
      <h1>Projects</h1>

      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search projects ..."
      />

      {hasPermission(user?.role as Role, "CREATE_PROJECT") && (
        // <button onClick={() => mutation.mutate({name: "Project C"})}>Create</button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>name</label>
            <input {...register("name")} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <label>description</label>
            <textarea {...register("description")} />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
          <div>
            <label>status</label>
            <select {...register("status")}>
              <option value="">Select status</option>
              <option value="active">active</option>
              <option value="completed">completed</option>
            </select>
            {errors.status && errors.status.message}
          </div>
          <button type="submit">
            {mutation.isPending ? "creating project..." : "Submit"}
          </button>
          {mutation.isError && <p>Failed to create project please try again</p>}
          {mutation.isSuccess && <p>Project created succesfully.</p>}
        </form>
      )}

      {hasPermission(user?.role as Role, "EDIT_PROJECT") && (
        <button>Edit</button>
      )}

      {hasPermission(user?.role as Role, "DELETE_PROJECT") && (
        <button>Delete</button>
      )}

      {data?.projects?.map((project) => (
        <p key={project.id}>{project.title}</p>
      ))}

      {
        isFetching && <p>Data is fetching...</p>
      }
      <div>
        <button  disabled={page == 1}  onClick={() => setPage(prev => {
          return prev == 1 ? 1 : prev-1
        })}>prev</button>
        <p>{page}</p>
        <button  disabled={!hasNextPage}  onClick={() => setPage(prev => prev+1)}>next</button>
      </div>

      <p>Search: {search}</p>
      <p>DebouncedSearch: {debouncedSearch}</p>
    </div>
  );
};

export default Projects;
