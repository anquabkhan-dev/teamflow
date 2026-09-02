import { describe,it,expect } from "vitest"
import { getFirst } from "./arrayUtils"





describe("Test the getfirst function from array utils", () =>{

    it("Check with a number array", () => {
        expect(getFirst([1,2,3])).toBe(1)
    })

    it("Check empty array", () => {
        expect(getFirst([])).toBeUndefined()
    })



})