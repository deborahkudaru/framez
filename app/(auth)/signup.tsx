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

export default function SignupScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signUp({ name, email, password });
      router.push("(tabs)")
    } catch (error: any) {
      setError(error.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || !name || !email || !password;

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
          <View className="items-center mb-12">
            <View className="w-20 h-20 rounded-full bg-black dark:bg-white items-center justify-center mb-4">
              <Text className="text-3xl">🚀</Text>
            </View>
            <Text className="text-4xl font-bold mb-2 text-black dark:text-white">
              Framez
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400">
              Create your account ✨
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            {/* Name Input */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </Text>
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                value={name}
                onChangeText={setName}
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 rounded-xl text-base text-black dark:text-white"
                editable={!loading}
              />
            </View>

            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email
              </Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                value={email}
                onChangeText={setEmail}
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 rounded-xl text-base text-black dark:text-white"
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
              />
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </Text>
              <View className="relative">
                <TextInput
                  placeholder="Create a password (min 6 characters)"
                  placeholderTextColor={colorScheme === 'dark' ? '#9ca3af' : '#9ca3af'}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 rounded-xl text-base text-black dark:text-white pr-12"
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color={colorScheme === 'dark' ? '#9ca3af' : '#6b7280'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Error Message */}
            {error ? (
              <View className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-4">
                <Text className="text-red-600 dark:text-red-400 text-sm text-center">
                  {error}
                </Text>
              </View>
            ) : null}

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={isDisabled}
              className={`${
                isDisabled
                  ? 'bg-gray-300 dark:bg-gray-700'
                  : 'bg-black dark:bg-white active:opacity-80'
              } p-4 rounded-xl items-center shadow-sm`}
            >
              <Text className={`${
                isDisabled
                  ? 'text-gray-500 dark:text-gray-500'
                  : 'text-white dark:text-black'
              } text-base font-bold`}>
                {loading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/login")}
            className="p-4 items-center active:opacity-70"
          >
            <Text className="text-gray-600 dark:text-gray-400 text-base">
              Already have an account?{" "}
              <Text className="font-bold text-black dark:text-white">
                Login
              </Text>
            </Text>
          </TouchableOpacity>

          {/* Info Box */}
          <View className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <View className="flex-row items-center mb-2">
              <Ionicons 
                name="shield-checkmark" 
                size={20} 
                color={colorScheme === 'dark' ? '#60a5fa' : '#3b82f6'} 
              />
              <Text className="text-sm font-semibold text-blue-700 dark:text-blue-400 ml-2">
                Your data is secure
              </Text>
            </View>
            <Text className="text-xs text-blue-600 dark:text-blue-300 leading-5">
              We protect your information with industry-standard encryption and never share your data with third parties.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}