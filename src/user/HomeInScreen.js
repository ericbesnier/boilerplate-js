import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from "react-native";
import { Card, Icon } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import { removePicture as _removePicture } from '../picture/PictureActions'

const actions = [
  {
    text: "Photos",
    icon: require("../../assets/icons/insert_photo_white.png"),
    name: "bt_photos",
    position: 1
  },
  {
    text: "Camera",
    icon: require("../../assets/icons/camera_white.png"),
    name: "bt_camera",
    position: 2
  }
];


// c l a s s   H o m e I n S c r e e n
// -----------------------------------
class HomeInScreen extends Component {
  constructor(props) {
    super(props);
    // console.log('HomeInScreen/constructor props=', props);
  }

  render() {
    const { navigation, picture } = this.props;

    return (
      <View style={{ flex: 1 }} >
        <ScrollView contentContainerStyle={{ paddingVertical: 0 }}>
          {picture.pictures.map(({ picture, id }) => (
            <Card
              title={`CARD ${id}`}
              image={{ uri: picture }}
              key={id} >
              <Icon reverse name='delete' color='#f50' onPress={() => this.props.removePicture(id)} />
            </Card>

          ))}
        </ScrollView>
        <FloatingAction
          actions={actions}
          onPressItem={(name) => {
            if (name === 'bt_photos') {
              navigation.navigate('PictureSelectorScreen');
            } else if (name === 'bt_camera') {
              console.log('HomeInScreen: lancement application camera')
              navigation.navigate('Camera');
            } else {
              console.log('HomeInScreen: ce bouton n\'existe pas !!')
            }
          }}
        />
      </View >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    picture: state.picture,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removePicture: (id) => dispatch(_removePicture(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeInScreen);