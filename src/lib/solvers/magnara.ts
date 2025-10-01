import { hasTimeLeft } from "/lib/solvingUtils"
import { MAGNARA_INCORRECT, MAGNARA_LOCK } from "/constants"
import { Solver, SolverContext } from "/types"

const getPermutations = (str: string) => {
  if (str.length <= 1) {
    return [str]
  }

  const permutations: string[] = []

  for (let i = 0; i < str.length; i++) {
    if (!hasTimeLeft()) return []

    const char = str[i]
    const remaining = str.slice(0, i) + str.slice(i + 1)

    for (const perm of getPermutations(remaining)) {
      if (!hasTimeLeft()) return []

      permutations.push(char + perm)
    }
  }

  return permutations
}

const solve = (ctx: SolverContext) => {
  ctx.args[MAGNARA_LOCK] = ""
  ctx.call()

  const target = /: (\w+)/g.exec(ctx.rawOutput as string)

  if (target === null) return false

  const options = getPermutations(target[1])

  for (const option of options) {
    if (!hasTimeLeft()) break

    ctx.args[MAGNARA_LOCK] = option

    if (!ctx.outputIncludes(MAGNARA_INCORRECT)) break
  }

  return hasTimeLeft()
}

const MAGNARA: Solver = {
  name: MAGNARA_LOCK,
  solve: solve,
}

export default MAGNARA
