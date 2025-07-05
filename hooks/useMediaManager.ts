import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const MAX_MEDIA_FILES = 6;

export function useMediaManager() {
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCamera = async () => {
    if (mediaFiles.length >= MAX_MEDIA_FILES) {
      setError("You can only upload up to 6 files.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) {
        setError("Camera permission denied.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        mediaTypes: ["images", "videos", "livePhotos"],
      });

      if (!result.canceled && result.assets?.length) {
        const newUri = result.assets[0].uri;

        setMediaFiles((prev) =>
          prev.length < MAX_MEDIA_FILES ? [...prev, newUri] : prev
        );
      }
    } catch {
      setError("Something went wrong with the camera.");
    } finally {
      setLoading(false);
    }
  };

  const handleLibrary = async (options?: {
    single?: boolean;
  }): Promise<string[] | string | null> => {
    if (mediaFiles.length >= MAX_MEDIA_FILES) {
      setError("You can only upload up to 6 files.");
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        setError("Media library permission denied.");
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [1, 1],
        quality: 1,
        mediaTypes: ["images", "videos"],
        allowsMultipleSelection: !options?.single,
      });

      if (!result.canceled && result.assets?.length) {
        const incomingUris = result.assets.map((a) => a.uri);

        const availableSlots = MAX_MEDIA_FILES - mediaFiles.length;
        const limitedUris = incomingUris.slice(0, availableSlots);

        setMediaFiles((prev) => [...prev, ...limitedUris]);

        return options?.single ? limitedUris[0] || null : limitedUris;
      }
    } catch (err) {
      setError("Something went wrong with media picker.");
    } finally {
      setLoading(false);
    }

    return null;
  };

  return {
    mediaFiles,
    setMediaFiles,
    loading,
    error,
    handleCamera,
    handleLibrary,
  };
}
