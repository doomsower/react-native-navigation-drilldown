import {
  ImageBackgroundProperties,
  ImageURISource,
  StyleProp,
  TextProperties,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { NavigationAction, NavigationParams } from 'react-navigation';

export const DEFAULT_ROUTE_NAME = 'DrilldownRoute';

export interface DrilldownItemProps {
  id: string;
  icon?: string | ImageURISource;
  name: string;
  children?: DrilldownItemProps[];
}

export type DrilldownSelection = DrilldownItemProps | DrilldownItemProps[];

export interface DrilldownListProps {
  options: DrilldownItemProps;
  selected?: DrilldownItemProps[] | DrilldownItemProps;
  multi?: boolean;
  allowNonLeaves?: boolean;
  onChange?: (items: DrilldownItemProps[] | DrilldownItemProps) => void;
  routeName?: string;
  rootDrilldownScreenKey?: string;
  // Navigation
  navigate: (routeName: string, params?: NavigationParams, action?: NavigationAction) => boolean;
  goBack: (routeKey?: (string | null)) => boolean;
}

export interface HandleProps {
  contentStyle?: StyleProp<ViewStyle>;
  contentProps?: ImageBackgroundProperties;
  renderContent?: () => React.ReactElement<any>;

  leftIcon?: ImageURISource | string;
  leftIconStyle?: StyleProp<ViewStyle>;
  leftIconProps?: ImageBackgroundProperties;
  renderLeftIcon?: (icon?: ImageURISource | string) => React.ReactElement<any>;

  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  titleProps?: Partial<TextProperties>;
  renderTitle?: (title?: string) => React.ReactElement<any>;

  rightIcon?: ImageURISource | string;
  rightIconStyle?: StyleProp<ViewStyle>;
  rightIconProps?: ImageBackgroundProperties;
  renderRightIcon?: (icon?: ImageURISource | string) => React.ReactElement<any>;

  onPress?: () => void;
}

export interface ItemViewProps {
  item: DrilldownItemProps;
  selected?: DrilldownSelection;
  onSelect: (item: DrilldownItemProps | null) => void;
  onDrill: (item: DrilldownItemProps) => void;

  contentStyle?: StyleProp<ViewStyle>;
  contentProps?: ImageBackgroundProperties;
  renderContent?: (item: DrilldownItemProps, selfSelected: boolean, leafSelected: boolean) => React.ReactElement<any>;

  leftIconStyle?: StyleProp<ViewStyle>;
  leftIconProps?: ImageBackgroundProperties;
  renderLeftIcon?: (item: DrilldownItemProps, selfSelected: boolean, leafSelected: boolean) => React.ReactElement<any>;

  titleStyle?: StyleProp<TextStyle>;
  titleProps?: Partial<TextProperties>;
  renderTitle?: (item: DrilldownItemProps, selfSelected: boolean, leafSelected: boolean) => React.ReactElement<any>;

  rightIconStyle?: StyleProp<ViewStyle>;
  rightIconProps?: ImageBackgroundProperties;
  renderRightIcon?: (item: DrilldownItemProps, selfSelected: boolean, leafSelected: boolean) => React.ReactElement<any>;
}

export interface DrilldownProps extends DrilldownListProps {
  noItemLabel: string;
  noItemIcon?: string;
  name: string;

  handle?: React.ComponentType<HandleProps>;
  handleProps?: HandleProps | ((selected?: DrilldownSelection) => HandleProps);

  itemView?: React.Component<ItemViewProps>;

  doneButton?: React.ComponentType;

  style?: StyleProp<ViewStyle>;
}
