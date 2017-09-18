import * as React from 'react';
import { StackNavigator, TabNavigator } from "react-navigation";
import WelcomeScreen from "./WelcomeScreen";
import FormScreen from "./FormScreen";
import { DEFAULT_ROUTE_NAME, DrilldownScreen } from "./drilldown";
import { PortalProvider } from 'react-native-portal';

const HomeScreen = TabNavigator({
  Welcome: { screen: WelcomeScreen },
  Form: { screen: FormScreen },
});

HomeScreen.navigationOptions = {
  header: null,
};

const RootNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  [DEFAULT_ROUTE_NAME]: { screen: DrilldownScreen, navigationOptions: { title: 'Select fruit or pet' } },
});

const App = () => (
  <PortalProvider>
    <RootNavigator />
  </PortalProvider>
);

export default App;
