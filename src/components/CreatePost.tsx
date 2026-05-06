import { IonInput, IonButton, IonItem, IonLabel } from "@ionic/react";
import React, { useRef, useState } from "react";
import { IonCard, IonCardContent } from "@ionic/react";
import Tweet from "./Post.components";
type Post = {
  id: number;
  username: string;
  handle: string;
  content: string;
  avatar: string;
  time: string;
  image?: string;
};

const PostFeed: React.FC = () => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: "Vous",
      handle: "you",
      content: "Premier post",
      avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
      time: "now",
    },
  ]);

  const [formData, setFormData] = useState({
    content: "",
    image: "",
  });

  const [selectedImageName, setSelectedImageName] = useState("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setFormData({ ...formData, image: "" });
      setSelectedImageName("");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFormData({
        ...formData,
        image: typeof reader.result === "string" ? reader.result : "",
      });
    };

    reader.readAsDataURL(file);
    setSelectedImageName(file.name);
  };

  const handleCreatePost = () => {
    const content = formData.content.trim();

    if (content) {
      const newPost: Post = {
        id: Date.now(),
        username: "Vous",
        handle: "you",
        content,
        image: formData.image.trim() || undefined,
        avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
        time: "now",
      };
      setPosts([newPost, ...posts]);
      setFormData({ content: "", image: "" });
      setSelectedImageName("");

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <IonCard className="create-post-card">
        <IonCardContent>
          <h2 style={{ margin: "0 0 15px 0" }}>Créer un nouveau post</h2>

          <IonItem>
            <IonInput
              type="text"
              placeholder="Contenu"
              maxlength={180}
              value={formData.content}
              onIonInput={(e) =>
                setFormData({
                  ...formData,
                  content: (e.detail.value || "").slice(0, 180),
                })
              }
            />
          </IonItem>
          <div style={{ textAlign: "right", margin: "6px 4px 12px", fontSize: "0.9rem", color: "var(--ion-color-medium)" }}>
            {formData.content.length}/180 caractères
          </div>
          <IonItem>
            <IonLabel position="stacked">Image depuis mon PC (optionnel)</IonLabel>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ width: "100%", padding: "10px 0" }}
            />
          </IonItem>
          {selectedImageName && (
            <div style={{ margin: "8px 4px 12px", fontSize: "0.9rem", color: "var(--ion-color-medium)" }}>
              Image sélectionnée: {selectedImageName}
            </div>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="Prévisualisation"
              style={{ width: "100%", maxHeight: "220px", objectFit: "cover", borderRadius: "12px", marginTop: "8px" }}
            />
          )}
          <IonButton
            expand="block"
            onClick={handleCreatePost}
            style={{ marginTop: "10px" }}
            disabled={!formData.content.trim()}
          >
            Publier
          </IonButton>
        </IonCardContent>
      </IonCard>

      {posts.map((post) => (
        <Tweet
          key={post.id}
          username={post.username}
          handle={post.handle}
          content={post.content}
          avatar={post.avatar}
          time={post.time}
          image={post.image}
        />
      ))}
    </div>
  );
};

export default PostFeed;
