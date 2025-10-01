import { hasTimeLeft, isCorrect } from "../solvingUtils"
import { EZ_DGT } from "/constants"
import { Solver, SolverContext } from "/types"

const solve = (ctx: SolverContext) => {
  for (let i = 0; i < 10; i++) {
    if (!hasTimeLeft()) break

    ctx.args[EZ_DGT] = i

    if (isCorrect(ctx)) break
  }

  return hasTimeLeft()
}

const EZ_DIGIT: Solver = {
  name: EZ_DGT,
  solve: solve,
}

export default EZ_DIGIT
