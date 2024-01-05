import { AddTask } from "~/components/AddTask";
import { useMergedStoreContext } from "~/hooks/useStoreContext";
import { buildTrpcMutationMock, mountWithContext, session } from "./_constants";

function AddTaskContext({ nextTaskIndex = 1 }) {
  //data provider emulation
  useMergedStoreContext((store) => store.setAddTask)(
    buildTrpcMutationMock(cy.stub().as("addTask")),
  );

  //set next task index in store
  useMergedStoreContext((store) => store.setTaskNextIndex)(nextTaskIndex);

  return <AddTask />;
}

describe("Add Task", () => {
  beforeEach("mount with context", () => {
    mountWithContext(<AddTaskContext />, null);
  });
  it("show login hint", () => {
    cy.getByDataTest("login-hint-message").should("exist");
  });
});

describe("Add Task - logged user", () => {
  it("GIVEN component WHEN enter a task name and submit THEN should call addTask", () => {
    mountWithContext(<AddTaskContext />, session);
    cy.getByDataTest("add-task-input").type("new task");
    cy.getByDataTest("add-task-button").click();
    cy.get("@addTask").should("be.calledWith", { name: "new task" });
  });

  it("GIVEN next task index WHEN render THEN display the correct index", () => {
    mountWithContext(<AddTaskContext nextTaskIndex={3} />, session);
    cy.getByDataTest("next-task-index").should("have.text", "#3");
  });
});
