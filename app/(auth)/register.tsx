import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type Props = NativeStackScreenProps<AuthStackParamList, "SignUp">;

export default function Register({ navigation }: Props) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signUp } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSignUp() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signUp({ name, email, password });
    } catch (e: any) {
      setError(e.message ?? "Account creation failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white dark:bg-neutral-900"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6 py-12">
          {/* LOGO/BRAND */}
          <View className="items-center mb-12">
            <View className="w-20 h-20 rounded-full bg-gray-900 dark:bg-white items-center justify-center mb-4">
              <Text className="text-4xl">📱</Text>
            </View>
            <Text className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Framez
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400">
              Create your account
            </Text>
          </View>

          {/* SIGN UP FORM */}
          <View className="mb-6">
            {/* NAME INPUT */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Full Name
              </Text>
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  setError("");
                }}
                autoCapitalize="words"
                className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-4 rounded-xl text-base"
              />
            </View>

            {/* EMAIL INPUT */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Email
              </Text>
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError("");
                }}
                autoCapitalize="none"
                keyboardType="email-address"
                className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-4 rounded-xl text-base"
              />
            </View>

            {/* PASSWORD INPUT */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Password
              </Text>
              <TextInput
                placeholder="Create a password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setError("");
                }}
                secureTextEntry
                className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-4 rounded-xl text-base"
              />
            </View>

            {/* ERROR MESSAGE */}
            {error ? (
              <View className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4">
                <Text className="text-red-600 dark:text-red-400 text-sm">
                  {error}
                </Text>
              </View>
            ) : null}

            {/* SIGN UP BUTTON */}
            <TouchableOpacity
              onPress={handleSignUp}
              disabled={loading}
              className={`py-4 rounded-xl items-center ${
                loading
                  ? "bg-gray-400 dark:bg-gray-700"
                  : "bg-gray-900 dark:bg-white"
              }`}
            >
              <Text
                className={`text-base font-bold ${
                  loading
                    ? "text-gray-200 dark:text-gray-500"
                    : "text-white dark:text-gray-900"
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* DIVIDER */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            <Text className="px-4 text-sm text-gray-600 dark:text-gray-400">
              or
            </Text>
            <View className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          </View>

          {/* LOGIN BUTTON */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className="bg-gray-100 dark:bg-gray-900 py-4 rounded-xl items-center border-2 border-gray-200 dark:border-gray-800"
          >
            <Text className="text-base font-bold text-gray-900 dark:text-white">
              Already have an account? Login
            </Text>
          </TouchableOpacity>

          {/* FOOTER */}
          <Text className="text-center text-sm text-gray-600 dark:text-gray-400 mt-8">
            By creating an account, you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
