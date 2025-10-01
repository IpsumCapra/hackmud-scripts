import { DATA_CHECK_LOCK } from "/constants"
import { Solver, SolverContext } from "/types"

const check = (query: string): string =>
  $fs.lore.data_check({ lookup: query }).answer

const solve = (ctx: SolverContext) => {
  // Determine the queries.
  ctx.args[DATA_CHECK_LOCK] = ""
  ctx.call()

  // Fill in the values.
  ctx.args[DATA_CHECK_LOCK] =
    check(ctx.output[0]) + check(ctx.output[1]) + check(ctx.output[2])
  ctx.call()

  return true
}

const DATA_CHECK: Solver = {
  name: DATA_CHECK_LOCK,
  solve: solve,
}

export default DATA_CHECK
