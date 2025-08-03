// src/data/picolo.tsx
// Categorized Picolo-style game prompts and virus effects

export interface VirusEffect {
  prompt: string;
  activation: string;
}

export const regularPrompts: string[] = [
  "If you have ever made a Linkedin Post take a penalty.",
  "If you are single give out 2 penalities",
  "_ give a dare to _, if they can do it give out 2 penalities.",
  "The player who lives the farthest away from where you are now can give 3 penalities.",
  "_ judge players who dress worse than _, they have to take 2 penalities.",
  "If you have a pack of cigarettes take a penalty (one per stick).",
  "Take a penalty if you have ever worked in the FnB industry.",
  "_ sing the chorus from any Justin Bieber song correctly or take a 3 penalties.",
  "_ act like a snake for 5 seconds or take a penalty.",
  "Those who sometimes suffer from paruresis, take 3 penalties.",
  "Do a quick Internet search for those who don't know what that is.",
  "Give out 2 penalities to players you think are more stupid than you. If there aren't any take 2 penalites yourself.",
  "Run around the room and start barking or take 2 penalities.",
  "Players who have brown eyes take a penalty.",
  "If you don't have siblings take a penalty.",
  "The first person who texts a family member right now can give 2 penalties.",
  "Take a penalty if the last movie you saw is \"Romance\" genre.",
  "Players shorter than _ take a penalty.",
  "The last player who filled their glass takes a penalty.",
  "_ name 2 reasons why _ would not be accepted into heaven, if you cannot think of 2 reasons, take two penalties. If you can name 2 reasons give out 2 penalties.",
  "Vote for the player with the stinkiest feet the winner has to take the penalty.",
  "_ if you can sing the alphabet backwards without any mistakes in less than 20 seconds give out 2 penalties, otherwise take 2 penalties.",
  "Take a penalty if you had relationship drama this week.",
  "Take a penalty if you shit talked somebody this week.",
  "The player with the record for masturbating most in a single day give out 2 penalties you champion.",
  "Close your eyes and try to recognize each player from their smell. Take a penalty from each player you can't.",
  "_ do 5 pushups.",
  "_ do 5 squats.",
  "The first person to touch _ feet gives out 2 penalties."
];

export const circleNamingGames: string[] = [
  "Farm animals if you repeat or think of one take a penalty _ starts.",
  "Name things that last a minute, if you repeat or can't think of one take a penalty. _ starts.",
  "Everybody name redflags, the first person who repeats or can't think of one takes 5 penalities, _ you start.",
  "Everybody name turnoffs, the first person who repeats or can't think of one takes 5 penalities, _ you start.",
  "Everybody name objects you find in the bathroom, the first person who repeats or can't think of one takes 5 penalities, _ you start.",
  "Everybody name things that are red and white in color, the first person who repeats or can't think of one takes 5 penalities, _ you start.",
  "List synonyms for the word \"tits\". If you repeat, or can't think of one, take a penalty. _, you start",
  "Everybody name video game consoles, the first person who repeats or can't think of one takes 5 penalities, _ you start.",
  "Everybody name famous websites, the first person who repeats or can't think of one takes 5 penalities, _ you start.",
  "Everybody name sitcoms, the first person who repeats or can't think of one takes 5 penalities, _ you start.",
  "Everybody name marvel movies, the first person who repeats or can't think of one takes 5 penalities, _ you start.",
  "Name excuses not to make love to your partners, the first person who repeats or can't think of one takes 5 penalities, _ you start.",
  "Name bad fashion trends, the first person who repeats or can't think of one takes 5 penalities, _ you start."
];

export const memoryChainGames: string[] = [
  "_, say \"Once upon a time...\" and add 3 words. Taking turns, every player has to repeat the story so far and add their own 3 words. The first player to fail has to take a penalty.",
  "_ say \"In my suitcase, there is...\" and list one item. Taking turns, every player has to repeat the items in the suitcase and add on one new item. The first player to fail has to take a penalty."
];

export const charadeActionJokeGames: string[] = [
  "A player mimes a scene from a movie. The first person to correctly guess the movie title gives out 2 penalties. That person then mimes a scene for the next round, and so on. The game stops after 3 rounds. _, you start.",
  "Going around the group, every player has to repeat \"Three grey geese in a green field grazing,\" five times in a row, in under 6 seconds. 3 penalties for the winners. 3 penalties for the losers. _, you start.",
  "Everybody go around the group telling a joke if nobody smiles or laughs you have to take a penalty. otherwise everybody who laughs take a penalty."
];

export const virusEffects: VirusEffect[] = [
  {
    prompt: "_ cannot answer questions, if they do take 3 penalities.",
    activation: "_ may answer questions again."
  },
  {
    prompt: "_ has to copy _ body movements.",
    activation: "_ no longer copies body movements."
  },
  {
    prompt: "_ everytime you address someone you must say i love you with eye contact or take 2 penalties.",
    activation: "_ no longer has to say i love you."
  },
  {
    prompt: "_ invent a rule for _, get creative.",
    activation: "_ is free from the invented rule."
  },
  {
    prompt: "_ speak in a british accent until further notice.",
    activation: "_ may speak in their normal accent."
  }
];

// Categories without defined prompts yet
export const splitTheRoomQuestions: string[] = [];
export const bets: string[] = [];