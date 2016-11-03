import React, { Component } from 'react';
import {
   Image,
   ListView,
   RefreshControl,
   StyleSheet,
   Text,
   TouchableHighlight,
   View,
} from 'react-native';

import MViewNavigator from './MViewNavigator';
import MViewRow from './MViewRow';

export default class MSceneList extends Component
{
   constructor(props) {
      super(props);
      let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
         /**
          * -1:最近一次加载失败
          *  0:没有加载
          *  1:正在加载中
          *  2:最近一次加载成功
          */
         loadingStatus : 0,
         pageNo: 0,
         pageSize: 15,
         ds: ds,
         dataSource: ds.cloneWithRows([]),
         topics : [],
      };
   }

   getRemote(pageNo) {
      try {
         console.log('pageNo = ' + pageNo);
         if (pageNo <= 0 || pageNo === undefined) return;
         if (this.state.loadingStatus === 1) return;
         this.setState({ loadingStatus: 1 });

         var url = `http://mrobot.pcauto.com.cn/xsp/s/club/v4.7/forumsHomePage.xsp?pageNo=${pageNo}&forumId=14637&pageSize=${this.state.pageSize}&userId=43803489&filter=pick`;

         fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
               let topics = responseJson["topicResult"]["topicList"];
               let ds = this.state.ds;

               let topicsOld = [];
               if (pageNo > 1) {
                  topicsOld = this.state.topics;
               }
               topics = topicsOld.concat(topics);

               this.setState({
                  loadingStatus: 2,
                  pageNo: pageNo,
                  topics: topics,
                  dataSource: ds.cloneWithRows(topics),
               });
               console.log('topics = ', topics);
            })

      } catch(error) {
         this.setState({
            loadingStatus : -1,
         });
         console.log('error = ', error);
      }
   }

   _onRefresh() {
      this.getRemote(1);
   }

   _onScroll() {
      //if (this.refs.listview.scrollProperties.offset + this.refs.listview.scrollProperties.visibleLength >= this.refs.listview.scrollProperties.contentLength){
      //   this.scrollEndReached();
      //}
   }

   _onEndReached() {
      console.log('_onEndReached');
      let pageNo = this.state.pageNo;
      this.getRemote(pageNo + 1);
   }

   componentDidMount() {
      this._onRefresh();
   }

   render() {
      return (
         <View style={styles.container}>
            <MViewNavigator style={styles.viewNavigator}
               navigatorTitle="列表页"
               navigator={this.props.navigator}
            />
            <ListView style={styles.listview}
               enableEmptySections={true}
               dataSource={this.state.dataSource}

               renderRow={(rowData) =>
                  <MViewRow key={rowData.id} rowData={rowData} navigator={this.props.navigator} />
               }

               renderSeparator={(sectionID, rowID, adjacentRowHighlighted) =>
                  <View key={rowID} style={styles.viewSeparator} />
               }

               refreshControl={
                  <RefreshControl
                     refreshing={(this.state.loadingStatus === 1)}
                     onRefresh={this._onRefresh.bind(this)}
                     tintColor='#000'
                     title='Loading...'
                     titleColor='#000'
                     progressBackgroundColor='#FF0'
                  />
               }

               onScroll={this._onScroll.bind(this)}

               onEndReached={
                  this._onEndReached.bind(this)
               }
            />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
   },
      viewNavigator: {
      },
      listview: {
         flex: 1,
         backgroundColor: '#fffff0',
      },
         viewSeparator: {
            flex: 1,
            height: 0.5,
            backgroundColor: '#f00',
         },
});
