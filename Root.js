console.log('App...');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Asset } from 'expo-asset';
import AssetUtils from 'expo-asset-utils';

import LoadingScreen from './src/commons/LoadingScreen';
import {
  addPicture as _addPicture,
  setPictureAsInitialized as _setPictureAsInitialized,
  fetchAllPicture as _fetchAllPicture,
} from './src/picture/PictureActions';
import SignOutScreen from './src/user/SignOutScreen';
import SignInScreen from './src/user/SignInScreen';
import HomeInScreen from './src/user/HomeInScreen';
import HomeOutScreen from './src/user/HomeOutScreen';
import PictureSelectorScreen from './src/picture/PictureSelectorScreen';
import PictureCameraScreen from './src/picture/PictureCameraScreen';

const Stack = createStackNavigator();

const imagesArray = [
  require('./assets/images/1.jpg'),
  require('./assets/images/2.jpg'),
  require('./assets/images/3.jpg'),
  require('./assets/images/4.jpg'),
]

// c l a s s   R o o t
// -------------------
class Root extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.initImages();
  }

  addPicture = async (result) => {
    // console.log("Root/conversionSuccess: l'opération a réussi avec le message : " + result);
    let { data } = result;
    return await new Promise((resolve, reject) => {
      resolve(this.props.addPicture('data:image/jpeg;base64,' + data));
      reject(error => error);
    });
  }

  conversionFailure = (erreur) => {
    console.error("Root/conversionFailure: l'opération a échoué avec le message : " + erreur);
    throw new Error('Something failed:', erreur);
  }

  getUriFromAsset = async (image) => {
    // console.log('Root/getUriFromAsset');
    return await new Promise((resolve, reject) => {
      resolve(Asset.fromModule(image).uri);
      reject(error => error);
    });
  }

  isDone = async (length) => {
    this.state.count++;
    // console.log('Root/isDone: this.state.count=', this.state.count, ' length=', length);
    return await new Promise((resolve, reject) => {
      if (this.state.count === length) {
        resolve(true);
      }
    });
  }

  cacheImages = (images) => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  async loadAssetsAsync() {
    const imageAssets = this.cacheImages(imagesArray);
    await Promise.all([...imageAssets]);
  }

  fetchAssetPictures = async () => {
    return await new Promise((resolve, reject) => {
      for (let i = 0; i < imagesArray.length; i++) {
        let image = imagesArray[i];
        this.getUriFromAsset(image)
          .then((uri) => AssetUtils.resolveAsync(uri))
          .then((asset) => AssetUtils.base64forImageUriAsync(asset.localUri))
          .then((result) => this.addPicture(result))
          .then(() => this.isDone(imagesArray.length))
          .then((isDone) => this.props.setPictureAsInitialized(isDone))
          .then((result) => console.log('Root/fetchAssetPictures: processus de récupération des ASSET images réalisé avec succès ! result=', result))
          .catch(this.conversionFailure)
      }
      resolve(true);
    });
  }

  fetchDataBasePictures = async () => {
    return await new Promise((resolve, reject) => {
      this.props.fetchAllPicture()
        .then((result) => console.log('Root/fetchDataBasePictures: processus de récupération des images de la BD réalisé avec succès ! result=', result))
        .catch(error => console.error('Root/fetchDataBasePictures: error=', error))
      resolve(true);
    });
  }

  initImages = async () => {
    this.loadAssetsAsync()
      .then(() => {
        if (!this.props.picture.SET_INITIALIZED) {
          this.fetchAssetPictures();
        }
        else {
          this.fetchDataBasePictures()
        }
      })
  }

  // r e n d e r
  //
  render() {
    const { user, picture } = this.props;
    // console.log("Root/render: picture.SET_INITIALIZED : " + picture.SET_INITIALIZED);

    if (!picture.SET_INITIALIZED) {
      return (<LoadingScreen color="#FF0000" size="large" message="chargement des images en cours..." />);
    }
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {user.isLoggedIn ? (
            <>
              <Stack.Screen
                name="HomeInScreen"
                component={HomeInScreen}
                options={({ navigation }) => ({
                  title: 'Accueil - connecté',
                  headerRight: () => (
                    <Button
                      onPress={() => navigation.navigate('SignOutScreen')}
                      title="Logout"
                      color="#f4511e"
                    />
                  ),
                  headerStyle: {
                    backgroundColor: '#f4511e',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                })} />
              <Stack.Screen name="SignOutScreen" component={SignOutScreen} />
              <Stack.Screen name="PictureSelectorScreen" component={PictureSelectorScreen} />
              <Stack.Screen name="Camera" component={PictureCameraScreen} />
            </>
          ) : (
              <>
                <Stack.Screen
                  name="HomeOutScreen"
                  component={HomeOutScreen}
                  options={({ navigation }) => ({
                    title: 'Accueil - déconnecté',
                    headerRight: () => (
                      <Button
                        onPress={() => navigation.navigate('SignInScreen')}
                        title="Login"
                        color="#f4511e"
                      />
                    ),
                    headerStyle: {
                      backgroundColor: '#f4511e',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                  })}
                />
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
              </>
            )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    picture: state.picture,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addPicture: (image, key) => dispatch(_addPicture(image, key)),
  setPictureAsInitialized: () => dispatch(_setPictureAsInitialized()),
  fetchAllPicture: () => dispatch(_fetchAllPicture()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);