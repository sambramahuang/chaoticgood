

import { ZAxis } from "recharts";

export interface VirusEffect {
  prompt: string;
  activation: string;
}

export const regularPrompts: string[] = [
  "_ if you have ever made a Linkedin Post take a penalty.",
  "If you are single give out 2 penalities",
  "_ give a dare to _, if they can do it give out 2 penalities.",
  "The player who lives the farthest away from where you are now can give 3 penalities.",
  "_ judge players who dress worse than _, they have to take 2 penalities.",
  "If you have a pack of cigarettes take a penalty (one per stick).",
  "Take a penalty if you have ever worked in the FnB industry.",
  "_ sing the chorus from any Justin Bieber song correctly or take a 3 penalties.",
  "_ meow like a cat for 5 seconds or take a penalty.",
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
  "The first person to touch _'s armpits gives out 2 penalties.",
  "_ if you can name 5 Kanye West songs, give out 3 penalties, if not take a penalty.",
  "Take a penalty if you haven't been to a dentist this year.",
  "_ if you have product in your hair take 2 penalties if you do not, give out 3 penalties.",
  "_ act like a slug for 5 seconds.",
"_ if you have ever been blocked by someone take a penalty.",
"Everyone points at the player who is most likely to fall for a scam, that player takes 2 penalities.",
"_ if you have ever cried during a cartoon take a penalty.",
"The tallest and shortest player thumb-wrestle; loser takes 2 penalities.",
"Everyone with a cracked screen protector takes a penalty.",
"Everyone who owns Crocs takes a penalty (wearing them now? take 2).",
"_ if you posted a story in the last 24 hours take a penalty.",
"Everyone who has kissed the same gender before take a penalty.",
"Everyone who has been in a fist fight take a penalty.",
"_ try to get _ to laugh, if they laugh they take 2 penalties.",
"Stare-down challenge: _ vs _. Blinker takes 2 penalities.",
"Everyone points to the person with the worst haircut in the group they take 1 penalty for every finger pointed at them.",
"Everyone points to the person who is most likely to date someone with a big age gap in the group they take 1 penalty for every finger pointed at them.",
"Everyone points to the person who is most likely to date someone with a big age gap in the group they take 1 penalty for every finger pointed at them.",
"Everyone points to the person who is the biggest red flag in the group they take 1 penalty for every finger pointed at them.",
"Everyone points to the person who is the most narcisstic in the group they take 1 penalty for every finger pointed at them.",
"Everyone points to the person who has the most annoying voice they take 1 penalty for every finger pointed at them.",
"Everyone points to the nicest person they take 1 penalty for every finger pointed at them.",
"_ dm a risky text to a person of _’s choosing or take 3 penalties",
"Everyone who has ever been ghosted take a penalty.",
"_ if you know _, give them a peck on the cheek or take 2 penalties.",
"_, who is most likely to win a presidente election? _ or _ ? The winner gives out 2 penalties.",
"Who wants to take 4 penalties? If no one volunteers, everybody takes 2 penalties.",
"Girls take as much penalties as there are handsome guys in the room.",
"Guys take as much penalties as there are pretty girls in the room.",
"_ and _ compare finger nails, the one with the longer nails takes 2 penalties.",
"_ take a penalty for every piece of black clothing you are wearing.",
"The player who last peed takes a penalty.",
"Lick the elbow of the person to your right, if you refuse take 2 penalties.",
"The first player who posts a selfie on their story can give out a MAXIMUM PENALTY to anybody, the selfie must stay up until tomorrow.",
"_ carress every player's faces (of the same gender) , if you refuse take 2 penalties.",
"Everyone writes a  roast of _ on their phone. _ picks the funniest; winner gives out 2 penalities.",
"Everyone who can touch their nose with their tongue gives out 1 penalty; everyone else takes 1.",
"_ imitate someone in the group, if nobody guesses who it is take 2 penalties.",
"Everyone, take as many penalties as people in the group who has the same MBTI type as you.",
"_ hold a plank for 20 seconds; if you drop early, take 2 penalties.",
"Everyone share the oldest photo on your phone or take 2 penalties.",
"_ spin around 10 times and try to walk in a straight line, if you fail take 2 penalties.",










];

export const circleNamingGames: string[] = [
  "Name farm animals if you repeat or can't think of one take a penalty _ starts.",
  "Name things that last a minute, if you repeat or can't think of one take a penalty. _ starts.",
  "Everybody name redflags, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
  "Everybody name turnoffs, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
  "Everybody name objects you find in the bathroom, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
  "Everybody name things that are red and white in color, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
  "List synonyms for the word \"tits\". If you repeat, or can't think of one, take a penalty. _, you start",
  "Everybody name video game consoles, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
  "Everybody name famous websites, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
  "Everybody name sitcoms, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
  "Everybody name marvel movies, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
  "Name excuses not to make love to your partners, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
  "Name bad fashion trends, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
  "Name things that are yellow, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
  "Everybody give words that have 4 syllables, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
"Everybody name fruits with seeds, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
"Everybody name mythical creatures, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
"Everybody name car brands, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
"Everybody name songs with a color in the title, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
"Everybody name countries that start with the letter S, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
"Everybody name sci fi movies, the first person who repeats or can't think of one takes 4 penalities, _ you start.",
"Everybody name train stations, the first person who repeats or can't think of one takes 4 penalities, _ you start.",





];

export const memoryChainGames: string[] = [
  "_, say \"Once upon a time...\" and add 3 words. Taking turns, every player has to repeat the story so far and add their own 3 words. The first player to fail has to take 3 penalties.",
  "_ say \"In my suitcase, there is...\" and list one item. Taking turns, every player has to repeat the items in the suitcase and add on one new item. The first player to fail has to take 3 penalties.",
  "_, say \"I'm making a sandwich with...\" and add 1 ingredient. Taking turns, every player must repeat all ingredients so far and add one new ingredient. The first player to fail has to take 3 penalties.",
"_, say \"For the apocalypse, I'm packing...\" and add 1 item. Taking turns, every player must repeat the list and add one new item. The first to fail takes 3 penalties.",
  "_, say \"I went to the club and saw...\" and add 1 item. Taking turns, every player must repeat the list and add one new item. The first to fail takes 3 penalties.",
  "_, say \"I went to the zoo and saw...\" and add 1 animal. Taking turns, every player must repeat the list and add one new animal. The first to fail takes 3 penalties.",
  "_, say \"I went to the grocery store and bought...\" and add 1 item. Taking turns, every player must repeat the list and add one new item. The first to fail takes 3 penalties.",
  "Going around the group, copy the gesture of the previous player and add your own gesture. The first player to fail has to take 3 penalties.",
  
];

export const charadeActionJokeGames: string[] = [
  "A player mimes a scene from a movie. The first person to correctly guess the movie title gives out 2 penalties. That person then mimes a scene for the next round, and so on. The game stops after 3 rounds. _, you start.",
  "Going around the group, every player has to repeat \"I slit the sheet, the sheet I slit, and on the slitted sheet I sit.\" five times in a row, in under 6 seconds. 3 penalties for the winners. 3 penalties for the losers. _, you start.",
  "Everybody go around the group telling a joke if nobody smiles or laughs you have to take a penalty. otherwise everybody who laughs take a penalty.",
  "_, mime a famous TikTok dance; the first person to guess the dance gives out 2 penalities. If nobody gets it in 20 seconds, _ takes 2 penalities.",
"On the count of 3, _ tries to make everyone laugh without touching anyone. Anyone who laughs takes a penalty; if nobody laughs, _ takes 2 penalities.",
"Going around the group, say something personal, it can be true or false. Everybody else has to guess if it is true or false. Losers have to take a penalty for every wrong guess.",


];

export const virusEffects: VirusEffect[] = [
  {
    prompt: "Everyone ignore _. Everytime you fail to ignore them take a penalty.",
    activation: "Everybody please stop ignoring _. You meanies"
  },
  
  {
    prompt: "_ everytime you address someone you must say \"I LOVE YOU\" with eye contact or take 2 penalties.",
    activation: "_ no longer has to say \"I LOVE YOU\"."
  },
  {
    prompt: "Someone make up a rule for _, get creative.",
    activation: "_ is free from the made up rule."
  },
  {
    prompt: "_ speak in a british accent until further notice.",
    activation: "_ You may speak in your normal accent."
  },
  {
    prompt: "_ you cannot look at anybody in the eye.",
    activation: "_ , you can look everyone in the eye again."
  },

  {
  prompt: "_ must speak in third person only.",
  activation: "_ may speak normally again."
},

  {
  prompt: "_ must have their tongue out when they are not talking.",
  activation: "You can put your tongue in your mouth again."
},

 {
  prompt: "_ you must now end all your sentences with \"in my ass\".",
  activation: "You can stop ending your sentences with \"in my ass\", you freak."
},

 {
  prompt: "_ you're blind! You must keep your eyes closed until further notice.",
  activation: "You can open your eyes again."
},


];

// Categories without defined prompts yet
export const splitTheRoomQuestions: string[] = [
"Split the room! Would you rather live without music or without movies? The minority group takes 2 penalties.",
"Split the room! You can see the exact day you will die, but you can’t change it. Do you want to know? The minority group takes 2 penalties.",
"Split the room! You’re offered $10 million, but everyone you know will believe a horrible, false rumor about you for the rest of your life. Do you take the money? The minority group takes 2 penalties.",
"Split the room! You can eat anything you want without gaining weight, but all food will taste slightly worse forever. Do you accept? The minority group takes 2 penalties.",
"Split the room! You can time travel to any year in the past, but you must stay there for the rest of your life. Do you go? The minority group takes 2 penalties.",
"Split the room! Is pineapple on pizza acceptable? The minority group takes 2 penalties.",
"Split the room! Would you rather have unlimited free clothes or unlimited free food? The minority group takes 2 penalties.",
"Split the room! You can read minds, but everyone can also read yours. Do you accept? The minority group takes 2 penalties.",
"Split the room! Who is more attractive? Robert Pattinson or Timothée Chalamet? The minority group takes 2 penalties.",
"Split the room! Who is more attractive? Megan Fox or Emma Watson? The minority group takes 2 penalties.",
"Split the room! Who is more attractive? Zendaya or Margot Robbie? The minority group takes 2 penalties.",
  "Split the room! Who would win in a fight? Batman or Iron Man? The minority group takes 2 penalties.",
  "Split the room! Which would you rather give up forever? Cheese or chocolate? The minority group takes 2 penalties.",
  "Split the room! Which do you like better? Whiskey or Vodka? The minority group takes 2 penalties.",
    "Split the room! Who is the better group? BLACKPINK or TWICE? The minority group takes 2 penalties.",
  "Split the room! Which country has better food? Thailand or Korea? The minority group takes 2 penalties."





];

export const bets: string[] = [];