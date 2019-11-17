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
                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        alignSelf: 'flex-start',
                        elevation: 8,
                        padding: 10,
                        backgroundColor: 'whitesmoke',
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
                        <Text style={{fontWeight: 'bold'}}>Foods Wastage Solutions</Text>
                    </View>
                    <Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <View style={{
                        alignSelf: 'flex-end',
                        elevation: 8,
                        padding: 10,
                        backgroundColor: 'whitesmoke',
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
                        <Text style={{fontWeight: 'bold'}}>ReCycler Helper</Text>
                    </View>
                </View>
                <View style={{margin: '10%', flex: 0.1}}>
                    <Text style={{fontWeight: '900', color: 'green', fontSize: 35}}>Go Green World!</Text>
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
        backgroundColor: '#f94',
    },
});

export default MenuComponent;
