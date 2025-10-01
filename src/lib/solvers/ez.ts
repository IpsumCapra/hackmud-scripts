import { hasTimeLeft, isCorrect } from "/lib/solvingUtils"
import { EZ_21, EZ_35, EZ_40, EZ_BASE, EZ_UNLOCK_WORDS } from "/constants"
import { Solver, SolverContext } from "/types"

const solve = (ctx: SolverContext) => {
  let keyword = EZ_21

  if (ctx.outputIncludes(EZ_35, false)) keyword = EZ_35
  if (ctx.outputIncludes(EZ_40, false)) keyword = EZ_40

  for (const word of EZ_UNLOCK_WORDS) {
    if (!hasTimeLeft) break

    ctx.args[keyword] = word

    if (isCorrect(ctx)) break
  }

  return hasTimeLeft()
}

const EZ: Solver = {
  name: EZ_BASE,
  solve: solve,
}

export default EZ
