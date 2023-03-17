import Results from "@/components/Results";

const API_KEY = process.env.API_KEY;

export default async function Home({searchParams}) {

  const genre = searchParams.genre || 'fetchTrending';

  const URL = `https://api.themoviedb.org/3/${genre==='fetchTopRated'?"movie/top_rated":"trending/all/week"}?api_key=${API_KEY}&language=en-US&page=1`;

  const res = await fetch(URL, {
    next:{revalidate:100000}
  });

  if(!res.ok) {
    console.log("error aa rha hai!");
    throw new Error('Failed to Load Movie Data');
  }

  const data = await res.json();
  const results = data.results;

  return (
  <>
    <div>
      <Results results={results} />
    </div>
  </>
  );
};
