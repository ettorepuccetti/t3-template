import { mountWithContext } from "./_constants"
import { AddTask} from "~/components/AddTask"

describe("Add Task", () => {
  beforeEach("mount with context", () => {
    mountWithContext(<AddTask />, null)
  })
  it("show login hint", () => {
    cy.getByDataTest("login-hint-message").should("exist");
  })
})