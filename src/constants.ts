/* Lock Constants */

/**
 * EZ lock name base.
 * @constant
 */
export const EZ_BASE = "EZ"

export const EZ_21 = "EZ_21"
export const EZ_35 = "EZ_35"
export const EZ_40 = "EZ_40"

export const EZ_PRM = "ez_prime"
export const EZ_DGT = "digit"

/**
 * Words that may be used to unlock EZ_xx locks.
 * @constant
 */
export const EZ_UNLOCK_WORDS = ["open", "unlock", "release"]

/**
 * c00x lock name base.
 * @constant
 */
export const C00X_BASE = "c00"

export const C001 = "c001"
export const C002 = "c002"
export const C003 = "c003"

export const COLOR_DIGIT = "color_digit"

export const C002_COMPLEMENT = "c002_complement"

export const C003_TRIAD_1 = "c003_triad_1"
export const C003_TRIAD_2 = "c003_triad_2"

/**
 * Colors available to C00x locks. Complements are at n+4, triads at n+3 and n+5.
 * @constant
 */
export const C00X_COLORS = [
  "green",
  "lime",
  "yellow",
  "orange",
  "red",
  "purple",
  "blue",
  "cyan",
]

export const DATA_CHECK_LOCK = "DATA_CHECK"

export const L0CKET_LOCK = "l0cket"

/**
 * Strings that may be used to unlock l0cket locks.
 * @constant
 */
export const L0CKET_STRINGS = [
  "6hh8xw",
  "cmppiq",
  "sa23uw",
  "tvfkyq",
  "uphlaw",
  "vc2c7q",
  "xwz7ja",
  "72umy0",
  "9p65cu",
  "ellux0",
  "eoq6de",
  "i874y3",
  "pmvr1q",
  "fr8ibu",
  "xfnkqe",
  "y111qa",
]

/**
 * sn_w_glock keywords and their corresponding amounts.
 * @constant
 */
export const SN_W_GLOCK_AMOUNTS = {
  hunter: 3006,
  secret: 7,
  secure: 443,
  meaning: 42,
  beast: 666,
  special: 38,
  magician: 1089,
  elite: 1337,
  monolithic: 2001,
}

export const SN_W_GLOCK = "sn_w_glock"

export const MAGNARA_LOCK = "magnara"
export const MAGNARA_INCORRECT = "roct"

export const CON_SPEC_LOCK = "CON_SPEC"

/**
 * Grace period in MS needed to clean up porthack.
 * @constant
 */
export const GRACE_PERIOD_MS = 100

/* Output Constants */

/**
 * When found in output, it usually indicates something is incorrect.
 * @constant
 */
export const VALUE_INCORRECT = "correct"

/**
 * When found in output, it indicates kernel.hardline was not called before running.
 * @constant
 */
export const NO_HARDLINE = "hardline"

/**
 * When found in output, the target has been hacked
 * @constant
 */
export const TARGET_HACKED = "terminated"
