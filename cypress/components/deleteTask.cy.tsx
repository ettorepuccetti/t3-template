import Task from "~/components/Task";
import { useMergedStoreContext } from "~/hooks/useStoreContext";
import { buildTrpcMutationMock, mountWithContext, session } from "./_constants";

function DeleteTaskContext(props: { id: number; userId: string }) {
  //data provider
  useMergedStoreContext((store) => store.setDeleteTask)(
    buildTrpcMutationMock(cy.stub().as("deleteTask")),
  );

  return <Task id={props.id} index={1} name="test" userId={props.userId} />;
}

describe("DeleteTaks", () => {
  it("GIVEN logged user WHEN press delete button THEN delete mutation invoked with correct id", () => {
    mountWithContext(<DeleteTaskContext id={1} userId="1" />, {
      ...session,
      user: { id: "1" },
    });
    cy.getByDataTest("delete-task-button").click();
    cy.get("@deleteTask").should("be.calledWith", 1);
  });

  it("GIVEN not logged user WHEN try to press delete button THEN button disabled", () => {
    mountWithContext(<DeleteTaskContext id={1} userId="1" />, null);
    cy.getByDataTest("delete-task-button").should("be.disabled");
  });
});
