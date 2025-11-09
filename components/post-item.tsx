import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { format } from "date-fns";
import { Post } from "../context/PostContext";

type Props = {
  post: Post;
};

export default function PostItem({ post }: Props) {
  // Safely convert Firestore timestamp → JS Date
  const ts: Date =
    post.createdAt && "toDate" in post.createdAt
      ? post.createdAt.toDate()
      : new Date();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {post.authorAvatar ? (
          <Image
            source={{ uri: post.authorAvatar }}
            style={styles.avatar}
          />
        ) : null}

        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.authorName}</Text>
          <Text style={styles.time}>{format(ts, "PPpp")}</Text>
        </View>
      </View>

      {/* POST TEXT */}
      <Text style={styles.text}>{post.text}</Text>

      {/* POST IMAGE */}
      {post.imageUrl ? (
        <Image
          source={{ uri: post.imageUrl }}
          style={styles.postImage}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorInfo: {
    marginLeft: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    fontWeight: "600",
  },
  time: {
    fontSize: 12,
    color: "#666",
  },
  text: {
    marginTop: 8,
  },
  postImage: {
    width: "100%",
    height: 200,
    marginTop: 8,
    borderRadius: 8,
  },
});
