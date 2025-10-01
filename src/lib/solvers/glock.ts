import { SN_W_GLOCK } from "/constants"
import { Solver, SolverContext } from "/types"

const solve = (ctx: SolverContext) => {
  const balance = $hs.accts.balance()
  $ms.accts.xfer_gc_to({ to: "otacon", amount: balance })

  ctx.args[SN_W_GLOCK] = ""
  ctx.call()

  $ms.otacon.glock({ g: ctx.output[0] })

  ctx.call()

  return true
}

const GLOCK: Solver = {
  name: SN_W_GLOCK,
  solve: solve,
}

export default GLOCK
