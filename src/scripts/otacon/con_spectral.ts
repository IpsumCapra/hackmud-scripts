// @seclevel FULLSEC

import { isRecord } from "/lib/isRecord"

export default (context: Context, args?: unknown) => {
  if (isRecord(args)) {
    if ("s" in args && "d" in args) {
      const matches = (args.s as string).match(
        new RegExp((args.d as number).toString(), "g"),
      )
      return matches ? matches.length : 0
    }
  }
}
