/* eslint-disable @typescript-eslint/unbound-method */
import { type Task } from "@prisma/client";
import { type Session } from "next-auth";
import { describe, expect, it } from "vitest";
import prisma from "~/server/__mocks__/db";
import { appRouter } from "~/server/api/root";

// deep mocked in ~/server/__mocks__/db.ts
// vi.mock("~/server/db");

describe("trpc test", () => {
  it("GIVEN list of task WHEN getAll task THEN list returned", async () => {
    // given
    const expectedTasks: Task[] = [
      {
        id: 1,
        name: "test",
        createdById: "user1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "test2",
        createdById: "user1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    prisma.task.findMany.mockResolvedValue(expectedTasks);
    const caller = appRouter.createCaller({ session: null, db: prisma });

    // when
    const actualTasks = await caller.task.getAll();

    // then
    expect(actualTasks).toStrictEqual(expectedTasks);
  });

  it("GIVEN logged user WHEN create task THEN prisma create invoked", async () => {
    // given
    const session: Session = {
      expires: "",
      user: { id: "user1", name: "test", email: "" },
    };
    const caller = appRouter.createCaller({ session: session, db: prisma });

    // when
    await caller.task.create({ name: "testTask" });

    // then
    expect(prisma.task.create).toHaveBeenCalledWith({
      data: { createdById: "user1", name: "testTask" },
    });
  });

  it("GIVEN not logged user WHEN create task THEN error", async () => {
    // given
    const caller = appRouter.createCaller({ session: null, db: prisma });

    // when
    const result = caller.task.create({ name: "testTask" });

    // then
    await expect(result).rejects.toThrow("UNAUTHORIZED");
  });

  it("GIVEN task and logged user WHEN delete own task THEN prisma delete invoked", async () => {
    // given
    const session: Session = {
      expires: "",
      user: { id: "user1", name: "test", email: "" },
    };
    const caller = appRouter.createCaller({ session: session, db: prisma });
    prisma.task.findUniqueOrThrow.mockResolvedValue({
      id: 1,
      name: "testTask",
      createdById: "user1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // when
    await caller.task.delete(1);

    // then
    expect(prisma.task.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it("GIVEN task and logged user WHEN delete other's task THEN error", async () => {
    // given
    const session: Session = {
      expires: "",
      user: { id: "user2", name: "distracted", email: "" },
    };
    const caller = appRouter.createCaller({ session: session, db: prisma });
    prisma.task.findUniqueOrThrow.mockResolvedValue({
      id: 1,
      name: "testTask",
      createdById: "user1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // when
    const result = caller.task.delete(1);

    // then
    await expect(result).rejects.toThrow("You can only delete your own tasks");
  });
});
