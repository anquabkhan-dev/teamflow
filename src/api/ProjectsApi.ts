import api from "./axios.ts"
import { QueryClient } from "@tanstack/react-query";
import {type projectForm} from "../schemas/projectSchema.ts"



export interface BaseEntity {
    readonly id: number;
}

const projectStatuses = ["active","completed"] as const

export type projectStatus = typeof projectStatuses[number]


export interface Project extends BaseEntity{
    name: string;
    description: string;
    status: projectStatus
};

export type PaginatedResponse<T> = {
    projects: T[],
    total: number,
    page: number,
    pageSize: number
}

export type CreateProjectInput = Omit<Project, "id">

export type UpdateProjectInput = Partial<CreateProjectInput>

export type ProjectSummary = Pick<Project, "id"|"name">


const projects = [
  { id: 1, name: "Project A" },
  { id: 2, name: "Project B" },
  { id: 3, name: "Project C" },
  { id: 4, name: "Project D" },
  { id: 5, name: "Project E" },
];

export const getProjects = async (search: String,page: number): Promise<PaginatedResponse<Project>> => {
      console.log("inside getProjects")
      const response = await api.get<PaginatedResponse<Project>>("/projects", {
        params:{
            search: search,
            page: page
        }
      });

      return response.data;

    // console.log("getProjects function called")
    // return [...sampleMockData];
};

export const queryClient = new QueryClient();

export const createProject = async (project: CreateProjectInput) => {
//     const newProject = {
//     id: Date.now(),
//     name: project.name,
//   };

  const response = await api.post<Project>("/projects", project)

//   sampleMockData.push(newProject);
  console.log(response)

  return response.data;
}