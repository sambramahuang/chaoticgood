import { Sword } from "lucide-react";

export type CategoryKey =
  | "footballers"
  | "disneyCharacters"
  | "internetSlang"
  | "anime"
  | "kpop"
  | "movies"
  | "videogames"
  | "superheroes"
  | "famousHistoricalFigures"
  | "cartoonCharacters"
  | "internetCelebrities"
  | "countriesAndCities"
  | "animals"
  | "foodAndDrinks";

export const categories: Record<CategoryKey, string[]> = {
  footballers: [
    "Lionel Messi", "Cristiano Ronaldo", "Neymar", "Son Heung-min", "Kylian Mbappé", "Mohamed Salah", "Erling Haaland", "Karim Benzema", "Luka Modrić", "Robert Lewandowski",
    "Sergio Ramos", "Kevin De Bruyne", "Paul Pogba", "Gareth Bale", "Virgil van Dijk", "Thiago Silva", "Phil Foden", "Marcus Rashford", "Bruno Fernandes", "Vinícius Jr."
  ],
  disneyCharacters: [
    "Mulan", "Simba", "Elsa", "Woody", "Ariel", "Belle", "Jasmine", "Aladdin", "Pocahontas", "Snow White",
    "Rapunzel", "Tiana", "Cinderella", "Olaf", "Mickey Mouse", "Donald Duck", "Goofy", "Hercules", "Tarzan", "Scar"
  ],
  internetSlang: [
    "yeet", "simp", "ratio", "cap", "rizz", "sus", "mid", "based", "bet", "slay",
    "gyatt", "goated", "stan", "flex", "no cap", "drip", "hits different", "pressed", "bruh", "L + ratio"
  ],
  anime: [
    "Luffy", "Naruto", "Goku", "Attack on Titan", "Sword Art Online", "One Punch Man", "Deku", "Sasuke", "Itachi", "Vegeta",
    "Zoro", "Hinata Hyuga", "Light Yagami", "Ryuk", "Nezuko", "Tanjiro", "Levi Ackerman", "Mikasa", "Gojo Satoru", "Megumi Fushiguro"
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
    "Minecraft", "Fortnite", "League of Legends", "Call of Duty", "Among Us", "Overwatch", "Valorant", "PUBG", "Elden Ring", "Zelda: Breath of the Wild",
    "Super Mario", "Animal Crossing", "Apex Legends", "Roblox", "Halo", "The Witcher", "Street Fighter", "Tekken", "Resident Evil", "Cyberpunk 2077"
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
  internetCelebrities: [
    "MrBeast", "PewDiePie", "Doge", "Khaby Lame", "Nyan Cat", "Markiplier", "Pokimane", "Dream", "Ninja", "Belle Delphine",
    "Logan Paul", "KSI", "Charli D'Amelio", "Addison Rae", "Shroud", "Corpse Husband", "Jacksepticeye", "Technoblade", "Emma Chamberlain", "Hasbulla"
  ],
  countriesAndCities: [
    "Singapore", "Tokyo", "Paris", "London", "New York", "Bangkok", "Dubai", "Seoul", "Rome", "Barcelona",
    "Sydney", "Los Angeles", "Berlin", "Shanghai", "Hong Kong", "Moscow", "Istanbul", "Cairo", "Rio de Janeiro", "Cape Town"
  ],
  animals: [
    "Cat", "Dog", "Lion", "Tiger", "Elephant", "Giraffe", "Kangaroo", "Panda", "Koala", "Penguin",
    "Eagle", "Shark", "Dolphin", "Crocodile", "Turtle", "Octopus", "Dragon", "Unicorn", "Phoenix", "Sloth"
  ],
  foodAndDrinks: [
    "Pizza", "Burger", "Sushi", "Ramen", "Steak", "Pasta", "Tacos", "Fried Chicken", "Ice Cream", "Cake",
    "Coca-Cola", "Beer", "Wine", "Whiskey", "Smoothie", "Bubble Tea", "Hotpot", "Donut", "Croissant", "Fries"
  ]
};