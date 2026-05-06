import React, { useMemo, useState } from "react";
import { IonButton, IonCard, IonCardContent, IonSearchbar } from "@ionic/react";
import Tweet from "./Post.components";

export type SearchPost = {
  id: number;
  username: string;
  handle: string;
  content: string;
  avatar: string;
  time: string;
  image?: string;
  audio?: string;
};

type SearchProps = {
  posts: SearchPost[];
  onDeletePost?: (postId: number) => void;
  onDeleteAll?: () => void;
};

const Search: React.FC<SearchProps> = ({
  posts,
  onDeletePost,
  onDeleteAll,
}) => {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase().replace(/^#+/, "");

    if (!normalizedQuery) {
      return posts;
    }

    return posts.filter((post) => {
      const handle = post.handle.toLowerCase();
      const username = post.username.toLowerCase();
      const content = post.content.toLowerCase();
      const hashQuery = `#${normalizedQuery}`;

      return (
        handle.includes(normalizedQuery) ||
        username.includes(normalizedQuery) ||
        content.includes(hashQuery) ||
        content.includes(normalizedQuery)
      );
    });
  }, [posts, query]);

  return (
    <div>
      <IonCard className="search-card">
        <IonCardContent>
          <h2 style={{ margin: "0 0 12px 0" }}>Recherche par #</h2>
          <IonSearchbar
            value={query}
            placeholder="Rechercher un #hashtag"
            debounce={200}
            onIonInput={(event) => setQuery(event.detail.value || "")}
          />
          <div
            style={{
              marginTop: "8px",
              color: "var(--ion-color-medium)",
              fontSize: "0.9rem",
            }}
          >
            {filteredPosts.length} post{filteredPosts.length > 1 ? "s" : ""}{" "}
            trouvé{filteredPosts.length > 1 ? "s" : ""}
          </div>
        </IonCardContent>
      </IonCard>

      <IonButton
        expand="block"
        fill="outline"
        color="danger"
        onClick={onDeleteAll}
        disabled={posts.length === 0}
        style={{ margin: "0 10px 12px" }}
      >
        Supprimer tous les posts
      </IonButton>

      {filteredPosts.length === 0 ? (
        <div
          style={{
            margin: "16px 10px",
            color: "var(--ion-color-medium)",
            textAlign: "center",
          }}
        >
          Aucun post trouvé pour cette recherche.
        </div>
      ) : (
        filteredPosts.map((post) => (
          <Tweet
            key={post.id}
            username={post.username}
            handle={post.handle}
            content={post.content}
            avatar={post.avatar}
            time={post.time}
            image={post.image}
            audio={post.audio}
            onDelete={onDeletePost ? () => onDeletePost(post.id) : undefined}
          />
        ))
      )}
    </div>
  );
};

export default Search;
