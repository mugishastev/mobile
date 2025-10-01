import { View, ViewProps } from 'react-native';
import { useColorScheme } from 'react-native';

type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...rest }: ThemedViewProps) {
  const theme = useColorScheme();
  const backgroundColor = theme === 'dark' ? darkColor ?? '#1c1c1e' : lightColor ?? '#fff';

  return <View style={[{ backgroundColor }, style]} {...rest} />;
}
