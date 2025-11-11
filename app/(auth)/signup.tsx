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
      router.push("/(tabs)/profile");
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
          <View className="items-center mb-10">
            <View className="w-16 h-16 bg-purple-600 rounded-2xl items-center justify-center mb-4 shadow-lg">
              <Ionicons name="camera" size={32} color="#ffffff" />
            </View>
            <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400 text-center">
              Join Framez and start capturing your moments
            </Text>
          </View>

          {/* Form */}
          <View className="mb-6">
            {/* Name Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name
              </Text>
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor={colorScheme === 'dark' ? '#6b7280' : '#9ca3af'}
                value={name}
                onChangeText={setName}
                className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 rounded-xl text-base text-black dark:text-white focus:border-purple-500"
                editable={!loading}
              />
            </View>

            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={colorScheme === 'dark' ? '#6b7280' : '#9ca3af'}
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
                  placeholder="Create a password (min 6 characters)"
                  placeholderTextColor={colorScheme === 'dark' ? '#6b7280' : '#9ca3af'}
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
                    color={colorScheme === 'dark' ? '#6b7280' : '#6b7280'}
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

            {/* Sign Up Button */}
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={isDisabled}
              className={`${
                isDisabled
                  ? 'bg-gray-300 dark:bg-gray-800'
                  : 'bg-purple-600 active:bg-purple-700 shadow-lg'
              } p-4 rounded-xl items-center justify-center shadow-purple-500/25`}
            >
              <Text className={`${
                isDisabled
                  ? 'text-gray-500 dark:text-gray-400'
                  : 'text-white'
              } text-base font-semibold`}>
                {loading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center py-4">
            <Text className="text-gray-600 dark:text-gray-400 text-base">
              Already have an account?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/(auth)/login")}
              disabled={loading}
            >
              <Text className="text-purple-600 dark:text-purple-400 font-semibold text-base">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Security Notice */}
          <View className="mt-8 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <View className="flex-row items-start">
              <Ionicons 
                name="shield-checkmark" 
                size={20} 
                color={colorScheme === 'dark' ? '#8b5cf6' : '#7c3aed'} 
                className="mt-0.5 mr-3"
              />
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                  Secure & Private
                </Text>
                <Text className="text-xs text-gray-600 dark:text-gray-400 leading-5">
                  Your information is protected with enterprise-grade security measures. 
                  We never share your personal data with third parties.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}