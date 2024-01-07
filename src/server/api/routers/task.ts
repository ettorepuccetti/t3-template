import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const createTaskInput = z.object({
  name: z.string(),
});

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.task.findMany();
  }),

  create: protectedProcedure
    .input(createTaskInput)
    .mutation(({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          name: input.name,
          createdById: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const taskToDelete = await ctx.db.task.findUniqueOrThrow({
        where: {
          id: input,
        },
      });
      if (taskToDelete.createdById !== ctx.session.user.id) {
        throw new Error("You can only delete your own tasks");
      }
      return ctx.db.task.delete({
        where: {
          id: input,
        },
      });
    }),
});
