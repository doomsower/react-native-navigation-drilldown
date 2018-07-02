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

export type IconSource = string | ImageURISource;

export interface DrilldownItemProps {
  id: string | number;
  icon?: IconSource;
  name: string;
  children?: DrilldownItemProps[];
}

export type DrilldownSelection = DrilldownItemProps | DrilldownItemProps[] | null;

export type ItemMapper = (item: {name: string, icon?: IconSource; }) =>
  {name: string, icon?: IconSource; };

export interface DrilldownBaseProps {
  /**
   * Possible values tree
   */
  options: DrilldownItemProps;
  /**
   * Selected item or undefined
   * Or flat array of selected items if multi is true
   */
  value?: DrilldownSelection;
  /**
   * Enables multiselection
   */
  multi?: boolean;
  /**
   * If true, lists will contain additional item to select/deselect whole category
   */
  displayCategoryToggles?: boolean;
  /**
   * Fired when selection changes
   * @param {DrilldownItemProps[] | DrilldownItemProps} items
   */
  onChange?: (items: DrilldownSelection) => void;
  /**
   * react-navigation routeName of DrilldownScreen
   */
  routeName?: string;
  /**
   * used internally, do not set this
   */
  rootDrilldownScreenKey?: string;
  /**
   * Custom component for list item
   */
  itemView?: React.ComponentType<ItemViewProps>;
  /**
   * Item view props to be used with default or custom item view component
   */
  itemViewProps?: ItemStyleProps;
  /**
   * Pass navigate function from react-navigation
   */
  navigate: (options: {
    routeName: string
    params?: any;
    action?: NavigationAction;
    key?: string;
  }) => boolean;
  /**
   * Pass goBack function from react-navigation
   */
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

  disabled?: boolean;
  onPress?: () => void;
}

export interface ItemStyleProps {
  contentStyle?: StyleProp<ViewStyle>;
  contentProps?: ImageBackgroundProperties;
  renderContent?: (item: DrilldownItemProps, isLeaf: boolean, selfSelected: boolean, leafSelected: boolean) =>
    React.ReactElement<any>;

  leftIconStyle?: StyleProp<ViewStyle>;
  leftIconProps?: ImageBackgroundProperties;
  renderLeftIcon?: (item: DrilldownItemProps, isLeaf: boolean, selfSelected: boolean, leafSelected: boolean) =>
    React.ReactElement<any>;

  titleStyle?: StyleProp<TextStyle>;
  titleProps?: Partial<TextProperties>;
  renderTitle?: (item: DrilldownItemProps, isLeaf: boolean, selfSelected: boolean, leafSelected: boolean) =>
    React.ReactElement<any>;

  rightIconStyle?: StyleProp<ViewStyle>;
  rightIconProps?: ImageBackgroundProperties;
  renderRightIcon?: (item: DrilldownItemProps, isLeaf: boolean, selfSelected: boolean, leafSelected: boolean) =>
    React.ReactElement<any>;
}

export interface ItemViewProps extends ItemStyleProps {
  item: DrilldownItemProps;
  isLeaf: boolean;
  selfSelected: boolean;
  subtreeSelected: boolean;
  onPress: (item: DrilldownItemProps) => void;
}

export interface DrilldownListProps extends DrilldownBaseProps {
  rootOptions: DrilldownItemProps;
}

export interface DrilldownProps extends DrilldownBaseProps {
  /**
   * If string, this label string will be rendered when nothing is selected
   * If function, this function allows to customize string that be rendered as for selection
   */
  label: string | ((selection?: DrilldownSelection) => string);
  /**
   * If function, this function allows to customize icon that be rendered as for selection
   * If string/Image source, this icon will be rendered when nothing is selected
   */
  icon?: IconSource | ((selection?: DrilldownSelection) => IconSource);
  /**
   * Name is used to distinguish different drilldowns.
   * Also comes handy when using with redux-form.
   */
  name: string;

  /**
   * Custom handle component
   */
  handle?: React.ComponentType<HandleProps>;
  /**
   * Props to be passed to handle
   */
  handleProps?: HandleProps | ((selected?: DrilldownSelection) => HandleProps);

  /**
   * Wrapper view style
   */
  style?: StyleProp<ViewStyle>;

  disabled?: boolean;
}
