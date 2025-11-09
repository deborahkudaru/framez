import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
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
    // ✅ Request permissions
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission denied");
      return;
    }

    // ✅ Open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.6,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    // ✅ New Expo ImagePicker format
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  }

  async function handleSubmit() {
    if (!user) return;

    await createPost({
      text,
      imageUri: image,
      author: user,
    });

    setText("");
    setImage(null);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="What's on your mind?"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

      <Button title="Pick Image" onPress={pickImage} />
      <Button title="Post" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginVertical: 10,
  },
});
