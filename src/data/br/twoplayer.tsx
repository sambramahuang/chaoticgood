// Two-player game mode data (Chaotic Good)
// Format mirrors other BR data files: exports typed arrays for prompts and virus effects.

export interface VirusEffect {
  prompt: string;
  activation: string; // e.g., "until further notice", "one turn", etc.
}

// 5-Second Rule style prompts (two players take turns; if a player repeats or stalls, they take a penalty)
export const fiveSecondRulePrompts: string[] = [
  "Name farm animals. If you repeat or can't think of one, take a penalty. _ starts.",
  "Name things that last a minute. If you repeat or can't think of one, take a penalty. _ starts.",
  "Everybody name red flags. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name turnoffs. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name objects you find in the bathroom. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name things that are red and white in color. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "List synonyms for the word \"tits\". If you repeat or can't think of one, take a penalty. _, you start.",
  "Everybody name video game consoles. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name famous websites. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name sitcoms. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name Marvel movies. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Name excuses not to make love to your partners. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Name bad fashion trends. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Name things that are yellow. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody give words that have 4 syllables. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name fruits with seeds. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name mythical creatures. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name car brands. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name songs with a color in the title. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name countries that start with the letter S. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name sci‑fi movies. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
  "Everybody name train stations. The first person who repeats or can't think of one takes 4 penalties. _, you start.",
];

// "Virus" effects that persist across turns until cleared
export const virusEffects: VirusEffect[] = [
  { prompt: "_ cover your nose until further notice.", activation: "until further notice" },
  { prompt: "_ must flex every round until further notice.", activation: "until further notice" },
  { prompt: "_ must end every sentence with ‘papi’ until further notice.", activation: "until further notice" },
  { prompt: "_ must start every sentence with ‘hey sexy’ until further notice.", activation: "until further notice" },
];

// Lines to indicate when a curse is lifted (follow other BR file formats)
export const curseLifteds: string[] = [
  "_ may uncover their nose now.",
  "_ may stop flexing every round.",
  "_ no longer needs to end sentences with ‘papi’.",
  "_ no longer needs to start sentences with ‘hey sexy’.",
];

// Standard two‑player prompts
export const regularPrompts: string[] = [
  "_ show your favourite dance move or take 2 penalties.",
  "Whoever has been rejected before, take 2 penalties.",
  "Whoever here has slid into someone’s DMs, take a penalty.",
  "Whoever here has had a crush on the other person playing, take 3 penalties.",
  "If both of you are guys, take a penalty.",
  "If both of you are girls, take a penalty.",
  "_ show _ your Instagram search history, or take 2 penalties.",
  "_ show _ your TikTok search history, or take 2 penalties.",
  "_ go record a TikTok video of _’s choosing, or take 3 penalties.",
];

// Convenience export for consumers
export const twoPlayer = {
  fiveSecondRulePrompts,
  virusEffects,
  curseLifteds,
  regularPrompts,
};

export default twoPlayer;