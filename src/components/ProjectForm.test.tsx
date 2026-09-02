import { describe, test, expect, vi } from "vitest";
import {render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";

type ProjectFormProps = {
  onSubmit: (name: string) => void;
};

const ProjectForm = ({ onSubmit }: ProjectFormProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    onSubmit(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Project name</label>

      <input id="name" name="name" />

      <button type="submit">Create Project</button>
    </form>
  );
};

describe("test form submission", () => {

    test("submits the project name entered by the user", async () => {
        const user = userEvent.setup()
        const onSubmit = vi.fn()

        render(<ProjectForm  onSubmit={onSubmit}/>)

        const inputElem = screen.getByRole("textbox", {name: "Project name"})
        await user.type(inputElem, "TeamFlow")

        const buttonElem = screen.getByRole("button", {name: "Create Project"});

        await user.click(buttonElem)

        expect(onSubmit).toHaveBeenCalledWith("TeamFlow")
    })


})






