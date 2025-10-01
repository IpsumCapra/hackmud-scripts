import { hasTimeLeft, isCorrect } from "../solvingUtils"
import { EZ_PRM } from "/constants"
import { Solver, SolverContext } from "/types"

const solve = (ctx: SolverContext) => {
  for (let i = 1; i <= 97; i += 2) {
    if (!hasTimeLeft()) break

    ctx.args[EZ_PRM] = i

    if (isCorrect(ctx)) break
  }

  return hasTimeLeft()
}

const EZ_PRIME: Solver = {
  name: EZ_PRM,
  solve: solve,
}

export default EZ_PRIME
