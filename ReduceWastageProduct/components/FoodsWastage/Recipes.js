import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {getRecipes} from '../../network/upload';


class Recipes extends Component {

    constructor(props) {
        super(props);
        const link = this.props.navigation.getParam('link');
        this.state = {
            link: link,
            recipes: [],
        };
    }


    async UNSAFE_componentWillMount(): void {
        try {
            const response = await getRecipes(this.state.link);
            this.setState({
                recipes: response,
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View style={styles.main}>
                <FlatList numColumns={1} data={this.state.recipes}
                          renderItem={({key, item}) => (
                              <View style={styles.listItem}>
                                  <View style={{flex: 0.4}}>
                                      <Text style={{textTransform: 'capitalize', fontSize: 20}}>
                                          {item.title}
                                      </Text>
                                  </View>
                                  <View style={{flex: 0.5}}>
                                      <Image source={{uri: item.image}}
                                             style={{height: 200, width: 200, resizeMode: 'contain'}}/>
                                  </View>
                              </View>
                          )} keyExtractor={(key, item) => item.toString()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'orange',
    },
    listItem: {
        flex: 1,
        marginHorizontal: 8,
        marginVertical: 2,
        backgroundColor: 'whitesmoke',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
});

export default Recipes;
