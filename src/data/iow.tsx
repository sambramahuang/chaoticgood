import { Sword } from "lucide-react";

export type CategoryKey =
  | "soccer"
  | "disney"
  | "internetSlang"
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
  ;

export const categories: Record<CategoryKey, string[]> = {
  soccer: [
    "Lionel Messi", "Cristiano Ronaldo", "Kylian Mbappé", "Mohamed Salah", "Son Heung-min",
    "Bicycle Kick", "Free Kick", "Offside", "Penalty Shootout", "Corner Kick",
    "Tottenham Hotspur", "PSG", "Real Madrid", "Manchester United", "Juventus",
    "World Cup", "Champions League", "Euros", "Yellow Card", "Hat Trick", "Dribbling", "Tiki-Taka", "Goalkeeper", "Extra Time"
  ],
  disney: [
    "Mickey Mouse", "Elsa", "Simba", "Woody", "Ariel",
    "The Lion King", "Frozen", "Toy Story", "Aladdin", "Mulan",
    "Belle", "Cinderella", "Pocahontas", "Snow White", "Rapunzel",
    "The Little Mermaid", "Beauty and the Beast", "Hercules", "Tarzan", "Olaf"
  ],
  internetSlang: [
    "yeet", "simp", "ratio", "cap", "rizz", "sus", "mid", "based", "bet", "slay",
    "gyatt", "goated", "stan", "flex", "no cap", "drip", "hits different", "pressed", "bruh", "L + ratio"
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
  ]
};