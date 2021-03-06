import React, {Component} from 'react';
import {
    Button,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
    DatePickerAndroid,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {uploadProduct} from 'network/upload';

class FoodWastageComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: '',
            filename: '',
            expiry_date: '',
            message: '',
            onProcess: false,
        };
        this.openCamera = this.openCamera.bind(this);
        this.openGallery = this.openGallery.bind(this);
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
                    image: imageData,
                    filename: response.fileName,
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
                    image: imageData,
                    filename: response.fileName,
                });
            }
        });
    };

    async scanAndSaveProduct() {
        this.setState({
            onProcess: true,
            message: 'Please wait....',
        });
        const {image, expiry_date} = this.state;
        try {
            return await uploadProduct(image, expiry_date);
        } catch (e) {
            console.log(e);
        }
    };

    openDatePicker = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(2019, 4, 25),
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                return year + '-' + (month < 9 ? '0' + month : month) + '-' + day;
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    };

    render() {
        return (
            <View style={styles.outerView}>
                <View style={styles.topView}>
                    <Text style={{
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontSize: 25,
                    }}>Save Foods Wastage</Text>
                </View>
                <View style={styles.middleView}>
                    <Text style={{marginVertical: 10}}> Image FileName: </Text>
                    <View style={{flexDirection: 'row'}}>
                        <TextInput onChange={(ref) => {
                            console.log(ref);
                        }} editable={false} style={{
                            backgroundColor: 'whitesmoke',
                            borderWidth: 1,
                            color: 'black',
                            borderColor: 'black',
                            width: '60%',
                            borderRadius: 10,
                            paddingLeft: '5%',
                        }} placeholder={'Image Filename'}>{this.state.filename}</TextInput>
                        <TouchableWithoutFeedback onPress={() => this.openCamera()}>
                            <Image source={require('assets/camera.png')}
                                   resizeMode={'contain'}
                                   style={{
                                       height: 80,
                                       width: '20%',
                                       resizeMode: 'contain',
                                       alignSelf: 'center',
                                   }}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.openGallery()}>
                            <Image source={require('assets/gallery.png')}
                                   resizeMode={'contain'}
                                   style={{
                                       height: 80,
                                       width: '20%',
                                       resizeMode: 'contain',
                                       alignSelf: 'center',
                                   }}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{marginVertical: 5}}>
                        <Text style={{marginVertical: 10}}> Expiry Date: </Text>
                        <Text style={{
                            backgroundColor: 'whitesmoke',
                            borderWidth: 1,
                            padding: '5%',
                            borderColor: 'black',
                            borderRadius: 10,
                            width: '100%',
                        }} onPress={() => {
                            this.openDatePicker().then(value => {
                                console.log(value);
                                this.setState({
                                    expiry_date: value,
                                });
                            }).catch(reason => {
                                console.warn('Date Selection Issue');
                            });
                        }}>
                            Expiry Date
                        </Text>
                    </View>
                    <View style={{marginVertical: 20}}>
                        <Button title={'Save'} onPress={() => {
                            this.scanAndSaveProduct().then(value => {
                                this.setState({
                                    message: value.message,
                                    onProcess: false,
                                });
                            }).catch(reason => {
                                console.log('Reason: ' + reason);
                            }).done();
                        }} color={'black'}/>
                    </View>
                    <View
                        style={{backgroundColor: 'green', padding: 15, borderRadius: 10}}>
                        <Text style={{alignSelf: 'center'}}>{this.state.message}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView: {
        flex: 1,
        backgroundColor: 'lightgrey',
        flexDirection: 'column',
    },
    topView: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleView: {
        justifyContent: 'center',
        margin: 10,
        alignSelf: 'center',
    },
});

export default FoodWastageComponent;
