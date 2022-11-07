import { schema } from "../../../components/ProjectModal";

import { router, protectedProcedure } from "../trpc";

export const projectsRouter = router({
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      where: { userId: ctx.session.user.id },
    });
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
