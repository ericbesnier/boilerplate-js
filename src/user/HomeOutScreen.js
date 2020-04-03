import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, View } from "react-native";
import { Card } from "react-native-elements";

// c l a s s   H o m e I n S c r e e n
// -----------------------------------
class HomeOutScreen extends Component {
  constructor(props) {
    super(props);
    // console.log('HomeOutScreen/constructor props=', props);
  }

  render() {
    const { picture } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
          {picture.pictures.map(({ picture, id }) => (
            <Card
              title={`CARD ${id}`}
              image={{ uri: picture }}
              key={id} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    picture: state.picture,
  };
};

export default connect(mapStateToProps, null)(HomeOutScreen);