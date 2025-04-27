import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export const HomeIcon = (props: any) => (
  <FontAwesome name="home" size={32} color="white" {...props} />
);

export const InfoIcon = (props: any) => (
  <FontAwesome name="info" size={32} color="white" {...props} />
);

export const ConfigIcon = (props: any) => (
  <Ionicons name="settings-sharp" size={32} color="white" {...props} />
);
