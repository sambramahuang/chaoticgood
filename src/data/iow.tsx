import { Sword } from "lucide-react";

export type CategoryKey =
| "general"
  | "hard"
  | "soccer"
  | "internetSlang"
  | "disney"
  | "anime"
  | "kpop"
  | "movies"
  | "videogames"
  | "superheroes"
  | "famousHistoricalFigures"
  | "cartoonCharacters"
  | "celebrities"
  | "countries"
  | "animals"
  | "f1"
  | "nsfw"

  | "basketball";

  ;

export const categories: Record<CategoryKey, string[]> = {
 

  general: [
  "Harry Potter", "Barbie", "The Rock", "Shrek", "SpongeBob SquarePants",
  "Bigfoot", "Santa Claus", "Elon Musk", "Taylor Swift", "Oprah Winfrey",
  "Mona Lisa", "Mickey Mouse", "Homer Simpson", "Pikachu", "Godzilla",
  "Pizza Delivery Guy", "Zombie Apocalypse", "Vampire", "Ninja", "Clown",
  "Selfie", "Yoga", "Karaoke", "Binge-Watching", "Online Shopping",
  "Roller Coaster", "Ice Cream Truck", "Wedding Proposal", "Haunted House", "Treasure Hunt",
  "Detective", "Astronaut", "Time Traveler", "Pirate", "Superhero Landing",
  "Cat Video", "Treadmill", "DJ", "Cooking Show", "Magic Trick"
],


    hard: [
  "Amelia Earhart", "Banksy", "Salvador Dalí", "Frida Kahlo", "Nikola Tesla",
  "Black Swan", "Rosetta Stone", "Stonehenge", "Mount Vesuvius", "Great Wall of China",
  "Hindenburg", "Great Barrier Reef", "Area 51", "Taj Mahal", "Antarctica",
  "Marie Curie", "Leonardo da Vinci", "Rube Goldberg Machine", "Trojan Horse", "The Bermuda Triangle",
  "Loch Ness Monster", "Suez Canal", "Mount Everest", "Easter Island", "Pyramids of Giza",
  "Chernobyl", "Golden Gate Bridge", "Aurora Borealis", "Dead Sea", "Grand Canyon",
  "Blue Whale", "Komodo Dragon", "Machu Picchu", "Petra", "Silk Road",
  "Genghis Khan", "Cleopatra", "Zeus", "The Kraken", "Eiffel Tower"
],
  soccer: [
    "Lionel Messi", "Cristiano Ronaldo", "Kylian Mbappé", "Mohamed Salah", "Son Heung-min",
    "Bicycle Kick",  "Offside", "Penalty Shootout", "Corner",
    "Tottenham Hotspur", "PSG", "Real Madrid", "Manchester United", "Juventus",
    "World Cup", "Champions League", "Yellow Card", "Hat Trick",  "Tiki-Taka", "Goalkeeper", "Extra Time"
  ],

 basketball: [
  "LeBron James", "Stephen Curry", "Kevin Durant", "Giannis Antetokounmpo", "Nikola Jokić",
  "Slam Dunk", "Three-Pointer", "Alley-Oop", "Fadeaway",
  "Los Angeles Lakers", "Golden State Warriors", "Boston Celtics", "Chicago Bulls", "Miami Heat",
  "NBA Finals", "All-Star Game", "Buzzer Beater", "Triple-Double", "Free Throw", "Fast Break"
],

f1: [
  "Lewis Hamilton", "Max Verstappen", "Charles Leclerc", "Fernando Alonso", "Lando Norris",
  "Pit Stop", "Pole Position", "DRS", "Safety Car",
  "Mercedes", "Red Bull Racing", "Ferrari", "McLaren", "Aston Martin",
  "Monaco Grand Prix", "Singapore Grand Prix", "Checkered Flag", "Podium Finish", "Fastest Lap", "Overtaking"
],

  disney: [
    "Mickey Mouse", "Elsa", "Simba", "Woody", "Ariel",
    "The Lion King", "Frozen", "Toy Story", "Aladdin", "Mulan",
    "Belle", "Cinderella", "Pocahontas", "Snow White", "Rapunzel",
    "The Little Mermaid", "Beauty and the Beast", "Hercules", "Tarzan", "Olaf"
  ],
  internetSlang: [
    "yeet", "simp", "ratio", "cap", "rizz", "sus", "mid", "based", "bet", "slay",
    "gyatt", "goated", "stan", "flex", "no cap", "drip", "fine shyt", "chopped", "bruh", "L", "cuh"
  ],
  anime: [
    "Naruto", "One Piece", "Attack on Titan", "Dragon Ball", "My Hero Academia",
    "Goku", "Luffy", "Levi Ackerman", "Sasuke", "Eren Yeager",
    "Death Note", "Demon Slayer", "Fullmetal Alchemist", "Jujutsu Kaisen", "One Punch Man",
    "Itachi", "Nezuko", "Gojo Satoru", "Tanjiro", "Vegeta"
  ],
  kpop: [
    "Jennie", "Jimin", "IU", "NewJeans", "Lisa", "RM", "Suga", "V", "Jisoo", "Rosé",
    "Taeyeon", "G-Dragon", "Cha Eun-woo", "Seventeen", "Twice", "Stray Kids", "Le Sserafim", "Ive", "Minji", "Karina"
  ],
  movies: [
    "Inception", "Titanic", "Parasite", "Spirited Away", "The Godfather", "Avengers: Endgame", "Frozen", "Interstellar", "The Dark Knight", "Shrek",
    "Finding Nemo", "Toy Story", "The Lion King", "La La Land", "The Matrix", "Jurassic Park", "Harry Potter", "Avatar", "Up", "Inside Out"
  ],
  videogames: [
    "Minecraft", "Fortnite", "League of Legends", "Call of Duty", "Among Us", "Phasmophobia", "Valorant", "PUBG", "Elden Ring", "The Legend of Zelda",
    "Super Mario", "Animal Crossing", "Roblox", "Cooking Mama", "The Witcher", "Street Fighter", "Resident Evil", "Cyberpunk 2077"
  ],
  superheroes: [
    "Spiderman", "Iron Man", "Batman", "Superman", "Wonder Woman", "The Flash", "Thor", "Hulk", "Captain America", "Black Panther",
    "Doctor Strange", "Scarlet Witch", "Deadpool", "Wolverine", "Ant-Man", "Aquaman", "Green Lantern", "Hawkeye", "Black Widow", "Shazam"
  ],
  famousHistoricalFigures: [
    "Napoleon", "Cleopatra", "Albert Einstein", "Leonardo da Vinci", "Abraham Lincoln", "Mahatma Gandhi", "Joan of Arc", "Winston Churchill", "Marie Curie", "Isaac Newton",
    "Alexander the Great", "Julius Caesar", "Queen Elizabeth I", "Martin Luther King Jr.", "William Shakespeare", "Florence Nightingale", "Galileo Galilei", "Genghis Khan", "Nelson Mandela", "Mother Teresa"
  ],
  cartoonCharacters: [
    "Spongebob", "Patrick Star", "Doraemon", "Shin Chan", "Bugs Bunny", "Tom", "Jerry", "Scooby-Doo", "Shrek", "Donkey",
    "Pikachu", "Ash Ketchum", "Bart Simpson", "Homer Simpson", "Stewie Griffin", "Peter Griffin", "Rick Sanchez", "Morty Smith", "Finn the Human", "Jake the Dog"
  ],
  celebrities: [
    "Beyoncé", "Taylor Swift", "Leonardo DiCaprio", "Oprah Winfrey", "Kanye West",
    "Rihanna", "Tom Hanks", "Adele", "Brad Pitt", "Jennifer Lawrence",
    "Drake", "Angelina Jolie", "Will Smith", "Lady Gaga", "Robert Downey Jr.",
    "Ellen DeGeneres", "Dwayne Johnson", "Selena Gomez", "Johnny Depp", "Chris Hemsworth"
  ],
  countries: [
    "Singapore", "Japan", "France", "United Kingdom", "United States",
    "Thailand", "United Arab Emirates", "South Korea", "Italy", "Spain",
    "Australia", "Germany", "China", "Russia", "Malaysia",
    "Egypt", "Vietnam", "India", "Thailand", "Mexico"
  ],
  animals: [
    "Cat", "Dog", "Lion", "Tiger", "Elephant", "Giraffe", "Kangaroo", "Panda", "Koala", "Penguin",
    "Eagle", "Shark", "Dolphin", "Crocodile", "Turtle", "Octopus", "Dragon", "Unicorn", "Phoenix", "Sloth"
  ],
 
nsfw: [
  "One-Night Stand", "Walk of Shame", "Dirty Talk", "Strip Poker", "Drunk Texting",
  "Handcuffs", "Naughty Nurse", "Pole Dancing", "Body Shot", "Morning After",
  "Friends with Benefits", "Threesome", "French Kiss", "Lingerie", "Love Bite",
  "Sex on the Beach", "Tinder Swipe", "Lap Dance", "Roleplay", "Sugar Daddy",
  "Wet T-Shirt Contest", "Truth or Dare", "Booty Call", "Mile High Club", "Blindfold",
  "Pillow Talk", "Erotic Novel", "Kama Sutra", "Whipped Cream", "Massage Oil",
  "Condom Run", "Strip Tease", "Quickie", "Dirty Dancing", "Spanking",
  "Bad Pickup Line", "Naughty Selfie", "First Time", "Bedroom Eyes", "Safe Word"
]

};