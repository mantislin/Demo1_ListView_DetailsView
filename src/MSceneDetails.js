import React, { Component } from 'react';
import {
   StyleSheet,
   TouchableHighlight,
   WebView,
   View,
} from 'react-native';

import MViewNavigator from './MViewNavigator'

export default class MSceneDetails extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      var uri = (this.props.route.uri.length > 0 ? this.props.route.uri : 'https://www.baidu.com/');
      var navigatorTitle = (this.props.route.title ? this.props.route.title : '');

      return (
         <View style={styles.container}>
            <MViewNavigator
               navigatorTitle={navigatorTitle}
               leftTitle="BACK"
               navigator={this.props.navigator}

               onBack={(navigator) => {
                  this.props.navigator.pop();
               }}
            />
            <WebView
               style={styles.webview}
               source={ {uri: uri} }
            />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
      webview: {
         flex: 1,
      },
});
