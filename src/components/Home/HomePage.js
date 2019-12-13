import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  StatusBar,
  Button,
  Image,
  ScrollView
} from "react-native";
var eshop = require('../../../assets/eshop.png');
class HomePage extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={styles.eshop}>
        <Image style={styles.eshop2} source={eshop} />
        </View>
        <ScrollView
          horizontal
          scrollEventThrottle={10}
          pagingEnabled
          style={{ marginBottom: 10 }}
        >
          <Image
          //item.images[0].src
            source={{ uri: 'https://e-shop-howest.be/wp-content/uploads/2019/11/9200000073487693-1.jpg' }} style={styles.sliderImage}
          />
          <Image
            source={{ uri: 'https://e-shop-howest.be/wp-content/uploads/2019/11/9200000069262046_1.jpg' }} style={styles.sliderImage}
          />
          <Image
            source={{ uri: 'https://e-shop-howest.be/wp-content/uploads/2019/11/9200000097496134.jpg' }} style={styles.sliderImage}
          />
        </ScrollView>
        <Button color="#05a5d1" title="Start Shopping" onPress={() => navigate("Products")} />
      </View>
    );
  }


  componentDidMount(){
    console.log('fetching..')
this.fetchData();
  }

  fetchData = async()=>{
    const response = await
    fetch('http://localhost/e-shop/wp-json/wp/v2/product?per_page=100&consumer_key=ck_dfbf7b57fc257e8c0e217a20a14fec6b4016b16a&consumer_secret=cs_6c44371109ebc9322311a08f6a48d83506b7eb1a');
    
    const posts = await response.json();
    console.log('Data is: ',posts);
    this.setState({data:posts});
    }
}





const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    padding: 10
  },
  sliderImage: {
    height: 360,
    width: 360
  },
  eshop:{
    paddingBottom:10,
    alignContent:'center',
    alignItems:'center',
    textAlign:'center',
    
  },
  eshop2:{
    width:300,
    height:140,
    
  }
});

export default HomePage;