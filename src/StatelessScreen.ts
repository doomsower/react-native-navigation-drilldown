import { StatelessComponent } from 'react';
import { NavigationScreenProps, NavigationScreenStatic } from 'react-navigation';

export type StatelessScreen<Props = {}, Params = {}> = StatelessComponent<Props & NavigationScreenProps<Params>> &
  NavigationScreenStatic;
