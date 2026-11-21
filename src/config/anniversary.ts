/**
 * ANNIVERSARY INVITATION CONFIGURATION
 * 
 * Edit this file to configure all personal dates, times, messages, and assets.
 * Do not worry about breaking the rest of the code — all components read from here!
 */

export interface AnniversaryConfig {
  /**
   * Relationship start date in ISO format (YYYY-MM-DD), e.g., "2022-11-21".
   * If left as null or empty, the site gracefully displays "four years of being us ♡".
   */
  relationshipStartDate: string | null;

  /**
   * Scheduled movie date in ISO format (YYYY-MM-DD), e.g., "2026-11-28".
   * If left as null, the countdown shows a waiting state and the timezone time displays both ADT and AST equivalents.
   */
  eventDate: string | null;

  /**
   * Event time in 24-hour format (HH:mm) in Indian Standard Time (IST).
   * Default is "19:00" (7:00 PM IST).
   */
  eventTimeIST: string;

  /** Timezone identifiers */
  timezones: {
    ist: string;
    halifax: string;
  };

  /** Event Details */
  eventTitle: string;
  eventLocation: string;
  dressCode: string;
  attendance: string;

  /** Letter Content */
  letterHeading: string;
  letterParagraphs: string[];
  signature: string;

  /** Visual Asset */
  flowerAssetPath: string;

  /** Sound Settings */
  audio: {
    enabledByDefault: boolean;
    ambientTitle: string;
  };

  /** The Escaping NO Button Messages */
  escapingNoMessages: string[];

  /** Little floating scrapbook notes */
  floatingNotes: string[];
}

export const anniversaryConfig: AnniversaryConfig = {
  // SET YOUR DATES HERE:
  // e.g. "2022-11-21" for relationship start
  relationshipStartDate: null,

  // e.g. "2026-11-28" for movie night
  eventDate: null,

  eventTimeIST: "19:00", // 7:00 PM IST

  timezones: {
    ist: "Asia/Kolkata",
    halifax: "America/Halifax",
  },

  eventTitle: "MOVIE NIGHT",
  eventLocation: "Google Meet — our very own virtual cinema",
  dressCode: "COMFY PJS. No exceptions.",
  attendance: "Attendance: Mandatory under girlfriend law.",

  letterHeading: "four years of us.",
  letterParagraphs: [
    "Four years. Which is actually insane if you think about it.",
    "Four years of loving you, learning you, missing you from entirely different places, making memories, surviving time zones, and somehow continuing to choose each other.",
    "I wish I could just show up at your door, steal you away and make this an actual date. But until geography stops being a little bitch, we improvise.",
    "So this year, I have a date planned for us. Nothing fancy, just you and me, and hopefully a movie we both enjoy. Because I think the best part of any date has always been the person I'm on it with.",
    "Happy fourth anniversary, idiot.\n\nI love you.",
  ],
  signature: "yours, always ♡",

  flowerAssetPath: "/assets/flower.png",

  audio: {
    enabledByDefault: false,
    ambientTitle: "Chamber Music for Two (Music Box Ambient)",
  },

  escapingNoMessages: [
    "NOPE.",
    "wrong answer.",
    "you really thought.",
    "DENIED BY THE GIRLFRIEND DEPARTMENT.",
    "nice try, though.",
    "that button has commitment issues.",
    "the universe says yes.",
    "absolutely not.",
    "not happening.",
    "the button is literally running from you.",
    "we do not accept this answer.",
    "skill issue.",
    "try again. just kidding.",
  ],

  floatingNotes: [
    "p.s. i love your face.",
    "four years is crazy.",
    "save me a seat.",
    "you're my favourite.",
    "movie snacks are non-negotiable.",
    "made with love. and questionable coding decisions.",
    "this is what romance looks like in the 21st century.",
    "distance is temporary, annoying, but temporary.",
  ],
};
