import { useThemeColor } from '@/hooks/use-theme-color';
import { StyleSheet, View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...props
}: ThemedViewProps) {
  const resolvedColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  const themedStyle = styles.container(resolvedColor);

  return (
    <View
      {...props}
      style={[themedStyle, style]} 
      />
  );
}

const styles = {
  container: (backgroundColor: string) =>
    StyleSheet.create({
      base: {
        backgroundColor,
      },
    }).base,
};
