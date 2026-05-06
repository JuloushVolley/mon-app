import {
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import React, { useRef, useState, useEffect } from "react";
import Search from "./Search";
import { initialPosts, type Post } from "../data/mockPosts";

const PostFeed: React.FC = () => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Chargement depuis localStorage
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const stored = localStorage.getItem("posts");
      const parsed = stored ? JSON.parse(stored) : null;

      if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
        return initialPosts;
      }

      return parsed;
    } catch {
      return initialPosts;
    }
  });

  // ✅ Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const [formData, setFormData] = useState({
    content: "",
    image: "",
    audio: "",
  });

  const [selectedImageName, setSelectedImageName] = useState("");
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );

  // ✅ Image → base64
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

  // ✅ AUDIO → base64 (FIX PRINCIPAL)
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });

        const reader = new FileReader();

        reader.onloadend = () => {
          const base64Audio = reader.result as string;

          setFormData((prev) => ({
            ...prev,
            audio: base64Audio,
          }));
        };

        reader.readAsDataURL(blob);

        stream.getTracks().forEach((t) => t.stop());
      };

      mr.start();
      setMediaRecorder(mr);
      setRecording(true);
    } catch {
      alert("Impossible d'accéder au micro.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
      setMediaRecorder(null);
    }
  };

  // ✅ Création post
  const handleCreatePost = () => {
    const content = formData.content.trim();

    if (!content) return;

    const newPost: Post = {
      id: Date.now(),
      username: "Vous",
      handle: "you",
      content,
      image: formData.image || undefined,
      audio: formData.audio || undefined,
      avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
      time: "now",
    };

    setPosts([newPost, ...posts]);

    // reset
    setFormData({ content: "", image: "", audio: "" });
    setSelectedImageName("");

    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleDeletePost = (postId: number) => {
    setPosts((current) => current.filter((p) => p.id !== postId));
  };

  const handleDeleteAll = () => {
    setPosts([]);
  };

  const handleResetStorage = () => {
    localStorage.removeItem("posts");
    setPosts(initialPosts);
  };

  return (
    <div>
      <IonCard>
        <IonCardContent>
          <h2>Créer un post</h2>

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

          <div style={{ textAlign: "right" }}>
            {formData.content.length}/180
          </div>

          <IonItem>
            <IonLabel position="stacked">Image</IonLabel>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </IonItem>

          {selectedImageName && <div>📷 {selectedImageName}</div>}

          {formData.image && (
            <img src={formData.image} style={{ width: "100%" }} />
          )}

          <div style={{ marginTop: 10 }}>
            {!recording ? (
              <IonButton onClick={startRecording}>🎤 Enregistrer</IonButton>
            ) : (
              <IonButton color="danger" onClick={stopRecording}>
                ⛔ Stop
              </IonButton>
            )}
          </div>

          {formData.audio && (
            <>
              <div>🎧 Audio prêt</div>
              <audio controls src={formData.audio} style={{ width: "100%" }} />
            </>
          )}

          <IonButton
            expand="block"
            onClick={handleCreatePost}
            disabled={!formData.content.trim()}
          >
            Publier
          </IonButton>
        </IonCardContent>
      </IonCard>

      <IonButton expand="block" color="danger" onClick={handleDeleteAll}>
        Supprimer tous les posts
      </IonButton>

      <IonButton expand="block" fill="outline" onClick={handleResetStorage}>
        Reset stockage
      </IonButton>

      <Search
        posts={posts}
        onDeletePost={handleDeletePost}
        onDeleteAll={handleDeleteAll}
      />
    </div>
  );
};

export default PostFeed;
