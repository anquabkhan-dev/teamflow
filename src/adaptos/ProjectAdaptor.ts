type ApiProject = {
  id: number;
  name: string;
};

export type ProjectViewModel = {
  id: number;
  title: string;
};

export const adaptProject = (
  project: ApiProject
): ProjectViewModel => {
  return {
    id: project.id,
    title: project.name,
  };
};