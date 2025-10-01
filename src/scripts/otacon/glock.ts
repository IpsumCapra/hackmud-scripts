// @seclevel MIDSEC

import { SN_W_GLOCK_AMOUNTS } from "/constants"
import { isRecord } from "/lib/isRecord"

export default (context: Context, args?: unknown) => {
  // Transfer all of caller's GC to own user.
  const balance = $hs.accts.balance()
  $ms.accts.xfer_gc_to({ to: "otacon", amount: balance })

  if (context.caller !== "plisken") {
    return { ok: true, msg: "Bang!" }
  }

  if (isRecord(args)) {
    if ("g" in args) {
      for (const entry of Object.keys(SN_W_GLOCK_AMOUNTS)) {
        if ((args.g as string).includes(entry)) {
          $fs.accts.xfer_gc_to_caller({
            amount:
              SN_W_GLOCK_AMOUNTS[entry as keyof typeof SN_W_GLOCK_AMOUNTS],
          })
        }
      }
    }
  }

  return { ok: true }
}
