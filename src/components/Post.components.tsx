import React, { useState } from "react";
import { IonCard, IonCardContent, IonAvatar, IonIcon } from "@ionic/react";
import { heartOutline, chatbubbleOutline, repeatOutline } from "ionicons/icons";
import "./Tweet.css";

type TweetProps = {
  username: string;
  handle: string;
  content: string;
  avatar: string;
  image?: string;
  time: string;
};

const Tweet: React.FC<TweetProps> = ({
  username,
  handle,
  content,
  avatar,
  image,
  time,
}) => {
  const [liked, setLiked] = useState(false);

  return (
    <IonCard className="tweet-card">
      <IonCardContent>
        <div className="tweet-header">
          <IonAvatar>
            <img src={avatar} alt="avatar" />
          </IonAvatar>

          <div className="tweet-userInfo">
            <strong>{username}</strong>
            <span className="tweet-handle">
              @{handle} · {time}
            </span>
          </div>
        </div>

        <div className="tweet-content">{content}</div>

        {image && <img src={image} alt="tweet" className="tweet-image" />}

        <div className="tweet-actions">
          <IonIcon icon={chatbubbleOutline} />
          <IonIcon icon={repeatOutline} />
          <IonIcon
            icon={heartOutline}
            className={liked ? "liked" : ""}
            onClick={() => setLiked(!liked)}
          />
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default Tweet;
