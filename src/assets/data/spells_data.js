export const MagicSchools = {
  Evocation: "Evocation",
  Necromancy: "Necromancy",
  Illusion: "Illusion",
  Enchantment: "Enchantment",
};

const DamageStandards = {
  DR1: "d4",
  DR2: "d6",
  DR3: "d8",
  DR4: "d10",
  DR5: "d12",
  DR6: "2d6",
  DR7: "2d8",
  DR8: "2d10",
  DR9: "2d12",
  DR10: "3d12",
};

const MagicChallengeTypes = {
  None: "None",
  Targeted: "Targeted", // Must overcome the opponent's CR using your Combat skill
  Resist_will: "Resist (Will)",
};

const MagicRanges = {
  Touch: "Touch",
  Short: "10sq",
};

const MagicDurations = {
  Instant: "Instant",
  Short: "3 Rounds",
  Medium: "1 Min",
};

/**
 * Spells:
 * - name
 * - school: Evocation, Necromancy, Illusion, Enchantment, etc
 * - effect_cantrip: What effect the spell has
 * - effect_full
 * - cost
 * - challenge_type
 * - duration
 * */
export const spells = [
  {
    name: "Arcane Shards",
    cost: 2,
    school: MagicSchools.Evocation,
    effect_cantrip: `A small shard is fired at a single target, dealing ${DamageStandards.DR1} damage to it.`,
    effect_full: `Fires 3 shards at up to 3 targets within 3 squares of each other; each dealing ${DamageStandards.DR1} damage.`,
    challenge_type: MagicChallengeTypes.None,
    range: MagicRanges.Short,
    duration: MagicDurations.Instant,
  },
  {
    name: "Healing",
    cost: 2,
    school: MagicSchools.Evocation,
    effect_cantrip: `You heal a willing target by 3 Life.  Recipients can only be healed this way once per Short Rest.`,
    effect_full: `You heal a willing target by ${DamageStandards.DR1} Life.`,
    challenge_type: MagicChallengeTypes.None,
    range: MagicRanges.Touch,
    duration: MagicDurations.Instant,
  },
  {
    name: "Invisibility",
    cost: 2,
    school: MagicSchools.Illusion,
    effect_cantrip: `You give someone 1 Cloak.  This can only happen once per 5 minutes.`,
    effect_full: `A willing target becomes invisible.`,
    challenge_type: MagicChallengeTypes.None,
    range: MagicRanges.Short,
    duration: MagicDurations.Medium,
  },
];
