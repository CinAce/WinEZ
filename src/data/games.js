// Tekken 8 Characters
import armorKing from "../assets/armorKing.gif";
import ninaWilliams from "../assets/ninaWilliams.gif";
import king from "../assets/king.gif";
import bryanFury from "../assets/bryanFury.gif";
import leeChaolan from "../assets/leeChaolan.gif";
import kazuya from "../assets/kazuya.gif";

// Rank icons
import kishin from "../assets/kishin.png";
import tekkenKing from "../assets/tekkenKing.png";
import tekkenEmperor from "../assets/tekkenEmperor.png"
import tekkenGodSupreme from "../assets/tekkenGodSupreme.png";

// Madden 26 Teams
import vikings from "../assets/vikings.svg";
import chargers from "../assets/chargers.svg";

 export const allStrategies = [
    {
      game: "Tekken 8",
      name: "Armor King",
      image: armorKing,
      strategies: [
        "Space opponent",
        "Poke opponents into CH setups",
        "Mix throws to test breaks",
      ],
      coach: "Adams",
      coachUsername: "CinAce",
      difficulty: "Challenging",
      rankImage: tekkenGodSupreme,
    },
    {
      game: "Tekken 8",
      name: "Nina Williams",
      image: ninaWilliams,
      strategies: [
        "Pressure Opponents",
        "Close the space with rush-down",
        "Condition into mixes"
      ],
      coach: "Shannon",
      coachUsername: "JoshDKilla",
      difficulty: "Challenging",
      rankImage: kishin,
    },
    {
      game: "Tekken 8",
      name: "King",
      image: king,
      strategies: [
        "Bait opponents into df2 CH",
        "Mixing chain throws to keep opponent guessing",
        "Punish opponents conditioned to crouch"
      ],
      coach: "Adams",
      coachUsername: "CinAce",
      difficulty: "Specialist",
      rankImage: tekkenEmperor,
    },
    {
      game: "Tekken 8",
        name: "Bryan",
        image: bryanFury,
        strategies: [
            "Spacing to create CHs",
            "Frame trapping to set up CHs",
            "Wall pressure"
        ],
        coach: "Gill",
        coachUsername: "ZayThaActivist",
        difficulty: "Challenging",
        rankImage: tekkenKing,
    },
    {
      game: "Tekken 8",
      name: "Lee",
      image: leeChaolan,
      strategies: [
        "Spacing for counterhits",
        "Just frame practice",
        "Okie on get-up"
      ],
      coach: "Adams",
      coachUsername: "CinAce",
      difficulty: "Challenging",
      rankImage: tekkenKing,
    },
    {
      game: "Tekken 8",
      name: "Kazuya",
      image: kazuya,
      strategies:[
        "Heavy execution character",
        "Mix opponents and condition for hellsweep mix",
        "Force opponent to respect options"
      ],
      coach: "Adams",
      coachUsername: "CinAce",
      difficulty: "Specialist",
      rankImage: kishin,

    },
    {
      game: "Madden 26",
      name: "Vikings",
      image: vikings,
      strategies: [
        "Gun Bunch TE",
        "Gun Trips TE Flex",
      ],
      coach: "Adams",
      coachUsername: "CinAce",
      difficulty: "Intermediate",
      rankImage: null,
    },
    {
      game: "Madden 26",
      name: "Chargers",
      image: chargers,
      strategies: [
        "Gun Bunch Nasty",
        "Gun Trips TE",
        "Gun Doubles Y Offset"
      ],
      coach: "Adams",
      coachUsername: "CinAce",
      difficulty: "Intermediate",
      rankImage: null,
    },
    {
      game: "Street Fighter 6",
      name: "Ryu",
      image: null,
      strategies: [
        "Fundamental footsies",
        "Hadoken zoning",
        "Shoryuken punishes"
      ],
      coach: "Adams",
      coachUsername: "CinAce",
      difficulty: "Intermediate",
      rankImage: null,
    },
    {
      game: "Street Fighter 6",
      name: "Chun-Li",
      image: null,
      strategies: [
        "Spacing with normals",
        "Lightning Legs pressure",
        "Anti-air normals",
      ],
      coach: "Adams",
      coachUsername: "CinAce",
      difficulty: "Challenging",
      rankImage: null,
    }
  ];

  export const tekken8Characters = allStrategies.filter(s => s.game == "Tekken 8");