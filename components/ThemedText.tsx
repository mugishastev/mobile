import { Text, TextProps, StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

type ThemedTextProps = TextProps & {
  type?: 'title' | 'subtitle' | 'defaultSemiBold';
  lightColor?: string;
  darkColor?: string;
};

export function ThemedText({
  style,
  type,
  lightColor,
  darkColor,
  ...rest
}: ThemedTextProps) {
  const theme = useColorScheme();
  const color = theme === 'dark' ? darkColor ?? '#fff' : lightColor ?? '#000';

  return <Text style={[{ color }, typeStyles[type ?? 'defaultSemiBold'], style]} {...rest} />;
}

const typeStyles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  defaultSemiBold: {
    fontWeight: '600',
  },
});
