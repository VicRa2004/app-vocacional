import React from "react";
import { ScrollView, Text } from "react-native";
import useAuth from "@/hooks/use-auth";

const ProfileScreen = () => {
  const {
    authState: { user},
  } = useAuth();

  console.log(user);

  return (
    <ScrollView>
      <Text>Profile</Text>
      <Text>Name: {user?.name}</Text>
      <Text>Email: {user?.email}</Text>
    </ScrollView>
  );
};

export default ProfileScreen;
