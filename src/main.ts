type Person = {
  readonly id: number;
  readonly name: string;
  birth_year: number;
  death_year?: number;
  biography: string;
  image: string;
};

type Nationality =
  | "American"
  | "British"
  | "Australian"
  | "Israeli-American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese";

type Actress = Person & {
  most_famous_movies: [string, string, string];
  awards: string;
  nationality: Nationality;
};

function isActress(data: any): data is Actress {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "number" &&
    typeof data.name === "string" &&
    typeof data.birth_year === "number" &&
    (typeof data.death_year === "undefined" ||
      typeof data.death_year === "number") &&
    typeof data.biography === "string" &&
    typeof data.image === "string" &&
    Array.isArray(data.most_famous_movies) &&
    data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every((movie: any) => typeof movie === "string") &&
    typeof data.awards === "string" &&
    [
      "American",
      "British",
      "Australian",
      "Israeli-American",
      "South African",
      "French",
      "Indian",
      "Israeli",
      "Spanish",
      "South Korean",
      "Chinese",
    ].includes(data.nationality)
  );
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    if (!response.ok) return null;

    const data = await response.json();
    return isActress(data) ? data : null;
  } catch {
    return null;
  }
}

// Esempio di utilizzo
getActress(1).then((actress) => {
  if (actress) {
    console.log("Actress found:", actress);
  } else {
    console.log("Actress not found or invalid data.");
  }
});
