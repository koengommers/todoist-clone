import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, protectedProcedure } from "../trpc";
import { schema } from "../../../components/TaskAdder";

export const tasksRouter = router({
  add: protectedProcedure
    .input(schema.extend({ projectId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.prisma.task.create({
        data: {
          name: input.name,
          description: input.description,
          userId: ctx.session.user.id,
          projectId: input.projectId,
        },
      });
      return project;
    }),
  complete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.prisma.task.findUnique({
        where: { id: input },
      });

      if (!task || task.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await ctx.prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          completedAt: new Date(),
        },
      });
    }),
});
