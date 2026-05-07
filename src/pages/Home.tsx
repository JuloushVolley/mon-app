import { IonContent, IonPage } from "@ionic/react";

import Header from "../components/Header";
import FooterLocation from "../components/FooterLocation";
import "./Home.css";

import PostFeed from "../components/CreatePost";
const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <PostFeed />
      </IonContent>
      <FooterLocation />
    </IonPage>
  );
};

export default Home;
