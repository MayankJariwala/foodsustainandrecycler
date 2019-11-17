import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableWithoutFeedback, Alert} from 'react-native';
import {getExpiryList} from '../../network/upload';

class ExpiryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expiryItems: [],
        };
    }


    async UNSAFE_componentWillMount(): void {
        try {
            const response = await getExpiryList();
            this.setState({
                expiryItems: response.main,
            });
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View style={styles.main}>
                <FlatList numColumns={1} data={this.state.expiryItems}
                          renderItem={({key, item}) => (
                              <TouchableWithoutFeedback onPress={() => {
                                  this.props.navigation.push('Recipes', {
                                      link: item.url,
                                  });
                              }}>
                                  <View style={styles.listItem}>
                                      <Text style={{textTransform: 'capitalize'}}>
                                          {item.product_Name.substr(0, item.product_Name.length - 1)}
                                      </Text>
                                  </View>
                              </TouchableWithoutFeedback>
                          )} keyExtractor={(key, item) => item.toString()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: 'lightgrey',
    },
    listItem: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
});

export default ExpiryList;
