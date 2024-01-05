import Task from "~/components/Task";
import { useMergedStoreContext } from "~/hooks/useStoreContext";
import { buildTrpcMutationMock, mountWithContext } from "./_constants";

function DeleteTaskContext(props: { id: number }) {
  //data provider
  useMergedStoreContext((store) => store.setDeleteTask)(
    buildTrpcMutationMock(cy.stub().as("deleteTask")),
  );

  return <Task id={props.id} index={1} name="test" />;
}

describe("DeleteTaks", () => {
  it("GIVEN component WHEN press delete button THEN delete mutation invoked with correct id", () => {
    mountWithContext(<DeleteTaskContext id={1} />, null);
    cy.getByDataTest("delete-task-button").click();
    cy.get("@deleteTask").should("be.calledWith", 1);
  });
});
