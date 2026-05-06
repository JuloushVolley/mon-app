import React, { useState } from "react";
import { IonCard, IonCardContent, IonAvatar, IonIcon } from "@ionic/react";
import {
  heartOutline,
  heart,
  chatbubbleOutline,
  repeatOutline,
  repeat,
} from "ionicons/icons";

import "./Tweet.css";

type TweetProps = {
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
  const [comments, setComments] = useState<string[]>([]);

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
    const text = window.prompt(`Ajouter un commentaire pour: "${content}"`);

    if (!text || !text.trim()) {
      return;
    }

    setComments((prevComments) => [...prevComments, text.trim()]);
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

        {image && (
          <div className="tweet-media">
            <img src={image} alt="post" className="tweet-image" />
          </div>
        )}

        <div className="tweet-actions">
          <div className="action-group">
            <IonIcon icon={chatbubbleOutline} onClick={handleComment} />
            <span className="action-count">
              {comments.length > 0 ? comments.length : ""}
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

export default Tweet;
