import { router } from "../trpc";
import { authRouter } from "./auth";
import { projectsRouter } from "./projects";
import { tasksRouter } from "./tasks";

export const appRouter = router({
  projects: projectsRouter,
  tasks: tasksRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
