import { sanityFetch } from "../live";
import { defineQuery } from "groq";
import { SearchSubredditsQueryResult } from "../../../../sanity.types";

export async function searchSubreddits(searchTerm: string): Promise<SearchSubredditsQueryResult> {
  // Skip empty search terms
  if (!searchTerm?.trim()) {
    return [];
  }

  const searchSubredditsQuery = defineQuery(`
    *[_type == "subreddit" && title match $searchTerm + "*"] {
      _id,
      title,
      "slug": slug.current,
      description,
      image,
      "moderator": moderator-> {
        _id,
        username
      },
      createdAt
    } | order(createdAt desc)
  `);

  try {
    const results = await sanityFetch({
      query: searchSubredditsQuery,
      params: { searchTerm: searchTerm.toLowerCase() },
    });

      console.log("searchSubreddits")
      console.log(results)
    return results?.data || [];

  } catch (error) {
    console.error("Failed to search subreddits:", error);
    return [];
  }
}