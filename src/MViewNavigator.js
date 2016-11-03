import React, { Component } from 'react';
import {
   Image,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';

export default class MViewNavigator extends Component
{
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      //
   }

   _onBackClicked() {
      if (this.props.onBack !== undefined) {
         this.props.onBack(this.props.navigator);
      } else if (this.props.navigator !== undefined) {
         this.props.navigator.pop();
      }
   }

   _onRightClicked() {
      if (this.props.onDone !== undefined) {
         this.props.onDone(this.props.navigator);
      }
   }

   render() {
      var navigatorTitle = (this.props.navigatorTitle !== undefined ? this.props.navigatorTitle : '');
      var leftTitle = (this.props.leftTitle !== undefined ? this.props.leftTitle : '');
      var rightTitle = (this.props.rightTitle !== undefined ? this.props.rightTitle : '');

      return (
         <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.viewStatus} />
            <View style={styles.viewNavigator}>
               <View style={styles.viewLeft}>
                  <TouchableOpacity
                     onPress={ this._onBackClicked.bind(this) }
                  >
                     <Text style={styles.textLeft}>
                        {leftTitle}
                     </Text>
                  </TouchableOpacity>
               </View>
               <View style={styles.viewCenter}>
                  <Text style={styles.textCenter} numberOfLines={1}>
                     {navigatorTitle}
                  </Text>
               </View>
               <View style={styles.viewRight}>
                  <TouchableOpacity
                     onPress={ this._onRightClicked.bind(this) }
                  >
                     <Text style={styles.textRight}>
                        {rightTitle}
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      height: 64,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      backgroundColor: 'dodgerblue',
   },
      viewStatus: {
         height: 20,
      },
      viewNavigator: {
         flex: 1,
         flexDirection: 'row',
         justifyContent: 'center',
         alignItems: 'stretch',
         //backgroundColor: 'red',
      },
         viewCenter: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 0,
            paddingHorizontal: 12,
            //backgroundColor: '#AAA',
         },
            textCenter: {
               flex: 1,
               textAlign: 'center',
               textAlignVertical: 'center',
               color: '#FFF',
               fontSize: 18,
               //overflow: 'hidden',
            },
         viewLeft: {
            width: 60,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 12,
            zIndex: 1,
            //backgroundColor: '#FF0',
         },
            textLeft: {
               fontWeight: 'bold',
               color: '#FFF',
            },
         viewRight: {
            width: 60,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: 12,
            zIndex: 1,
            //backgroundColor: '#0F0',
         },
            textRight: {
               fontWeight: 'bold',
               color: '#FFF',
            },
});

/*
const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignSelf: 'stretch',
   },
   viewImage: {
      height: 94,
      width: 114,
      padding: 12,
      alignItems: 'center',
   },
      image: {
         flex: 1,
         height: 70,
         width: 90,
         overflow: 'hidden',
         resizeMode: 'cover',
      },

   viewText: {
      flex: 1,
      flexDirection: 'column',
      height: 94,
      justifyContent: 'center',
      padding: 12,
      paddingLeft: 0,
      //backgroundColor: '#00F',
   },
      viewTitle: {
         flex: 1,
         flexDirection: 'column',
         justifyContent: 'flex-start',
         paddingTop: 6,
         //backgroundColor: '#0d0',
      },
         textTitle: {
            //backgroundColor: '#dd0',
            //textAlignVertical: 'bottom',
         },
      viewTime: {
         flex: 1,
         flexDirection: 'column',
         justifyContent: 'center',
         //backgroundColor: '#F00',
      },
         textTime: {
            //numberOfLines: 1,
         },
});
 */
