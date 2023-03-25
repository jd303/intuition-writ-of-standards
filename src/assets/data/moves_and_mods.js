import { MoveModRanks } from '../../interfaces/move_interfaces';

/**
 * Moves and Mods:
 * - Organised by:
 * - Category >
 * - Move >
 * - Mod
 * */
export const moves_and_mods = [
  {
    name: "Combat",
    moves: [
      {
        name: "Attack",
        description: "Hitty-bashy",
        mods: [
          {
			rank: MoveModRanks.rank1,
            name: "Hitty Good",
            description: "You hit really good",
            stamina: false,
          },
          {
			rank: MoveModRanks.rank1,
            name: "Trippy man",
            description: "Whoopsy now on the floor!",
            stamina: true,
          },
          {
			rank: MoveModRanks.rank2,
            name: "Runny chargy guy",
            description: "+2 Dam if you can do the thing",
            stamina: false,
          },
          {
			rank: MoveModRanks.rank3,
            name: "Brick Attack",
            description: "Construction materials",
            stamina: true,
          },
        ],
      },
      {
        name: "Attack but different",
        description: "Hitty-bashy-in-a-different-way",
        mods: [
          {
            name: "Trippy man",
            description: "Whoopsy now on the floor!",
            stamina: false,
          },
        ],
      },
    ],
  },
];
