import React, { Component } from 'react';
import {
   Image,
   StyleSheet,
   Text,
   TouchableHighlight,
   View,
} from 'react-native';

const gStyle = require('./MGlobalStyle');

export default class MViewRow extends Component
{
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      //
   }

   render() {
      var timeInterval = this.props.rowData["createAt"];
      timeInterval /= 1000; //convert from millisecond to second
      var date = new Date(1970, 0, 1);
      date.setSeconds(timeInterval);

      var fullYear = date.getFullYear();
      var month = (date.getMonth() >= 10 ? date.getMonth() : `0${date.getMonth()}`);
      var day = (date.getDay() >= 10 ? date.getDay() : `0${date.getDay()}`);
      var hour = (date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`);
      var minute = (date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`);
      var second = (date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`);

      var humanTime = `${fullYear}-${month}-${day} ${hour}:${minute}:${second}`;

      console.log('time: ' + humanTime);

      return (
         <TouchableHighlight onPress={ () => {
            let route = {
               title: this.props.rowData["title"],
               uri: this.props.rowData["uri"],
               index: 1,
            };
            this.props.navigator.push(route);
         }}>
            <View style={styles.container}>
               <View style={ styles.viewImage } >
                  <Image style={ styles.image } source={{ uri: this.props.rowData["images"][0] }} />
               </View>
               <View style={ styles.viewText }>
                  <View style={ styles.viewTitle }>
                     <Text style={ styles.textTitle, gStyle.defaultFont } numberOfLines={2}>
                        {this.props.rowData["title"]}
                     </Text>
                  </View>
                  <View style={ styles.viewTime }>
                     <Text style={ styles.textTime, gStyle.defaultFont }>
                        {humanTime}
                     </Text>
                  </View>
               </View>
            </View>

         </TouchableHighlight>
      );
   }
}

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
