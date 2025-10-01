import { hasTimeLeft, isCorrect } from "/lib/solvingUtils"
import {
  C001,
  C002,
  C002_COMPLEMENT,
  C003,
  C003_TRIAD_1,
  C003_TRIAD_2,
  C00X_BASE,
  C00X_COLORS,
  COLOR_DIGIT,
} from "/constants"
import { Solver, SolverContext } from "/types"

const solve = (ctx: SolverContext) => {
  let keyword = C001

  if (ctx.outputIncludes(C002, false)) keyword = C002
  if (ctx.outputIncludes(C003, false)) keyword = C003

  for (let i = 0; i < C00X_COLORS.length; i++) {
    if (!hasTimeLeft) break

    ctx.args[keyword] = C00X_COLORS[i]

    switch (keyword) {
      case C002:
        ctx.args[C002_COMPLEMENT] = C00X_COLORS[(i + 4) % C00X_COLORS.length]
        break
      case C003:
        ctx.args[C003_TRIAD_1] = C00X_COLORS[(i + 3) % C00X_COLORS.length]
        ctx.args[C003_TRIAD_2] = C00X_COLORS[(i + 5) % C00X_COLORS.length]
        break
      default:
        ctx.args[COLOR_DIGIT] = (ctx.args[keyword] as string).length
    }

    if (isCorrect(ctx)) break
  }

  return hasTimeLeft()
}

const C00X: Solver = {
  name: C00X_BASE,
  solve: solve,
}

export default C00X
