import { DamageStandards } from "./standards_data";

export const PsionicTalents = {
  Telepathy: "Telepathy",
  Clairvoyance: "Clairvoyance",
  Kinetics: "Kinetics",
  Psychometabolism: "Psychometabolism",
};

export const PsionicCosts = {
  CR1: 2,
  CR2: 4,
  CR3: 6,
  CR4: 8,
  CR5: 10,
};

export const PsionicChallengeTypes = {
  None: "None",
  Targeted: "Targeted", // Must overcome the opponent's CR using your Combat skill
  Resist_will: "Resist (Will)",
};

export const PsionicRanges = {
  Touch: "Touch",
  Short: "10sq",
};

export const PsionicDurations = {
  Instant: "Instant",
  Short: "3 Rounds",
  Medium: "1 Min",
};

/**
 * Psionics:
 * - name
 * - talent: Kinetics, Telepathy, Psychometabolism, Clairvoyance
 * - description
 * - ... more coming later
 * */
export const powers = [
  {
    name: "Shard rain",
    cost: PsionicCosts.CR1,
    talent: PsionicTalents.Kinetics,
    description: `DESC`,
    challenge_type: PsionicChallengeTypes.None,
    range: PsionicRanges.Short,
    duration: PsionicDurations.Instant,
  },
  {
    name: "Emotion Manipulation",
    cost: PsionicCosts.CR1,
    talent: PsionicTalents.Telepathy,
    description: `DESC`,
    challenge_type: PsionicChallengeTypes.None,
    range: PsionicRanges.Touch,
    duration: PsionicDurations.Instant,
  },
  {
    name: "Adrenal Rush",
    cost: PsionicCosts.CR2,
    talent: PsionicTalents.Psychometabolism,
    description: `DESC`,
    challenge_type: PsionicChallengeTypes.None,
    range: PsionicRanges.Short,
    duration: PsionicDurations.Medium,
  },
  {
    name: "Future Sight",
    cost: PsionicCosts.CR2,
    talent: PsionicTalents.Clairvoyance,
    description: `DESC`,
    challenge_type: PsionicChallengeTypes.None,
    range: PsionicRanges.Short,
    duration: PsionicDurations.Medium,
  },
];
