import { CON_SPEC_LOCK } from "/constants"
import { Solver, SolverContext } from "/types"

const charDiff = (a: number, b: number) => {
  const start = a - "A".charCodeAt(0)
  const end = b - "A".charCodeAt(0)

  let diff = (start - end + 26) % 26

  if (diff > 13) {
    diff -= 26
  }

  return diff
}

const genLetter = (from: number, shift: number) => {
  let res = from + shift

  if (res > "Z".charCodeAt(0)) res -= 26
  if (res < "A".charCodeAt(0)) res += 26

  return res
}

const solve = (ctx: SolverContext) => {
  ctx.args[CON_SPEC_LOCK] = ""
  ctx.call()

  if (ctx.output[0].length > 7) {
    ctx.args[CON_SPEC_LOCK] = $fs.otacon.con_spectral
  } else {
    // Calculate distance between letters.
    const query = ctx.output[0]

    const diff1 = charDiff(query.charCodeAt(5), query.charCodeAt(4))
    const diff2 = charDiff(query.charCodeAt(6), query.charCodeAt(5))

    const letter1 = genLetter(query.charCodeAt(6), diff1)
    const letter2 = genLetter(letter1, diff2)
    const letter3 = genLetter(letter2, diff1)

    ctx.args[CON_SPEC_LOCK] =
      String.fromCharCode(letter1) +
      String.fromCharCode(letter2) +
      String.fromCharCode(letter3)
  }

  ctx.call()

  return true
}

const CON_SPEC: Solver = {
  name: CON_SPEC_LOCK,
  solve: solve,
}

export default CON_SPEC
