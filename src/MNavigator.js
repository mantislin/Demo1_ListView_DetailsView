import React, { Component } from 'react';
import {
   Navigator,
   StyleSheet,
   Text,
   TouchableHighlight,
} from 'react-native';

import MSceneList from './MSceneList';
import MSceneDetails from './MSceneDetails'

export default class MNavigator extends Component {
   render() {
      const routes = [
         { title : '', uri : '', index : 0 },
         { title : '', uri : '', index : 1 },
      ];
      return (
         <Navigator style={styles.navigator}
            initialRoute = { routes[0] }
            initialRouteStack = { routes }

            renderScene = {(route, navigator) => {
               if (route.index === 0) {
                  return <MSceneList route={route} navigator={navigator} />
               } else {
                  return <MSceneDetails route={route} navigator={navigator} />
               }
            }}

            configureScene = {(route, navigator) =>
               Navigator.SceneConfigs.PushFromRight
            }
         />
      );
   }
}

const styles = StyleSheet.create({
   navigator: {
      flex: 1,
   },
});
