export type CategoryKey = "footballers" | "disneyCharacters" | "internetSlang" | "anime" | "kpop" | "movies";
export const categories: Record<CategoryKey, string[]> = {
  footballers: ["Lionel Messi", "Cristiano Ronaldo", "Neymar", "Son Heung-min"],
  disneyCharacters: ["Mulan", "Simba", "Elsa", "Woody"],
  internetSlang: ["yeet", "simp", "ratio", "cap"],
  anime: ["Luffy", "Naruto", "Goku", "Deku"],
  kpop: ["Jennie", "Jimin", "IU", "NewJeans"],
  movies: ["Inception", "Titanic", "Parasite", "Spirited Away"]
};