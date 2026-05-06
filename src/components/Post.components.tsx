import React, { useState } from "react";
import { IonCard, IonCardContent, IonAvatar, IonIcon } from "@ionic/react";
import {
  heartOutline,
  heart,
  chatbubbleOutline,
  repeatOutline,
  repeat,
} from "ionicons/icons";
import { IonInput, IonButton, IonItem, IonLabel } from "@ionic/react";
import "./Tweet.css";

type TweetProps = {
  username: string;
  handle: string;
  content: string;
  avatar: string;
  time: string;
  image?: string;
};

type Post = {
  id: number;
  username: string;
  handle: string;
  content: string;
  avatar: string;
  time: string;
  image?: string;
};

const Tweet: React.FC<TweetProps> = ({
  username,
  handle,
  content,
  avatar,
  time,
  image,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [retweeted, setRetweeted] = useState(false);
  const [retweetCount, setRetweetCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleRetweet = () => {
    if (retweeted) {
      setRetweetCount(retweetCount - 1);
    } else {
      setRetweetCount(retweetCount + 1);
    }
    setRetweeted(!retweeted);
  };

  const handleComment = () => {
    setCommentCount(commentCount + 1);
    alert(`Ajouter un commentaire pour: "${content}"`);
  };

  return (
    <IonCard className="tweet-card">
      <IonCardContent>
        <div className="tweet-header">
          <IonAvatar>
            <img src={avatar} alt="avatar" />
          </IonAvatar>

          <div className="tweet-user">
            <strong>{username}</strong>
            <span>
              @{handle} · {time}
            </span>
          </div>
        </div>

        <div className="tweet-content">{content}</div>

        {image && <img src={image} alt="post" className="tweet-image" />}

        <div className="tweet-actions">
          <div className="action-group">
            <IonIcon icon={chatbubbleOutline} onClick={handleComment} />
            <span className="action-count">
              {commentCount > 0 ? commentCount : ""}
            </span>
          </div>

          <div className="action-group">
            <IonIcon
              icon={retweeted ? repeat : repeatOutline}
              onClick={handleRetweet}
              className={retweeted ? "retweeted" : ""}
            />
            <span className="action-count">
              {retweetCount > 0 ? retweetCount : ""}
            </span>
          </div>

          <div className="action-group">
            <IonIcon
              icon={liked ? heart : heartOutline}
              onClick={handleLike}
              className={liked ? "liked" : ""}
            />
            <span className="action-count">
              {likeCount > 0 ? likeCount : ""}
            </span>
          </div>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

const PostFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: "John Doe",
      handle: "johndoe",
      content: "Hello, this is my first post!",
      avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
      time: "2h",
    },
  ]);

  const [formData, setFormData] = useState({
    username: "",
    handle: "",
    content: "",
    image: "",
  });

  const handleCreatePost = () => {
    if (formData.username && formData.handle && formData.content) {
      const newPost: Post = {
        id: posts.length + 1,
        ...formData,
        avatar: "https://ionicframework.com/docs/img/demos/avatar.svg",
        time: "now",
      };
      setPosts([newPost, ...posts]);
      setFormData({ username: "", handle: "", content: "", image: "" });
    }
  };

  return (
    <div>
      <IonCard className="create-post-card">
        <IonCardContent>
          <h2 style={{ margin: "0 0 15px 0" }}>Créer un nouveau post</h2>
          <IonItem>
            <IonLabel position="floating">Nom d'utilisateur</IonLabel>
            <IonInput
              type="text"
              value={formData.username}
              onIonChange={(e) =>
                setFormData({ ...formData, username: e.detail.value || "" })
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Handle (@)</IonLabel>
            <IonInput
              type="text"
              value={formData.handle}
              onIonChange={(e) =>
                setFormData({ ...formData, handle: e.detail.value || "" })
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Contenu</IonLabel>
            <IonInput
              type="text"
              value={formData.content}
              onIonChange={(e) =>
                setFormData({ ...formData, content: e.detail.value || "" })
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">URL Image (optionnel)</IonLabel>
            <IonInput
              type="text"
              value={formData.image}
              onIonChange={(e) =>
                setFormData({ ...formData, image: e.detail.value || "" })
              }
            />
          </IonItem>
          <IonButton
            expand="block"
            onClick={handleCreatePost}
            style={{ marginTop: "10px" }}
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
