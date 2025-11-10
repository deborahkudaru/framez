import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { usePosts } from "../../context/PostContext";
import { useAuth } from "../../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Feed: undefined;
  CreatePost: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "CreatePost">;

export default function CreatePostScreen({ navigation }: Props) {
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  const { createPost } = usePosts();
  const { user } = useAuth();

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.6,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  }

  async function handleSubmit() {
    if (!user || !text.trim()) return;

    await createPost({
      text,
      imageUri: image,
      author: user,
    });

    setText("");
    setImage(null);
    navigation.goBack();
  }

  const canPost = text.trim().length > 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white dark:bg-neutral-900"
    >
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* HEADER */}
          <View className="flex-row items-center justify-between mb-6">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-full"
            >
              <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                Cancel
              </Text>
            </TouchableOpacity>

            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Create Post
            </Text>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!canPost}
              className={`px-4 py-2 rounded-full ${
                canPost
                  ? "bg-gray-900 dark:bg-white"
                  : "bg-gray-200 dark:bg-gray-800"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  canPost
                    ? "text-white dark:text-gray-900"
                    : "text-gray-400 dark:text-gray-600"
                }`}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>

          {/* USER INFO */}
          <View className="flex-row items-center mb-6">
            {user?.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                className="w-12 h-12 rounded-full mr-3"
              />
            ) : (
              <View className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white items-center justify-center mr-3">
                <Text className="text-lg font-bold text-white dark:text-gray-900">
                  {(user?.displayName || user?.email || "U")[0].toUpperCase()}
                </Text>
              </View>
            )}
            <Text className="text-base font-semibold text-gray-900 dark:text-white">
              {user?.displayName || "User"}
            </Text>
          </View>

          {/* TEXT INPUT */}
          <TextInput
            placeholder="What's on your mind?"
            placeholderTextColor="#9CA3AF"
            value={text}
            onChangeText={setText}
            multiline
            className="text-base text-gray-900 dark:text-white mb-6 min-h-[120px]"
            style={{ textAlignVertical: "top" }}
          />

          {/* IMAGE PREVIEW */}
          {image && (
            <View className="mb-6">
              <View className="relative">
                <Image
                  source={{ uri: image }}
                  className="w-full h-80 rounded-2xl"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  onPress={() => setImage(null)}
                  className="absolute top-3 right-3 bg-gray-900/80 dark:bg-white/80 w-10 h-10 rounded-full items-center justify-center"
                >
                  <Text className="text-white dark:text-gray-900 text-xl font-bold">
                    ×
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* IMAGE PICKER BUTTON */}
          <TouchableOpacity
            onPress={pickImage}
            className="bg-gray-100 dark:bg-gray-900 py-4 rounded-2xl items-center border-2 border-dashed border-gray-300 dark:border-gray-700"
          >
            <Text className="text-4xl mb-2">📷</Text>
            <Text className="text-base font-semibold text-gray-900 dark:text-white">
              {image ? "Change Image" : "Add Image"}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Optional
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
