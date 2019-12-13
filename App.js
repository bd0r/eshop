import React from "react";
import {
  Text,
  Button,
  Animated,
  Easing,
  Image
} from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import HomePage from './src/components/Home/HomePage';
import Products from "./src/components/Products/ProductList";
import Product from "./src/components/Products/Product";
import CartPage from './src/components/Cart/CartPage';
import DrawerContainer from './src/components/Drawer/DrawerContainer';
import configureStore from './src/store/configureStore';
import InitialState from './src/reducers/InitialState';

const DrawerNavigation = createDrawerNavigator({
  Home: {
    screen: HomePage,
    navigationOptions: {
      headerTitle: "e-shop Store"
    }
  },
  Products: {
    screen: Products,
    navigationOptions: {
      headerTitle: "Shop"
    }
  },
  Product: {
    screen: Product,
    navigationOptions: ({ navigation }) => ({
      headerTitle: "Product" //navigation.state.params.product.name
    }),
  },
  CartPage: {
    screen: CartPage,
    navigationOptions: {
      headerTitle: "Cart"
    }
  }
 }, {
    contentComponent: DrawerContainer
  });
 

const StackNavigation = createStackNavigator({
  DrawerNavigation: { screen: DrawerNavigation }
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation, screenProps }) => ({
      headerStyle: { backgroundColor: '#4C3E54' },
      headerTintColor: 'white',
      headerLeft: drawerButton(navigation),
      headerRight: cartButton(navigation, screenProps)
    })
  });

  const AppContainer = createAppContainer(StackNavigation); 

// const drawerButton = (navigation) => (
//   <Text
//     style={{ padding: 15, color: 'black' }}
//     onPress={() => {
//       if (navigation.state.index === 0) {
//         navigation.navigate('DrawerOpen')
//       } else {
//         navigation.navigate('DrawerClose')
//       }
//     }
//     }><Ionicons name="ios-menu" size={30} /></Text>
// );

const drawerButton = (navigation) => (
  <Text
    style={{ padding: 15, color: 'white' }}
    onPress={() => {
      if (navigation.state.index === 0) {
        navigation.navigate('DrawerOpen')
      } else {
        navigation.navigate('DrawerClose')
      }
    }
    }> (
  <Text style={{ padding: 15, color: 'white' }}
    onPress={() => { navigation.navigate('CartPage') }}
  ></Text>
    <EvilIcons name="cart" size={30} />
    {screenProps.cartCount}
  </Text>
 );

const cartButton = (navigation, screenProps) => (
  <Text style={{ padding: 15, color: 'white' }}
    onPress={() => { navigation.navigate('CartPage') }}
  >
    <EvilIcons name="cart" size={30} />
    {screenProps.cartCount}
  </Text>
);

class CA extends React.Component {
  render() {
    const cart = {
      cartCount: this.props.cart.length
    }
    return (
      <AppContainer screenProps={cart} />
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

const ConnectedApp = connect(mapStateToProps, null)(CA);

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedApp />
      </Provider>
    )
  }
}
console.disableYellowBox = true;
export default App;

