/**
 * Lock solvers have a name and a solve function.
 * @interface
 */
export interface Solver {
  name: string
  solve: (ctx: SolverContext) => boolean
}

export type SolverContext = {
  args: SolverArguments

  call: () => void

  outputIncludes: (str: string, call?: boolean) => boolean
  rawOutput: string | ScriptFailure
  output: string[]

  logger: SolverLogger
}

export type SolverArguments = Record<string, string | number | Scriptor>

export type SolverLogger = {
  log: string
  write: (log: string) => void
}

export type SolverConfig = {
  type: string
  loc: string
  args: SolverArguments
}

/**
 * Returned and used by sys scripts.
 * @type
 */
export type UpgradeStub = {
  tier: 1 | 2 | 3 | 4
  rarity: 0 | 1 | 2 | 3 | 4 | 5
  name: string
  type: string
  i: number
  loaded: boolean
}
