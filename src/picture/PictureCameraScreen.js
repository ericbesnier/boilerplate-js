import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import styled from 'styled-components/native';
import { addPicture as _addPicture } from './PictureActions';

const FlexContainer = styled.View`
  flex: 1;
`;

const BottomButtonWrapper = styled.TouchableOpacity`
  flex: 0.1;
  borderColor: green;
  borderWidth: 1px;
  justifyContent: center;
  paddingHorizontal: 120px;
  paddingVertical: 10px;
`;

const Button = styled.TouchableOpacity`
flex: 1;
  borderColor: red;
  borderWidth: 1px;
  borderRadius: 40px;
  justifyContent: center;
`;

const MediumText = styled.Text`
  fontSize: 20px;
  color: white
  textAlign: center;
`;


// c l a s s   P i c t u r e C a m e r a S c r e e n
// -------------------------------------------------
class PictureCameraScreen extends Component {
  constructor(props) {
    super(props);
    console.log('PictureCameraScreen/constructor');
    this.camera = {};
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
    }
  }

  savePicture = (img) => {
    let { uri } = img;
    console.log('PictureCameraScreen/savePicture: uri=', uri);
    this.props.addPicture(uri);
  }

  takePicture = async () => {
    console.log('PictureCameraScreen/takePicture');
    if (this.camera) {
      await this.camera.takePictureAsync({ quality: 1, base64: true })
        .then((img) => this.savePicture(img));
    }
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  render() {
    return (
      <FlexContainer>
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          ratio={'16:9'}
          style={styles.camera}>
          <View style={styles.preview} />

        </Camera>
        <BottomButtonWrapper>
            <Button
              onPress={this.takePicture}>
              <MediumText>  </MediumText>
            </Button>
          </BottomButtonWrapper>
      </FlexContainer>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  addPicture: (image, key) => dispatch(_addPicture(image, key)),
});

export default connect(null, mapDispatchToProps)(PictureCameraScreen);

const styles = StyleSheet.create({
  preview: {
    height: Math.round(Dimensions.get('window').width)*2.8/6.2,
    width: Math.round(Dimensions.get('window').width),
    color: 'transparent',
    borderColor: 'blue',
    borderWidth: 1,
  },
  camera: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});