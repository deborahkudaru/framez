import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await login(email, password);
    } catch (error: any) {
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !email || !password;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white dark:bg-gray-950"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-8">
          {/* Header */}
          <View className="items-center mb-10">
            <View className="w-16 h-16 bg-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
              <Ionicons name="camera" size={32} color="#ffffff" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400 text-center">
              Sign in to continue your Framez journey
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={
                  colorScheme === "dark" ? "#6b7280" : "#9ca3af"
                }
                value={email}
                onChangeText={setEmail}
                className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 rounded-xl text-base text-black dark:text-white focus:border-purple-500"
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor={
                    colorScheme === "dark" ? "#6b7280" : "#9ca3af"
                  }
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 rounded-xl text-base text-black dark:text-white pr-12 focus:border-purple-500"
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                  disabled={loading}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color={colorScheme === "dark" ? "#6b7280" : "#6b7280"}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Error Message */}
            {error ? (
              <View className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4">
                <View className="flex-row items-center">
                  <Ionicons
                    name="warning"
                    size={20}
                    color="#dc2626"
                    className="mr-2"
                  />
                  <Text className="text-red-600 dark:text-red-400 text-sm flex-1">
                    {error}
                  </Text>
                </View>
              </View>
            ) : null}

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={isDisabled}
              className={`${
                isDisabled
                  ? "bg-gray-300 dark:bg-gray-800"
                  : "bg-purple-600 active:bg-purple-700 shadow-lg"
              } p-4 rounded-xl items-center justify-center shadow-purple-500/25`}
            >
              <Text
                className={`${
                  isDisabled ? "text-gray-500 dark:text-gray-400" : "text-white"
                } text-base font-semibold`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center py-4">
            <Text className="text-gray-600 dark:text-gray-400 text-base">
              Dont have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/signup")}
              disabled={loading}
            >
              <Text className="text-purple-600 dark:text-purple-400 font-semibold text-base">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quick Access Notice */}
          <View className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <View className="flex-row items-start">
              <Ionicons
                name="flash"
                size={20}
                color={colorScheme === "dark" ? "#8b5cf6" : "#7c3aed"}
                className="mt-0.5 mr-3"
              />
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Quick Access
                </Text>
                <Text className="text-xs text-gray-600 dark:text-gray-400 leading-5">
                  Securely access your photos and videos across all your
                  devices. Your memories are always within reach.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
