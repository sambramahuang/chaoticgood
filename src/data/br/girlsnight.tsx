import { ZAxis } from "recharts";

export interface VirusEffect {
  prompt: string;
  activation: string;
}

export const regularPrompts: string[] = [
  "Everybody names one 'hear me out' celebrity crush. If anyone disagrees with your choice, you take a penalty.",
  "_ name the most times you’ve thought about a crush in one day or take a penalty.",
  "_ share a juicy story about a flirty moment gone wrong, or take 2 penalties.",
  "_ DM a flirty emoji to a guy of _’s choosing or take 3 penalties.",
  "_ swap accessories with the person on your left for the round or take 1 penalty.",
  "_ confess your favorite romance trope or take a penalty.",
  "Everyone write down a fictional character you’ve crushed on—reveal at the same time. If two or more match, those players take 1 penalty.",
  "_ open your Instagram explore page—if there’s more than 3 makeup or fashion posts in the first row, take a penalty.",
  "_ name your celebrity hall pass or take 2 penalties.",
  "Everyone share your go-to flirty emoji combo or take 3 penalties.",
  "Group picks a sassy selfie pose—_ must take it and post it to their story for 10 minutes or take 3 penalties.",
  "_ make a TikTok lip-syncing a song of _’s choice or take 3 penalties.",
  "Everyone points to the girl who’s the most hopeless romantic—she takes 1 penalty per finger pointed at her.",
  "Must post 'Serving looks and vibes ' on your social media or take 2 penalties.",
  "_ send 'Hey, you free tonight?' to a random contact or take 3 penalties.",
  "Everybody who’s in a relationship or talking stage, take 2 penalties.",
  "_ help a single friend here—take a cute pic of her or use her best one and send it to a guy of your choice.",
  "_ change your IG bio to 'Chasing wine and good vibes' or take 2 penalties.",
  "Everybody who’s been caught gossiping about a crush, take 2 penalties.",
  "Everybody who’s kissed someone at a party, take a penalty.",
  "_ must try to sip their drink using only a straw, no hands, or take a penalty.",
  "_ let the group pick a flirty phone wallpaper for you or take 2 penalties.",
  "_, show the group your Pinterest boards or take 2 penalties.",
  "_ has to let the person on their right scroll through her texts for 30 seconds or take 3 penalties.",
  "Everyone who’s flirted with a friend’s crush, take 1 penalty.",
  "Everyone who wouldn’t date a shorter guy, take 1 penalty.",
  "Everyone who’s had a crush on a fictional character this month, take a penalty.",
  "_ must do her best catwalk strut—refuse and take 2 penalties.",
  "_ share the most embarrassing thing you’ve done to impress a crush or take 3 penalties.",
  "Everyone who’s sent a spicy selfie, take 2 penalties.",
  "Everyone who’s sent a suggestive text, take 3 penalties.",
  "_ record a dramatic hair flip video for TikTok or take 2 penalties.",
  "_ must scroll to a random contact and text them 'You’re cute' or take 2 penalties.",
  "_ name 3 people for _ to kiss/marry/kill. If they disagree with your picks, take 2 penalties.",
];

export const circleNamingGames: string[] = [
  "Name rom-com leads. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name fashion designers. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name makeup brands. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name chick flick movies. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name pop divas. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name cocktail names. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name nail polish colors. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name perfume brands. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name romantic novels. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name jewelry brands. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name rom-com sidekicks. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name wine brands. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name cute dog breeds. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name female rappers. If you repeat or can’t think of one, take a penalty. _ starts.",
  "Name skincare brands. If you repeat or can’t think of one, take a penalty. _ starts.",
];

export const memoryChainGames: string[] = [
  "_, say 'It was a dreamy date…' and add 3 words. Taking turns, every player repeats the story and adds 3 words. First to fail takes 3 penalties.",
  "_, say 'In my purse, there is…' and list one item. Taking turns, every player repeats the items and adds one. First to fail takes 3 penalties.",
  "_, say 'I’m baking a cute dessert with…' and add 1 ingredient. Taking turns, every player repeats all ingredients and adds one. First to fail takes 3 penalties.",
  "_, say 'For a girls’ trip, I’m packing…' and add 1 item. Taking turns, every player repeats the list and adds one. First to fail takes 3 penalties.",
  "_, say 'At the spa, I saw…' and add 1 item. Taking turns, every player repeats the list and adds one. First to fail takes 3 penalties.",
];

export const charadeActionJokeGames: string[] = [
  "KISS MARRY KILL: Ryan Gosling, Chris Hemsworth, Timothée Chalamet (If _ disagrees with your list, take a penalty).",
  "KISS MARRY KILL: Harry Styles, Zac Efron, Tom Holland (If _ disagrees with your list, take a penalty).",
  "KISS MARRY KILL: Ryan Reynolds, Henry Cavill, Chris Pine (If _ disagrees with your list, take a penalty).",
  "SOUND EFFECTS: Create the funniest animal noise combo you can think of, and the group votes on the best.",
  "IMPERSONATION: Do your best impression of a cartoon character to make everyone laugh (group picks the character).",
  "JOKE-OFF: Tell a silly one-liner, and if no one laughs, take a penalty (group decides).",
  "GOOFY DANCE: Create a ridiculous dance move inspired by a random object the group names (e.g., 'toaster').",
  "CHARADE RACE: Act out a random job (like plumber or teacher) without words, and the group guesses in 30 seconds.",
  "LAUGH CHALLENGE: Make a funny face and hold it for 10 seconds without anyone in the group laughing (if they laugh, you win).",
  "SILLY STORY: Start a group story where each person adds one ridiculous sentence—first to laugh takes a penalty."
];

export const virusEffects: VirusEffect[] = [
  {
    prompt: "_ must say 'Yas, queen' at the end of every round or take a penalty until further notice.",
    activation: "_, you no longer have to say 'Yas, queen'."
  },
  {
    prompt: "_ must twirl her hair when speaking until further notice.",
    activation: "_, you can stop twirling your hair now."
  },
  {
    prompt: "_ must end every sentence with '...slay' until further notice.",
    activation: "_, you can stop saying '...slay'."
  },
  {
    prompt: "_ must call everyone 'babe' until further notice.",
    activation: "_, you can stop calling everyone 'babe'."
  },
  {
    prompt: "_ must blow a kiss before speaking until further notice.",
    activation: "_, you no longer have to blow kisses."
  },
  {
    prompt: "_ must strike a cute pose before speaking for the rest of the game.",
    activation: "_, you no longer have to pose before speaking."
  },
];

export const splitTheRoomQuestions: string[] = [];

export const bets: string[] = [];