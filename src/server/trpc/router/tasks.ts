import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, protectedProcedure } from "../trpc";

const schema = z.object({
  name: z.string().min(1).max(180),
  description: z.string().nullable(),
  projectId: z.string(),
});

export const tasksRouter = router({
  add: protectedProcedure.input(schema).mutation(async ({ ctx, input }) => {
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
