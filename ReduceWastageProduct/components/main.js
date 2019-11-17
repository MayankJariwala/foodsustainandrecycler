import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';

class MenuComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
    }

    render() {
        return (
            <View style={styles.main}>
                <View style={{flex: 0.15}}>
                    <Text style={{fontWeight: '900', color: 'green', fontSize: 35}}>Go Green World!</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        alignSelf: 'flex-start',
                    }}>
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate('FoodWastage');
                        }}>
                            <Image source={require('assets/menu/wastage.png')}
                                   resizeMode={'contain'}
                                   style={{
                                       height: 100,
                                       width: 100,
                                       resizeMode: 'contain',
                                       alignSelf: 'center',
                                   }}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <View style={{
                        alignSelf: 'flex-end',
                    }}>
                        <TouchableWithoutFeedback onPress={() => {
                            this.props.navigation.navigate('Recycle');
                        }}>
                            <Image source={require('assets/menu/recycle.png')}
                                   resizeMode={'contain'}
                                   style={{
                                       height: 100,
                                       width: 100,
                                       resizeMode: 'contain',
                                       alignSelf: 'center',
                                   }}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        color: 'white',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
    },
});

export default MenuComponent;
