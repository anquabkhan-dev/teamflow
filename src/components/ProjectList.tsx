
import { useEffect, useState } from "react";
import { getProjects } from "../api/ProjectsApi";
import type { Project } from "../api/ProjectsApi";

// export const ProjectList = () => {
//   const [projects, setProjects] = useState<Project[]>([]);

//   useEffect(() => {
//     const loadProjects = async () => {
//       const response = await getProjects("", 1);
//       setProjects(response.projects);
//     };

//     loadProjects();
//   }, []);

//   return (
//     <div>
//       {projects.map((project) => (
//         <div key={project.id}>{project.name}</div>
//       ))}
//     </div>
//   );
// };


export const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await getProjects("", 1);
        setProjects(response.projects);
      } catch {
        setError("Failed to load projects");
      }
    };

    loadProjects();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}

      {projects.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
};