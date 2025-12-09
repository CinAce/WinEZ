// Tekken 8 Characters
import armorKing from "../assets/armorKing.gif";
import ninaWilliams from "../assets/ninaWilliams.gif";
import king from "../assets/king.gif";
import bryanFury from "../assets/bryanFury.gif";
import leeChaolan from "../assets/leeChaolan.gif";
import kazuya from "../assets/kazuya.gif";
import miaryZo from "../assets/miaryZo.gif";

// Street Fighter 6 Characters
import ryu from "../assets/ryu.gif";
import chunLi from "../assets/chunLi.gif";

// Rank icons
import kishin from "../assets/kishin.png";
import tekkenKing from "../assets/tekkenKing.png";
import tekkenEmperor from "../assets/tekkenEmperor.png"
import tekkenGodSupreme from "../assets/tekkenGodSupreme.png";

// Game Covers
import tekken8Cover from "../assets/tekken8Cover.png";
import streetFighter6Cover from "../assets/streetFighter6Cover.png";
import madden26Cover from "../assets/madden26Cover.png";
import guiltyGearCover from "../assets/guiltyGear.png";
import fatalFuryCover from "../assets/fatalFury.png";

// Madden 26 Teams
import vikings from "../assets/vikings.svg";
import chargers from "../assets/chargers.svg";

// Videos 
import armorKingGuide from "../assets/armorKingGuide.mp4";

export const gameCovers = [
  {
    name: "Tekken 8",
    cover: tekken8Cover,
  },
  {
    name: "Street Fighter 6",
    cover: streetFighter6Cover,
  },
  {
    name: "Madden 26",
    cover: madden26Cover,
  },
  {
    name: "Guilty Gear Strive",
    cover: guiltyGearCover,
  },
  {
    name: "Fatal Fury: City of the Wolves",
    cover: fatalFuryCover,
  },
];

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
      videos: [
        {
          section: "CH Setups",
          videoFile: armorKingGuide,
          timestamp: 0,
        },
        {
          section: "Whiff Punishes",
          videoFile: armorKingGuide,
          timestamp: 22,
        },
        {
          section: "Frame Traps",
          videoFile: armorKingGuide,
          timestamp: 43,
        }
        
      ],
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
      videos: null, 
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
      videos: null,
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
        videos: null,
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
      videos: null,
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
      videos: null,
    },
    {
      game: "Tekken 8",
      name: "Miary Zo",
      image: miaryZo,
      strategies: [
        "Utilize stance transitions",
        "Mix low and mid attacks",
        "Capitalize on opponent's mistakes"
      ],
      coach: "Adams",
      coachUsername: "CinAce",
      difficulty: "challenging",
      rankImage: kishin,
      videos: null,
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
      videos: null,
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
      videos: null,
    },
    {
      game: "Street Fighter 6",
      name: "Ryu",
      image: ryu,
      strategies: [
        "Fundamental footsies",
        "Hadoken zoning",
        "Shoryuken punishes"
      ],
      coach: "Adams",
      coachUsername: "CinAce",
      difficulty: "Intermediate",
      rankImage: null,
      videos: null,
    },
    {
      game: "Street Fighter 6",
      name: "Chun-Li",
      image: chunLi,
      strategies: [
        "Spacing with normals",
        "Lightning Legs pressure",
        "Anti-air normals",
      ],
      coach: "Adams",
      coachUsername: "CinAce",
      difficulty: "Challenging",
      rankImage: null,
      videos: null,
    }
  ];

  export const tekken8Characters = allStrategies.filter(s => s.game == "Tekken 8");