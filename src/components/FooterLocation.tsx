import {
  IonButton,
  IonFooter,
  IonText,
  IonToolbar,
  IonSpinner,
} from "@ionic/react";
import { Geolocation } from "@capacitor/geolocation";
import { Preferences } from "@capacitor/preferences";
import { LocalNotifications } from "@capacitor/local-notifications";
import { useState, useEffect } from "react";
import "./FooterLocation.css";

const FooterLocation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [city, setCity] = useState<string | null>(null);
  const [theme, setTheme] = useState<string>("light");
  const [notifLoading, setNotifLoading] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const res = await Preferences.get({ key: "theme" });
        const t = res.value ?? "light";
        applyTheme(t);
        setTheme(t);
      } catch {
        // rien
      }
    };

    loadTheme();
  }, []);

  const applyTheme = (t: string) => {
    try {
      if (typeof document !== "undefined") {
        document.body.classList.toggle("dark", t === "dark");
      }
    } catch {
      // rien
    }
  };

  const toggleTheme = async () => {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
    try {
      await Preferences.set({ key: "theme", value: next });
    } catch {
      // rien
    }
  };

  const sendTestNotification = async () => {
    setNotifLoading(true);
    try {
      try {
        await LocalNotifications.requestPermissions();
      } catch {
        // rien
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: new Date().getTime() % 100000,
            title: "Hehe",
            body: "Yeah boyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
            extra: { source: "mon-app" },
          },
        ],
      });
    } catch (e) {
      setError("Impossible d'envoyer la notification.");
    } finally {
      setNotifLoading(false);
    }
  };

  const getCityFromCoords = async (lat: number, lng: number) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
    );

    if (!response.ok) {
      throw new Error("reverse-geocoding-failed");
    }

    const data = await response.json();
    const address = data?.address ?? {};

    return (
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county ||
      null
    );
  };

  const handleGetLocation = async () => {
    setLoading(true);
    setError(null);
    setCity(null);

    try {
      try {
        await Geolocation.requestPermissions();
      } catch {
        // Some web environments do not expose permission request APIs.
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

      try {
        const foundCity = await getCityFromCoords(
          position.coords.latitude,
          position.coords.longitude,
        );
        setCity(foundCity ?? "Inconnue");
      } catch {
        setCity("Inconnue");
      }
    } catch {
      setError("Impossible de recuperer la localisation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonFooter>
      <IonToolbar className="footer-location-toolbar">
        <div className="footer-location-content">
          <IonButton size="small" onClick={handleGetLocation} disabled={loading}>
            {loading ? "Recherche..." : "Ma position"}
          </IonButton>

          {loading && <IonSpinner name="dots" />}

          {coords && (
            <IonText className="footer-location-text">
              Lat: {coords.lat.toFixed(5)} | Lng: {coords.lng.toFixed(5)}
            </IonText>
          )}

          {city && <IonText className="footer-location-text">Ville: {city}</IonText>}

          <IonButton size="small" onClick={toggleTheme}>
            Thème: {theme === "dark" ? "Sombre" : "Clair"}
          </IonButton>

          <IonButton size="small" onClick={sendTestNotification} disabled={notifLoading}>
            {notifLoading ? "Envoi..." : "Test notif"}
          </IonButton>

          {error && (
            <IonText color="danger" className="footer-location-text">
              {error}
            </IonText>
          )}
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default FooterLocation;
