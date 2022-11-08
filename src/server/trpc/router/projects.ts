import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { schema } from "../../../components/ProjectModal";

import { router, protectedProcedure } from "../trpc";

export const projectsRouter = router({
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      where: { userId: ctx.session.user.id },
    });
  }),
  get: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const project = await ctx.prisma.project.findUnique({
        where: { id: input.projectId },
      });

      if (!project || (project.userId !== ctx.session.user.id)) {
        throw new TRPCError({ code: "NOT_FOUND" })
      }

      return project
    }),
  add: protectedProcedure.input(schema).mutation(async ({ ctx, input }) => {
    const project = await ctx.prisma.project.create({
      data: {
        name: input.name,
        userId: ctx.session.user.id,
      },
    });
    console.log(project);
    return project;
  }),
});
