/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    SafeAreaView, StyleSheet, View, Text,
} from 'react-native';
import MenuComponent from './components/main';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
    createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import Index from './components/ImageSelect';
import FoodWastageComponent from './components/FoodsWastage';
import ExpiryList from './components/FoodsWastage/expirylist';
import Recipes from './components/FoodsWastage/Recipes';

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const RootStackNavigator = createAppContainer(MainNavigator);
        return (
            <SafeAreaView style={appStyle.safeArea}>
                <RootStackNavigator/>
            </SafeAreaView>
        );
    }
}

const WastageTabs = createMaterialTopTabNavigator({
    'Food Scanner': FoodWastageComponent,
    'Expiry Products': ExpiryList,
}, ({
    initialRouteName: 'Food Scanner',
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        tabStyle: {
            backgroundColor: 'skyblue',
        },
        style: {
            padding: 10,
            backgroundColor: 'skyblue',
        },
    },
}));

const MainNavigator = createStackNavigator({
    Menu: {screen: MenuComponent},
    Recipes: Recipes,
    Recycle: {screen: Index},
    FoodWastage: {screen: WastageTabs},
}, {
    initialRouteName: 'Menu',
    headerMode: 'none',
});


const appStyle = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});

export default App;

