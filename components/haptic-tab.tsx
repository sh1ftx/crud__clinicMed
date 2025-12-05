import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';

const isIOS = process.env.EXPO_OS === 'ios';

export function HapticTab({ onPressIn, ...rest }: BottomTabBarButtonProps) {
  function handlePressIn(event: any) {
    if (isIOS) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    onPressIn?.(event);
  }

  return (
    <PlatformPressable
      {...rest}
      onPressIn={handlePressIn}
    />
  );
}
