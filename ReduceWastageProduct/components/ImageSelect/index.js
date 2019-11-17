import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {uploadFileToServer} from 'network/upload';
import ImagePicker from 'react-native-image-picker';


class Index extends Component {

    constructor(props) {
        super(props);
        this.openCamera = this.openCamera.bind(this);
        this.openGallery = this.openGallery.bind(this);
        this.state = {
            imageUri: '',
            decisionUri: '',
            loading: false,
        };
    }

    openCamera = () => {
        const options = {
            title: 'Select Avatar',
            customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            height: 400,
            width: 400,
        };
        ImagePicker.launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let imageData = 'data:' + response.type + ';base64,' + response.data;
                this.setState({
                    imageUri: imageData,
                });
                this.uploadFile(imageData).then(value => {
                    console.log(value);
                }).catch(reason => {

                });
            }
        });
    };

    openGallery = () => {
        const options = {
            title: 'Select Avatar',
            customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            mediaType: 'image',
            height: 400,
            width: 400,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let imageData = 'data:' + response.type + ';base64,' + response.data;
                this.setState({
                    imageUri: imageData,
                });
                this.uploadFile(imageData).then(value => {
                    this.setState({
                        loading: false,
                    });
                }).catch(reason => {
                    console.log(reason);
                });
            }
        });
    };

    uploadFile = async (imageData) => {
        this.setState({
            loading: true,
        });
        return await uploadFileToServer(imageData);
    };

    render() {
        return (
            <View style={styles.outerView}>
                <View style={styles.topView}>
                    <Text style={{
                        fontWeight: '900',
                        fontSize: 25,
                        fontStyle: 'italic',
                    }}>ReCycle Signal</Text>
                </View>
                <View style={styles.middleView}>
                    <View style={[styles.imageView, {borderColor: 'black'}]}>
                        {
                            this.state.imageUri !== '' ?
                                <Image source={{uri: this.state.imageUri}} resizeMode={'contain'}
                                       style={{height: '100%', width: '100%', resizeMode: 'cover'}}/> :
                                null
                        }
                    </View>
                    {
                        this.state.loading ?
                            <View>
                                <Image source={require('assets/loader.gif')} resizeMode={'contain'}
                                       style={{height: 50, width: 50, resizeMode: 'contain'}}/>
                            </View>
                            : null
                    }

                    <View style={[styles.imageView, {borderColor: 'white'}]}>
                        {
                            this.state.imageUri !== '' ?
                                <Image source={require('assets/dustbins/blue.png')} resizeMode={'contain'}
                                       style={{height: '100%', width: '100%', resizeMode: 'contain'}}/> :
                                null
                        }
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <TouchableWithoutFeedback onPress={() => this.openCamera()}>
                        <Image source={require('assets/camera.png')}
                               resizeMode={'contain'}
                               style={{
                                   height: 80,
                                   width: 80,
                                   resizeMode: 'contain',
                                   alignSelf: 'center',
                               }}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.openGallery()}>
                        <Image source={require('assets/gallery.png')}
                               resizeMode={'contain'}
                               style={{
                                   height: 80,
                                   width: 80,
                                   resizeMode: 'contain',
                                   alignSelf: 'center',
                               }}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        backgroundColor: 'orange',
        flexDirection: 'column',
    },
    imageView: {
        flex: 0.5,
        margin: 4,
        width: '100%',
        borderWidth: 2,
        borderRadius: 10,
    },
    topView: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleView: {
        flex: 0.7,
        marginVertical: 5,
        marginHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomView: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
export default Index;
