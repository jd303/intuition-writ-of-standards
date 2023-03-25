import { MagicSchools, MagicCosts, MagicChallengeTypes, MagicRanges, MagicDurations } from "../../interfaces/magic_interfaces";
import { DamageStandards } from "./standards_data";

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
    cost: MagicCosts.CR1,
    school: MagicSchools.Evocation,
    effect_cantrip: `A small shard is fired at a single target, dealing ${DamageStandards.DR1} damage to it.`,
    effect_channeled: `Fires 3 shards at up to 3 targets within 3 squares of each other; each dealing ${DamageStandards.DR1} damage.`,
    effect_overchanneled: `Fires 6 shards at up to 6 targets within 6 squares of each other; each dealing ${DamageStandards.DR1} damage.`,
    challenge_type: MagicChallengeTypes.None,
    range: MagicRanges.Short,
    duration: MagicDurations.Instant,
  },
  {
    name: "Healing",
    cost: MagicCosts.CR1,
    school: MagicSchools.Evocation,
    effect_cantrip: `You heal a willing target by 3 Life.  Recipients can only be healed this way once per Short Rest.`,
    effect_channeled: `You heal a willing target by ${DamageStandards.DR1} Life.`,
    effect_overchanneled: ``,
    challenge_type: MagicChallengeTypes.None,
    range: MagicRanges.Touch,
    duration: MagicDurations.Instant,
  },
  {
    name: "Invisibility",
    cost: MagicCosts.CR2,
    school: MagicSchools.Illusion,
    effect_cantrip: `You give someone 1 Cloak.  This can only happen once per 5 minutes.`,
    effect_channeled: `A willing target becomes invisible. Using the following Moves breaks this effect: Attack, Ranged Attack, Cast, [etc]`,
    effect_overchanneled: `A willing target becomes invisible.`,
    challenge_type: MagicChallengeTypes.None,
    range: MagicRanges.Short,
    duration: MagicDurations.Medium,
  },
];
