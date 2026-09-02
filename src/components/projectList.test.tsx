
import { describe, test, vi, expect } from "vitest";
import {render, screen } from "@testing-library/react"

import { ProjectList } from "./ProjectList";
import { getProjects } from "../api/ProjectsApi";
import "@testing-library/jest-dom";


vi.mock("../api/ProjectsApi", () => ({
    getProjects: vi.fn()
}))

describe("Test project list component", () => {

    vi.mocked(getProjects).mockResolvedValue({
    projects: [
        {   
            id: 1,
            name: "Project A",
            description: "blah",
            status: "active"
        }
    ],
    total: 1,
    page: 1,
    pageSize: 1
    })

    test("Test whether list rendres on ui", async ()=>{
        render(<ProjectList />)
        const listElement = await screen.findByText("Project A")
        expect(listElement).toBeInTheDocument()
        expect(getProjects).toHaveBeenCalledWith("",1)
    })

    test("test api failiure case", async () => {
        vi.mocked(getProjects).mockRejectedValue(new Error("Api failed"))
        render(<ProjectList />)
        const errorElement = await screen.findByText("Failed to load projects")
        expect(errorElement).toBeInTheDocument()
    })



})