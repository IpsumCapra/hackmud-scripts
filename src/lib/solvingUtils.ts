import { isRecord } from "/lib/isRecord"
import { GRACE_PERIOD_MS, VALUE_INCORRECT } from "/constants"
import { SolverContext, SolverLogger } from "/types"
import { isScriptor } from "/lib/isScriptor"

export const generateContext = (
  args: unknown,
): SolverContext | ScriptFailure => {
  try {
    if (isRecord(args)) {
      if (isScriptor(args.t)) {
        const logger: SolverLogger = {
          log: "",
          write(log) {
            logger.log += `\`0${log}\`\n`
          },
        }
        const ctx: SolverContext = {
          args: {},
          call() {
            ctx.rawOutput = (args.t as Scriptor).call(ctx.args) as
              | string
              | ScriptFailure

            if ($fs.scripts.lib().is_obj(ctx.rawOutput)) {
              ctx.output = []
              ctx.logger.write(
                `Invalid Output - ${(ctx.rawOutput as ScriptFailure).msg}`,
              )
            } else {
              ctx.output = (ctx.rawOutput as string).split("\n")
            }
          },
          outputIncludes(str, call = true) {
            if (call) ctx.call()
            return ctx.output[ctx.output.length - 1].includes(str)
          },
          rawOutput: "",
          output: [],
          logger,
        }

        return ctx
      } else {
        throw new Error("Invalid target type")
      }
    } else {
      throw new Error("Target not specified")
    }
  } catch (e) {
    return { ok: false, msg: (e as Error).message }
  }
}

export const isCorrect = (ctx: SolverContext, call: boolean = true) => {
  return !ctx.outputIncludes(VALUE_INCORRECT, call)
}

export const hasTimeLeft = () =>
  Date.now() - _START < _TIMEOUT - GRACE_PERIOD_MS
