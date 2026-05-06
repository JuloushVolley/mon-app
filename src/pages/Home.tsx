import { IonContent, IonPage } from "@ionic/react";

import Header from "../components/Header";
import "./Home.css";
import PostFeed from "../components/Post.components";

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <PostFeed />
      </IonContent>
    </IonPage>
  );
};

export default Home;
