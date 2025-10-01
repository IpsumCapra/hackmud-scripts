// @seclevel MIDSEC
//
// @autocomplete t:#s.the.target

import { NO_HARDLINE, TARGET_HACKED } from "/constants"
import { isRecord } from "/lib/isRecord"
import C00X from "/lib/solvers/c00x"
import CON_SPEC from "/lib/solvers/con_spec"
import DATA_CHECK from "/lib/solvers/data_check"
import EZ from "/lib/solvers/ez"
import EZ_DIGIT from "/lib/solvers/ez_digit"
import EZ_PRIME from "/lib/solvers/ez_prime"
import GLOCK from "/lib/solvers/glock"
import L0CKET from "/lib/solvers/l0cket"
import MAGNARA from "/lib/solvers/magnara"
import { generateContext, hasTimeLeft } from "/lib/solvingUtils"
import { SolverArguments, SolverConfig } from "/types"

export default (context: Context, args?: unknown) => {
  const solvers = [
    EZ,
    EZ_DIGIT,
    EZ_PRIME,
    C00X,
    L0CKET,
    DATA_CHECK,
    GLOCK,
    MAGNARA,
    CON_SPEC,
  ]
  const lib = $fs.scripts.lib()

  const ctx = generateContext(args)
  let success = false
  let override = false

  let config: SolverConfig | null = null

  // Check if context generation was succesful.
  if ("ok" in ctx) return ctx

  // Preload arguments given to function. If not available, try to load them from DB.
  if (isRecord(args)) {
    if (lib.is_obj(args.a)) {
      ctx.args = args.a as SolverArguments
    } else {
      // Attempt to load from DB.
      config = $db
        .f({ type: "ph_cnf" })
        .first() as unknown as SolverConfig | null

      if (config !== null) {
        if (config.loc === args.db) {
          ctx.args = config.args as SolverArguments
        }
      }
    }
  }

  ctx.call()

  // Check if a valid script was targeted.
  if (lib.is_obj(ctx.rawOutput)) return { ok: false, msg: ctx.logger.log }

  // Break the target.
  while (hasTimeLeft() && !override) {
    if (ctx.outputIncludes(TARGET_HACKED, false)) {
      success = true
      break
    }

    if (ctx.outputIncludes(NO_HARDLINE, false)) {
      ctx.logger.write("No hardline")
      break
    }

    ctx.call()

    let detectedLock = false

    for (const solver of solvers) {
      if (!hasTimeLeft) break

      if (ctx.outputIncludes(solver.name, false)) {
        detectedLock = true
        if (!solver.solve(ctx)) {
          override = true
          ctx.logger.write(`${solver.name} solve failed.`)
        }
        break
      }
    }

    if (!detectedLock) {
      ctx.logger.write("Can't find lock")
      break
    }
  }

  if (!hasTimeLeft) ctx.logger.write("Out of time!")

  if (config !== null) {
    // Save the current porthack configuration so porthack can pick up where it left off if called with the same loc.
    $db.us(
      { type: "ph_cnf" },
      {
        $set: {
          loc: config.loc,
          args: ctx.args as Record<string, string | number>,
        },
      },
    )
  }

  return {
    ok: success,
    msg: `\`5args:\`\n\`1${JSON.stringify(ctx.args)}\`\n\`5log:\`\n${ctx.logger.log}`,
  }
}
