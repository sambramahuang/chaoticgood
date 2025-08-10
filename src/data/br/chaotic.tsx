import { ZAxis } from "recharts";

export interface VirusEffect {
  prompt: string;
  activation: string;
}

export const regularPrompts: string[] = [
  "_ if you’ve ever posted a thirst trap on social media, take a penalty.",
  "_ give a naughty dare to _, if they complete it, give out 2 penalties.",
  "The player who’s had the most disapproved ex gives out 3 penalties.",
  "_ judge players who’ve had fewer partners than _, they take 2 penalties.",
  "If you ever owned a sex toy, take a penalty (one per toy).",
  "_ moan like you’re in a spicy scene for 5 seconds or take 3 penalties.",
  "_ purr seductively like a cat for 5 seconds or take a penalty.",
  "_ give _ a lapdance or take 3 penalties.",
  "Give out 2 penalties to players you think are kinkier than you. If none, take 2 yourself.",
  "Wiggle your butt around the room like a stripper or take 2 penalties.",
  "Players with tattoos take a penalty.",
  "If you’ve ever sent a sexy pic to someone, take a penalty.",
  "The first person to send a flirty text to a crush can give a MAXIMUM PENALTY.",
  "Take a penalty if the last porn you watched was ‘asian’ genre.",
  "Players taller than _ take a penalty.",
  "_ name 2 reasons why _ would be the worst in bed, if you can’t, take 2 penalties. If you can, give out 2.",
  "Vote for the player with the sweatiest armpits; winner takes a penalty.",
  "_ if you can name all 50 Shades of Grey books in 10 seconds, give out 2 penalties, else take 2.",
  "Take a penalty if you’ve ever been caught masturbating.",
  "The player with the wildest bedroom story gives out 3 penalties.",
  "Close your eyes and guess each player by their cologne or body scent. Take a penalty for each miss.",
  "_ show us your best doggy style or take a penalty.",
  "The first person to sniff _’s neck gives out 2 penalties.",
  "The first person to sniff _’s feet gives out 2 penalties.",
  "_ if you can name 5 adult film stars, give out 3 penalties, else take 1.",
  "Take a penalty if you haven’t showered today.",
  "_ if you’re wearing lingerie, take 2 penalties; if not, give out 3.",
  "_ if you’ve ever sent a nude, take a penalty.",
  "Everyone points at the player most likely to have a secret fetish; they take 2 penalties.",
  "_ if you’ve ever gotten frisky during a movie, take a penalty.",
  "The tallest and shortest player do a suggestive dance; loser takes 2 penalties.",
  "Everyone who owns fishnet stockings takes a penalty (wearing them? take 2).",
  "_ if you’ve posted a spicy selfie in the last 24 hours, take a penalty.",
  "Everyone who’s hooked up with someone from a dating app takes a penalty.",
  "Everyone who’s ever skinny-dipped takes a penalty.",
  "_ try to make _ blush; if they do, they take 2 penalties.",
  "Wink-off: _ vs _. First to blink takes 2 penalties.",
  "Everyone points to the person with the worst bedroom game; they take 1 penalty per finger.",
  "Everyone points to the person most likely to hook up with a coworker; they take 1 penalty per finger.",
  "Everyone points to the person most likely to have a secret OnlyFans; they take 1 penalty per finger.",
  "Everyone points to the person who’s the biggest flirt; they take 1 penalty per finger.",
  "Everyone points to the person with the most seductive voice; they take 1 penalty per finger.",
  "Everyone points to the shyest person in bed; they take 1 penalty per finger.",
  "Everyone points to the most adventurous in bed; they take 1 penalty per finger.",
  "_ send a spicy DM to someone of _’s choice or take 3 penalties.",
  "Everyone who’s been friend-zoned takes a penalty.",
  "_ if you know _, give them a flirty wink or take 2 penalties.",
  "_, who’s more likely to star in a rom-com? _ or _? Winner gives out 2 penalties.",
  "Who volunteers to take 4 penalties? If no one, everyone takes 2.",
  "Girls take a penalty for every guy they’d make out with in the room.",
  "Guys take a penalty for every girl they’d make out with in the room.",
  "_ and _ compare body hair; hairier one takes 2 penalties.",
  "_ take a penalty for every piece of leather clothing you’re wearing.",
  "The player who last got laid takes a penalty.",
  "Nibble the ear of the person to your left or take 2 penalties.",
  "First player to post a thirst trap on their story gives out a MAXIMUM PENALTY; selfie stays up till tomorrow.",
  "_ stroke every player’s hair (same gender) or take 2 penalties.",
  "Everyone writes a spicy roast of _ on their phone. _ picks the funniest; winner gives out 2 penalties.",
  "Everyone who can do a sexy lip bite gives out 1 penalty; others take 1.",
  "_ imitate another player's bedroom voice; if no one guesses, take 2 penalties.",
  "Everyone, take as many penalties as people with the same zodiac sign as you.",
  "_ hold a seductive pose for 20 seconds; if you break, take 2 penalties.",
  "Everyone share the spiciest text on your phone or take 2 penalties.",
  "_ twirl in a circle 10 times and try to wink at someone; if you fail, take 2 penalties.",
  "Everyone give _ your best seductive look; they picks the hottest, winner gives out 2 penalties.",
  "Everyone give _ your best pickup line; they picks the hottest, winner gives out 2 penalties.",
];

export const circleNamingGames: string[] = [
  "Sexy animals; repeat or can’t think of one, take a penalty. _ starts.",
  "Name kinky bedroom props; repeat or can’t think of one, take a penalty. _ starts.",
  "Name spicy turn-ons; first to repeat or blank takes 4 penalties. _ starts.",
  "Name bedroom turn-offs; first to repeat or blank takes 4 penalties. _ starts.",
  "Name objects you’d find in a naughty dungeon; first to repeat or blank takes 4 penalties. _ starts.",
  "Name things that are hot and wet; first to repeat or blank takes 4 penalties. _ starts.",
  "List synonyms for ‘orgasm’; repeat or blank, take a penalty. _ starts.",
  "Name adult websites; first to repeat or blank takes 4 penalties. _ starts.",
  "Name famous adult film genres; first to repeat or blank takes 4 penalties. _ starts.",
  "Name spicy romance novels; first to repeat or blank takes 4 penalties. _ starts.",
  "Name steamy movie scenes; first to repeat or blank takes 4 penalties. _ starts.",
  "Name excuses to skip a boring date; first to repeat or blank takes 4 penalties. _ starts.",
  "Name tacky pickup lines; first to repeat or blank takes 4 penalties. _ starts.",
  "Name things that are pink and naughty; first to repeat or blank takes 4 penalties. _ starts.",
  "Name words for ‘seduction’ with 4 syllables; first to repeat or blank takes 4 penalties. _ starts.",
  "Name fruits that sound sexy; first to repeat or blank takes 4 penalties. _ starts.",
  "Name mythical creatures that sound kinky; first to repeat or blank takes 4 penalties. _ starts.",
  "Name car brands that sound seductive; first to repeat or blank takes 4 penalties. _ starts.",
  "Name songs with suggestive lyrics; first to repeat or blank takes 4 penalties. _ starts.",
  "Name countries starting with S that sound sexy; first to repeat or blank takes 4 penalties. _ starts.",
  "Name erotic sci-fi films; first to repeat or blank takes 4 penalties. _ starts.",
  "Name places you’d sneak a quickie; first to repeat or blank takes 4 penalties. _ starts.",
];

export const memoryChainGames: string[] = [
  "_, say ‘It was a steamy night…’ and add 3 words. Each player repeats the story and adds 3 words. First to fail takes 3 penalties.",
  "_, say ‘In my naughty bag, there is…’ and list one item. Each player repeats and adds an item. First to fail takes 3 penalties.",
  "_, say ‘I’m cooking a spicy dish with…’ and add 1 ingredient. Each player repeats and adds one. First to fail takes 3 penalties.",
  "_, say ‘For a wild night, I’m packing…’ and add 1 item. Each player repeats and adds one. First to fail takes 3 penalties.",
  "_, say ‘At the strip club, I saw…’ and add 1 thing. Each player repeats and adds one. First to fail takes 3 penalties.",
  "_, say ‘I went to a boudoir and saw…’ and add 1 item. Each player repeats and adds one. First to fail takes 3 penalties.",
  "_, say ‘I went to an adult store and bought…’ and add 1 item. Each player repeats and adds one. First to fail takes 3 penalties.",
  "Copy the sexy dance move of the previous player and add your own. First to fail takes 3 penalties.",
];

export const charadeActionJokeGames: string[] = [
  "_, mime a spicy scene from an adult film. First to guess the vibe gives out 2 penalties. They mime next. Stops after 3 rounds.",
  "Everyone say ‘I lick the stick, the stick I lick, and on the sticky stick I sit’ 5 times in 6 seconds. Winners and losers take 3 penalties. _ starts.",
  "Tell a dirty joke; if no one laughs, take a penalty. If anyone laughs, they take a penalty.",
  "_, mime a sultry burlesque routine; first to guess the style gives out 2 penalties. If no one guesses in 20 seconds, they take 2.",
  "On 3, _ tries to make everyone blush without touching. Laughers take a penalty; if no one blushes, they take 2.",
  "Say something scandalous, true or false. Others guess true or false. Wrong guesses take a penalty per miss.",
];

export const virusEffects: VirusEffect[] = [

  {
    prompt: "_, end every sentence with a suggestive wink or take 2 penalties.",
    activation: "_, no more winking required."
  },
  {
    prompt: "Someone make a naughty rule for _. Get wild.",
    activation: "_ is free from the naughty rule."
  },
  {
    prompt: "_, speak in a sultry whisper until further notice.",
    activation: "_, you can speak normally again."
  },
  {
    prompt: "_, you must strike a sexy pose every time someone talks to you.",
    activation: "_, no more posing required."
  },
  {
    prompt: "_ must refer to everybody else as daddy or mommy in a flirty tone.",
    activation: "_ can stop with the parent issues"
  },
  {
    prompt: "_ must take of their socks and shoes.",
    activation: "_, you can wear your socks and shoes again, stinky."
  },
  {
    prompt: "_, end all sentences with ‘you naughty thing.’",
    activation: "_, stop saying ‘you naughty thing.’"
  },
  {
    prompt: "_, you’re too hot to handle! Keep your shirt unbuttoned or take 2 penalties.",
    activation: "_, you can button up again."
  },
];

export const splitTheRoomQuestions: string[] = [
  "Split the room! Would you rather give up sex or alcohol forever? Minority takes 2 penalties.",
  "Split the room! Would you hook up with your ex for $1 million? Minority takes 2 penalties.",
  "Split the room! Would you rather have a threesome or never have sex again? Minority takes 2 penalties.",
  "Split the room! Would you rather lose your sex drive or your sense of taste? Minority takes 2 penalties.",
  "Split the room! Would you join an adult film for a day if no one knew? Minority takes 2 penalties.",
  "Split the room! Is role-playing in bed hot or cringe? Minority takes 2 penalties.",
  "Split the room! Would you rather have endless stamina or endless money? Minority takes 2 penalties.",
  "Split the room! Would you rather know everyone’s kinks or keep yours secret? Minority takes 2 penalties.",
  "Split the room! Who’s hotter? Chris Hemsworth or Ryan Reynolds? Minority takes 2 penalties.",
  "Split the room! Who’s hotter? Scarlett Johansson or Ana de Armas? Minority takes 2 penalties.",
  "Split the room! Who’s hotter? Rihanna or Beyoncé? Minority takes 2 penalties.",
  "Split the room! Who’d win in a sexy dance-off? Captain America or Black Panther? Minority takes 2 penalties.",
  "Split the room! Would you rather give up oral or manual play forever? Minority takes 2 penalties.",
  "Split the room! Which is better? Tequila or Rum? Minority takes 2 penalties.",
  "Split the room! Which country’s accent is sexier? Vietnam or Thai? Minority takes 2 penalties.",
];

export const bets: string[] = [];