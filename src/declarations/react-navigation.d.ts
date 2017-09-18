import {
  NavigationDrawerScreenOptions,
  NavigationScreenConfigProps,
  NavigationStackScreenOptions,
  NavigationTabScreenOptions,
} from 'react-navigation';

declare module 'react-navigation' {

  type ScreenOptions =
    NavigationDrawerScreenOptions &
    NavigationStackScreenOptions &
    NavigationTabScreenOptions;

  type FunctionalOptions<Options> = (args: NavigationScreenConfigProps & {
    navigationOptions: ScreenOptions,
  }) => Options;

  type NavScreenConfig<Options> = Options | FunctionalOptions<Options>;

  export type NavigationOptions = NavScreenConfig<ScreenOptions>;

  export interface NavigationScreenStatic {
    navigationOptions?: NavigationOptions;
  }

}