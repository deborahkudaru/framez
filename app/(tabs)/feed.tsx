import React from "react";
import {
  View,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";
import { usePosts } from "../../context/PostContext";
import PostItem from "../../components/post-item";
import { useAuth } from "../../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// ✅ Define the navigation types for this screen
type RootStackParamList = {
  Feed: undefined;
  CreatePost: undefined;
  Profile: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Feed">;

export default function FeedScreen({ navigation }: Props) {
  const { posts } = usePosts();
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      {/* Header buttons */}
      <View style={styles.header}>
        <Button
          title="New Post"
          onPress={() => navigation.navigate("CreatePost")}
        />
        <Button
          title="Profile"
          onPress={() => navigation.navigate("Profile")}
        />
        <Button title="Logout" onPress={logout} />
      </View>

      {/* Posts feed */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem post={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
});
