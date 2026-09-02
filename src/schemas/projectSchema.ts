import { z } from "zod"

export const projectSchema = z.object({
    name: z.string().min(3, "Name should be atleast 3 characters long"),
    description: z.string().min(10, "Description should be atleast 10 characters long"),
    status: z.enum(["active", "completed"])
})


export type projectForm = z.infer<typeof projectSchema>

