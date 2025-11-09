import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../context/PostContext";
import PostItem from "../../components/post-item";

export default function ProfileScreen() {
  const { user } = useAuth();
  const { posts } = usePosts();

  if (!user) return null;

  const myPosts = posts.filter((p) => p.authorId === user.uid);

  return (
    <View style={styles.container}>
      {/* USER INFO */}
      <View style={styles.profileHeader}>
        {user.photoURL ? (
          <Image
            source={{ uri: user.photoURL }}
            style={styles.avatar}
          />
        ) : null}

        <Text style={styles.name}>
          {user.displayName || user.email}
        </Text>

        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* POSTS */}
      <Text style={styles.sectionTitle}>My Posts</Text>

      <FlatList
        data={myPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem post={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  email: {
    color: "#555",
    marginTop: 4,
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
  },
});
