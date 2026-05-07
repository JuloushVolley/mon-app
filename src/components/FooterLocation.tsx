import {
  IonButton,
  IonFooter,
  IonText,
  IonToolbar,
  IonSpinner,
} from "@ionic/react";
import { Geolocation } from "@capacitor/geolocation";
import { useState } from "react";
import "./FooterLocation.css";

const FooterLocation: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [city, setCity] = useState<string | null>(null);

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
      const permissionStatus = await Geolocation.checkPermissions();

      if (permissionStatus.location !== "granted") {
        const requested = await Geolocation.requestPermissions();

        if (requested.location !== "granted") {
          setError(
            "Autorise la localisation dans les permissions de l'application.",
          );
          return;
        }
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
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      const normalized = message.toLowerCase();

      if (normalized.includes("denied")) {
        setError(
          "Permission refusee. Active la localisation pour l'application.",
        );
      } else if (normalized.includes("location services are not enabled")) {
        setError("Le service de localisation du telephone est desactive.");
      } else if (normalized.includes("timeout")) {
        setError(
          "Temps d'attente depasse. Essaie en exterieur ou pres d'une fenetre.",
        );
      } else {
        setError("Impossible de recuperer la localisation.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonFooter>
      <IonToolbar className="footer-location-toolbar">
        <div className="footer-location-content">
          <IonButton
            size="small"
            onClick={handleGetLocation}
            disabled={loading}
          >
            {loading ? "Recherche..." : "Ma position"}
          </IonButton>

          {loading && <IonSpinner name="dots" />}

          {coords && (
            <IonText className="footer-location-text">
              Lat: {coords.lat.toFixed(5)} | Lng: {coords.lng.toFixed(5)}
            </IonText>
          )}

          {city && (
            <IonText className="footer-location-text">Ville: {city}</IonText>
          )}

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
