import { useThemeColor } from '@/hooks/use-theme-color';
import { Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: keyof typeof TEXT_PRESETS;
};

const TEXT_PRESETS = {
  default: () => ({
    fontSize: 16,
    lineHeight: 24,
  }),
  defaultSemiBold: () => ({
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  }),
  title: () => ({
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  }),
  subtitle: () => ({
    fontSize: 20,
    fontWeight: 'bold',
  }),
  link: () => ({
    fontSize: 16,
    lineHeight: 30,
    color: '#0a7ea4',
  }),
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...props
}: ThemedTextProps) {
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text'
  );

  const baseStyle = TEXT_PRESETS[type]?.() ?? TEXT_PRESETS.default();

  return (
    <Text
      {...props}
      style={[
        baseStyle,
        { color: textColor },
        style,
      ]}
    />
  );
}
