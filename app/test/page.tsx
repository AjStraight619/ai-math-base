export default async function TestPage() {
  const repoNames = [
    "ai-math-base",
    "algo-visualizer",
    "cs-website",
    "linktree-clone",
  ];

  const requests = repoNames.map((repo) => {
    return fetch(`https://api.github.com/repos/AjStraight619/${repo}`);
  });

  const responses = await Promise.all(requests);
  const data = await Promise.all(responses.map((res) => res.json()));

  console.log(
    "ai-math-base updated at:",
    new Date(data[0].updated_at).toDateString()
  );

  return (
    <main className="flex items-center justify-center">
      <pre>{JSON.stringify(data[0], null, 2)}</pre>
    </main>
  );
}
