import express from "express";
import cors from "cors";
import { authenticate, authorize } from "./auth.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://your-vercel-app.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const users = {
    "admin@test.com": {
      id: "1",
      name: "Anquab",
      role: "admin",
      accessToken: "mock-expired-token",
    },
    "manager@test.com": {
      id: "2",
      name: "Manager User",
      role: "manager",
      accessToken: "mock-manager-token",
    },
    "developer@test.com": {
      id: "3",
      name: "Developer User",
      role: "developer",
      accessToken: "mock-developer-token",
    },
  };

  const user = users[email];

  if (!user || password !== "123456") {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  return res.json({
    accessToken: user.accessToken,
    refreshToken: "mock-refresh-token",
    user: {
      id: user.id,
      name: user.name,
      role: user.role,
    },
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

const projects = [
  {
    id: 1,
    name: "Project A",
    description: "First TeamFlow project",
    status: "active",
  },
  {
    id: 2,
    name: "Project B",
    description: "Second TeamFlow project",
    status: "completed",
  },
  {
    id: 3,
    name: "Project C",
    description: "Third TeamFlow project",
    status: "active",
  },
  {
    id: 4,
    name: "Project D",
    description: "Fourth TeamFlow project",
    status: "completed",
  },
  {
    id: 5,
    name: "Project E",
    description: "Fifth TeamFlow project",
    status: "active",
  },
];

app.get("/projects", authenticate, (req, res) => {
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;

  const pageSize = 2;

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * pageSize;

  const paginatedProjects = filteredProjects.slice(
    start,
    start + pageSize
  );

  res.json({
    projects: paginatedProjects,
    total: filteredProjects.length,
    page,
    pageSize,
  });
});

const port = process.env.port || 3000

app.listen(port, () => {
  console.log("Server running on http://localhost:3000");
});




app.post(
  "/projects",
  authenticate,
  authorize("admin", "manager"),
  (req, res) => {
    const { name, description, status } = req.body;

    const newProject = {
      id: Date.now(),
      name,
      description,
      status,
    };

    projects.push(newProject);

    res.status(201).json(newProject);
  }
);


app.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken !== "mock-refresh-token") {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }

  return res.json({
    accessToken: "mock-admin-token",
  });
});