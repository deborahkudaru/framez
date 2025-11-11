import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { usePosts } from "../../context/PostContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig";

export default function CreatePostScreen() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createPost } = usePosts();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to upload images."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
      console.error("Image picker error:", error);
    }
  };

  const uploadImage = async (uri: string): Promise<string> => {
    setUploading(true);
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      // Create unique filename
      const filename = `posts/${Date.now()}-${Math.random().toString(36)}.jpg`;
      const storageRef = ref(storage, filename);

      // Upload to Firebase Storage
      const snapshot = await uploadBytes(storageRef, blob);

      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Upload error:", error);
      throw new Error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  const handleCreatePost = async () => {
    if (!content.trim() && !image) {
      Alert.alert("Error", "Please write something or add an image to post");
      return;
    }

    try {
      setLoading(true);

      let imageUrl: string | undefined = undefined; // Change this line
      if (image) {
        imageUrl = await uploadImage(image);
      }

      await createPost(content, imageUrl);
      setContent("");
      setImage(null);
      Alert.alert("Success", "Post created successfully!");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || uploading || (!content.trim() && !image);

  return (
    <View className="flex-1 bg-white dark:bg-gray-950">
      {/* Header */}
      <View className="pt-15 pb-4 px-6 border-b border-gray-200 dark:border-gray-800 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="active:opacity-70 p-2"
          disabled={loading}
        >
          <Ionicons
            name="close"
            size={24}
            color={colorScheme === "dark" ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900 dark:text-white">
          Create Post
        </Text>
        <TouchableOpacity
          onPress={handleCreatePost}
          disabled={isDisabled}
          className="p-2"
        >
          <Text
            className={`${
              isDisabled
                ? "text-gray-400 dark:text-gray-600"
                : "text-purple-600 dark:text-purple-400 font-semibold"
            } text-base`}
          >
            {loading ? "Posting..." : "Post"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {/* Content Input */}
        <TextInput
          placeholder="Share your thoughts with the community..."
          placeholderTextColor={colorScheme === "dark" ? "#6b7280" : "#9ca3af"}
          value={content}
          onChangeText={setContent}
          multiline
          className="text-lg min-h-[120px] text-gray-900 dark:text-white leading-6 mb-4"
          style={{ textAlignVertical: "top" }}
          maxLength={500}
          editable={!loading && !uploading}
        />

        {/* Image Preview */}
        {image && (
          <View className="mb-4 relative">
            <Image
              source={{ uri: image }}
              className="w-full h-64 rounded-xl"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={removeImage}
              disabled={loading || uploading}
              className="absolute top-2 right-2 bg-black/70 rounded-full p-2"
            >
              <Ionicons name="close" size={16} color="#fff" />
            </TouchableOpacity>
            {uploading && (
              <View className="absolute inset-0 bg-black/50 rounded-xl items-center justify-center">
                <ActivityIndicator size="large" color="#fff" />
                <Text className="text-white mt-2 font-medium">
                  Uploading image...
                </Text>
              </View>
            )}
          </View>
        )}

        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            {content.length}/500 characters
          </Text>

          {/* Add Image Button */}
          <TouchableOpacity
            className="flex-row items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg active:bg-gray-200 dark:active:bg-gray-700"
            onPress={pickImage}
            disabled={loading || uploading}
          >
            {uploading ? (
              <ActivityIndicator
                size="small"
                color={colorScheme === "dark" ? "#9ca3af" : "#6b7280"}
              />
            ) : (
              <Ionicons
                name="image-outline"
                size={20}
                color={colorScheme === "dark" ? "#9ca3af" : "#6b7280"}
                className="mr-2"
              />
            )}
            <Text className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              {uploading ? "Uploading..." : "Add Image"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Main Post Button */}
        <TouchableOpacity
          onPress={handleCreatePost}
          disabled={isDisabled}
          className={`${
            isDisabled
              ? "bg-gray-300 dark:bg-gray-800"
              : "bg-purple-600 active:bg-purple-700 shadow-lg shadow-purple-500/25"
          } p-4 rounded-xl items-center justify-center mt-8 mb-6`}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text
              className={`${
                isDisabled ? "text-gray-500 dark:text-gray-400" : "text-white"
              } text-base font-semibold`}
            >
              Publish Post
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
