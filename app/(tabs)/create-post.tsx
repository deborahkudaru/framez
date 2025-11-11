import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { usePosts } from "../../context/PostContext";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function CreatePostScreen() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { createPost } = usePosts();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleCreatePost = async () => {
    if (!content.trim()) {
      Alert.alert("Error", "Please write something to post");
      return;
    }

    try {
      setLoading(true);
      await createPost(content);
      setContent("");
      Alert.alert("Success", "Post created successfully!");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !content.trim();

  return (
    <View className="flex-1 bg-white dark:bg-gray-950">
      {/* Header */}
      <View className="pt-15 pb-4 px-4 border-b border-gray-200 dark:border-gray-800 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="active:opacity-70"
        >
          <Ionicons
            name="close"
            size={24}
            color={colorScheme === "dark" ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black dark:text-white">
          Create Post
        </Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 p-4">
        <TextInput
          placeholder="What's on your mind?"
          placeholderTextColor={colorScheme === "dark" ? "#9ca3af" : "#6b7280"}
          value={content}
          onChangeText={setContent}
          multiline
          className="text-base min-h-[120px] text-black dark:text-white"
          style={{ textAlignVertical: "top" }}
          maxLength={500}
        />

        <Text className="text-right text-gray-600 dark:text-gray-400 mt-2 text-xs">
          {content.length}/500
        </Text>

        <TouchableOpacity
          onPress={handleCreatePost}
          disabled={isDisabled}
          className={`${
            isDisabled
              ? "bg-gray-300 dark:bg-gray-700"
              : "bg-black dark:bg-white active:opacity-80"
          } p-4 rounded-xl items-center mt-6`}
        >
          <Text
            className={`${
              isDisabled
                ? "text-gray-500 dark:text-gray-500"
                : "text-white dark:text-black"
            } text-base font-bold`}
          >
            {loading ? "Posting..." : "Post"}
          </Text>
        </TouchableOpacity>

        {/* Tips Section */}
        <View className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            💡 Tips for great posts
          </Text>
          <Text className="text-xs text-gray-600 dark:text-gray-400 leading-5">
            • Be authentic and share your thoughts{"\n"}• Keep it respectful and
            friendly{"\n"}• Engage with the community
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
