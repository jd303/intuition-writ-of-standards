import { MagicSchools, DamageStandards, MagicRanges, MagicDurations } from "../../interfaces/magic_interfaces";

/**
 * Potions:
 * - name
 * - school: Evocation, Necromancy, Illusion, Enchantment, etc
 * - effect: What effect the potion has
 * - cost: in Standards
 * - duration
 * */
export const potions = [
  {
    name: "Healing Potion",
    cost: 50,
    school: MagicSchools.Restoration,
    effect: `The imbiber immediately heals for ${DamageStandards.DR2}.`,
    range: MagicRanges.Short,
    duration: MagicDurations.Instant,
  },
  {
    name: "Greater Healing Potion",
    cost: 100,
    school: MagicSchools.Restoration,
    effect: `The imbiber immediately heals for ${DamageStandards.DR6}.`,
    range: MagicRanges.Short,
    duration: MagicDurations.Instant,
  },
];
