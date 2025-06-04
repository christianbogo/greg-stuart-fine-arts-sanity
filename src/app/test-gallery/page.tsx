import { client } from "../../lib/sanity.client";
import { groq } from "next-sanity";

async function getArtworks() {
  const query = groq`*[_type == "artwork"]{title, "imageUrl": mainImage.asset->url }`;
  return client.fetch(query);
}

export default async function TestGalleryPage() {
  const artworks = await getArtworks();

  return (
    <div>
      <h1>Artworks</h1>
      {artworks && artworks.length > 0 ? (
        <ul>
          {artworks.map((artwork: any) => (
            <li key={artwork.title}>
              <h2>{artwork.title}</h2>
              {artwork.imageUrl && (
                <img src={artwork.imageUrl} alt={artwork.title} width="200" />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No artworks found.</p>
      )}
    </div>
  );
}
export const revalidate = 60;
