import { getSignedURL } from "@/actions/file";
import SubmitButton from "@/components/ui/submit-button";

export default async function TestPage() {
  const repoNames = [
    "ai-math-base",
    "algo-visualizer",
    "cs-website",
    "linktree-clone",
  ];

  const requests = repoNames.map((repo) => {
    return fetch(`https://api.github.com/repos/AjStraight619/${repo}`, {
      next: { revalidate: 3600 }, // invalidate cache after 1 hour
    });
  });

  const responses = await Promise.all(requests);
  const data = await Promise.all(responses.map((res) => res.json()));

  //   console.log(
  //     "ai-math-base updated at:",
  //     new Date(data[0].updated_at).toDateString()
  //   );

  const groupByName = data.reduce((acc, curr) => {
    acc[curr.name] = curr;
    return acc;
  }, {});

  console.log(typeof groupByName);

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const file: File | null = formData.get("image") as File | null;
    console.log("File:", file);
    const signedUrl = await getSignedURL();
    if (signedUrl?.success?.url && file) {
      const url = signedUrl.success.url;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file?.type,
        },
      });
      if (res.ok) {
        console.log("Image uploaded successfully");
      }
    }
  };

  return (
    <main className="flex items-center justify-center">
      <form action={handleSubmit}>
        <input name="image" type="file" />
        <SubmitButton>Submit</SubmitButton>
      </form>
    </main>
  );
}
