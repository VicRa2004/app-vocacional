import React from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "danger" | "disabled";

type Props = {
  text: string;
  action?: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export const Button = ({
  text,
  action,
  variant = "primary",
  style,
  textStyle,
  disabled = false,
}: Props) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryButton;
      case "disabled":
        return styles.disabledButton;
      case "danger":
        return styles.dangerButton;
      case "primary":
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "secondary":
        return styles.secondaryButtonLabel;
      case "disabled":
        return styles.disabledButtonLabel;
      case "primary":
      case "danger":
      default:
        return styles.primaryButtonLabel;
    }
  };

  return (
    <View style={[styles.buttonContainer, style]}>
      <Pressable
        style={[styles.button, getButtonStyle()]}
        onPress={action}
        disabled={disabled || variant === "disabled"}
      >
        <Text style={[styles.buttonLabel, getTextStyle(), textStyle]}>
          {text}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 280,
    height: 70,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  buttonLabel: {
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: "#444",
  },
  dangerButton: {
    backgroundColor: "#f00",
  },
  primaryButtonLabel: {
    color: "#fff",
  },
  secondaryButton: {
    backgroundColor: "#777",
  },
  secondaryButtonLabel: {
    color: "#fff",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  disabledButtonLabel: {
    color: "#888",
  },
});
