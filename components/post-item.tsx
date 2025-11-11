import React from "react";
import { View, Text, Image } from "react-native";

interface PostItemProps {
  post: {
    id: string;
    userName: string;
    userEmail: string;
    content: string;
    imageUrl?: string;
    createdAt: any;
  };
}

export default function PostItem({ post }: PostItemProps) {
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Recently";

    const date = timestamp.toDate();
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <View className="bg-white dark:bg-gray-900 rounded-xl p-4 mb-4 border border-gray-200 dark:border-gray-800 shadow-sm">
      {/* User Info */}
      <View className="flex-row items-center mb-3">
        <View className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-500 dark:to-purple-600 items-center justify-center mr-3">
          <Text className="text-base font-bold text-white">
            {post.userName?.[0]?.toUpperCase() || "U"}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold text-black dark:text-white">
            {post.userName || "Anonymous"}
          </Text>
          <Text className="text-xs text-gray-600 dark:text-gray-400">
            {formatDate(post.createdAt)}
          </Text>
        </View>
      </View>

      {/* Post Content */}
      <Text className="text-base leading-6 text-gray-900 dark:text-gray-100 mb-3">
        {post.content}
      </Text>

      {/* Post Image */}
      {post.imageUrl && (
        <View className="rounded-lg overflow-hidden">
          <Image
            source={{ uri: post.imageUrl }}
            className="w-full h-52"
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );
}
