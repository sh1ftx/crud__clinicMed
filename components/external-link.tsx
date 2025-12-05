import { Link, type Href } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { type ComponentProps } from 'react';

type ExternalLinkProps = {
  href: string & Href;
} & Omit<ComponentProps<typeof Link>, 'href'>;

const isWeb = process.env.EXPO_OS === 'web';

export function ExternalLink({ href, onPress, ...props }: ExternalLinkProps) {
  async function handlePress(event: any) {
    if (!isWeb) {
      event.preventDefault();

      await WebBrowser.openBrowserAsync(href, {
        presentationStyle:
          WebBrowser.WebBrowserPresentationStyle.AUTOMATIC,
      });
    }

    onPress?.(event);
  }

  return (
    <Link
      {...props}
      href={href}
      target="_blank"
      onPress={handlePress}
    />
  );
}
