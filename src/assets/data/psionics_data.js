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

export const PsionicLevels = {
	Level1: "1",
	Level2: "2",
	Level3: "3",
	Level4: "4",
	Level5: "5",
	Level6: "6",
	Level7: "7",
	Level8: "8",
	Level9: "9",
	Level10: "10",
}

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
	level: 1,
    cost: PsionicCosts.CR1,
    talent: PsionicTalents.Kinetics,
    description: `DESC`,
    challenge_type: PsionicChallengeTypes.None,
    range: PsionicRanges.Short,
    duration: PsionicDurations.Instant,
  },
  {
    name: "Emotion Manipulation",
	level: 1,
    cost: PsionicCosts.CR1,
    talent: PsionicTalents.Telepathy,
    description: `DESC`,
    challenge_type: PsionicChallengeTypes.None,
    range: PsionicRanges.Touch,
    duration: PsionicDurations.Instant,
  },
  {
    name: "Adrenal Rush",
	level: 1,
    cost: PsionicCosts.CR2,
    talent: PsionicTalents.Psychometabolism,
    description: `DESC`,
    challenge_type: PsionicChallengeTypes.None,
    range: PsionicRanges.Short,
    duration: PsionicDurations.Medium,
  },
  {
    name: "Future Sight",
	level: 1,
    cost: PsionicCosts.CR2,
    talent: PsionicTalents.Clairvoyance,
    description: `DESC`,
    challenge_type: PsionicChallengeTypes.None,
    range: PsionicRanges.Short,
    duration: PsionicDurations.Medium,
  },
];
