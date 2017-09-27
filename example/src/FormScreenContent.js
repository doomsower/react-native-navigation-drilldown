import * as React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { compose, withState } from 'recompose';
import { Drilldown } from './drilldown';
import options from './options';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
});

const nonLeafMapper = ({ name }) => ({ name: `All ${name.toLowerCase()}` });

const FormScreenContent = ({ navigation, ...props }) => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      Welcome to Form Example!
    </Text>
    <Drilldown
      label="Please select item"
      name="drilldown1"
      options={options}
      value={props.oneItem}
      onChange={props.changeSingleSelection}
      navigate={navigation.navigate}
      goBack={navigation.goBack}
    />
    <Drilldown
      multi
      name="drilldown2"
      label="Please select multiple items"
      options={options}
      value={props.manyItems}
      onChange={props.changeMultiSelection}
      navigate={navigation.navigate}
      goBack={navigation.goBack}
    />
    <Drilldown
      multi
      displayCategoryToggles
      nonLeafMapper={nonLeafMapper}
      name="drilldown3"
      label="Please select multiple items"
      options={options}
      value={props.manyItems2}
      onChange={props.changeMultiSelection2}
      navigate={navigation.navigate}
      goBack={navigation.goBack}
    />
  </View>
);

export default compose(
  withState('oneItem', 'changeSingleSelection'),
  withState('manyItems', 'changeMultiSelection'),
  withState('manyItems2', 'changeMultiSelection2'),
)(FormScreenContent);
