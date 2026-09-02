import { describe,test,expect } from "vitest";
import { hasPermission } from "./Permissions";





describe("Test permissions", () => {

    test("admin has create permissions", () => {
        expect(hasPermission('admin', "CREATE_PROJECT")).toBe(true)
    })

    test("manager has create permissions", () => {
        expect(hasPermission('manager', "CREATE_PROJECT")).toBe(true)
    })

    test("developer has create permissions", () => {
        expect(hasPermission('developer', "CREATE_PROJECT")).toBe(false)
    })

})

