import { L0CKET_LOCK, L0CKET_STRINGS } from "/constants"
import { hasTimeLeft, isCorrect } from "/lib/solvingUtils"
import { Solver, SolverContext } from "/types"

const solve = (ctx: SolverContext) => {
  for (const k3y of L0CKET_STRINGS) {
    if (!hasTimeLeft) break

    ctx.args[L0CKET_LOCK] = k3y

    if (isCorrect(ctx)) break
  }

  return hasTimeLeft()
}

const L0CKET: Solver = {
  name: L0CKET_LOCK,
  solve: solve,
}

export default L0CKET
