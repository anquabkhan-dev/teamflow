import { describe, expect, test } from "vitest";
import { screen, render } from "@testing-library/react";
import { Can } from "./Can";
import "@testing-library/jest-dom";

describe("Test the can component to see if button is displayed on right permission", () => {

    test("test for admin",() => {
        render(
            <Can role="admin" permission="CREATE_PROJECT">
                <button>Create Project</button>
            </Can>
        )

        expect(screen.getByRole("button",{name: "Create Project"})).toBeInTheDocument();
    });

    test("test for manager",() => {
        render(
            <Can role="manager" permission="CREATE_PROJECT">
                <button>Create Project</button>
            </Can>
        )

        expect(screen.getByRole("button",{name: "Create Project"})).toBeInTheDocument();
    });

    test("test for developer",() => {
        render(
            <Can role="developer" permission="CREATE_PROJECT">
                <button>Create Project</button>
            </Can>
        )

        expect(screen.queryByRole("button",{name: "Create Project"})).not.toBeInTheDocument();
    });




})

