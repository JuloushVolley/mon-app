import { IonInput, IonButton, IonItem, IonLabel } from "@ionic/react";
import React, { useRef, useState, useEffect } from "react";
import { IonCard, IonCardContent } from "@ionic/react";
import Search from "./Search";
import { initialPosts, type Post } from "../data/mockPosts";

const PostFeed: React.FC = () => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Chargement + fallback sécurisé
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
  const [audioUrl, setAudioUrl] = useState("");

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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setFormData((prev) => ({ ...prev, audio: url }));
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

  const handleCreatePost = () => {
    const content = formData.content.trim();

    if (content) {
      const newPost: Post = {
        id: Date.now(),
        username: "Vous",
        handle: "you",
        content,
        image: formData.image.trim() || undefined,
        audio: formData.audio || undefined,
        avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
        time: "now",
      };

      setPosts([newPost, ...posts]);

      if (audioUrl) {
        try {
          URL.revokeObjectURL(audioUrl);
        } catch {}
      }

      setFormData({ content: "", image: "", audio: "" });
      setSelectedImageName("");

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }

      setAudioUrl("");
    }
  };

  const handleDeletePost = (postId: number) => {
    setPosts((currentPosts) =>
      currentPosts.filter((post) => post.id !== postId),
    );
  };

  const handleDeleteAll = () => {
    setPosts([]);
  };

  // ✅ Reset localStorage
  const handleResetStorage = () => {
    localStorage.removeItem("posts");
    setPosts(initialPosts);
  };

  return (
    <div>
      <IonCard className="create-post-card">
        <IonCardContent>
          <h2>Créer un nouveau post</h2>

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

          <div style={{ textAlign: "right", margin: "6px" }}>
            {formData.content.length}/180
          </div>

          <IonItem>
            <IonLabel position="stacked">Image (optionnel)</IonLabel>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </IonItem>

          {selectedImageName && <div>Image: {selectedImageName}</div>}

          {formData.image && (
            <img src={formData.image} style={{ width: "100%" }} />
          )}

          <div style={{ marginTop: 8 }}>
            {!recording ? (
              <IonButton onClick={startRecording}>Enregistrer audio</IonButton>
            ) : (
              <IonButton color="danger" onClick={stopRecording}>
                Stop
              </IonButton>
            )}
          </div>

          {audioUrl && (
            <audio controls src={audioUrl} style={{ width: "100%" }} />
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

      {/* Boutons gestion */}
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
