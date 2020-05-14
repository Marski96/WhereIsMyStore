import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedbackComponent } from 'react-native';
import Expo from 'expo';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import { TouchableHighlight } from 'react-native-gesture-handler';

class LoginScreen extends Component {

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (
              providerData[i].providerId ===
                firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      };
    
    onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(
          function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
              // Build Firebase credential with the Google ID token.
              var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
              );
              // Sign in with credential from the Google user.
              firebase
                .auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then(function(result) {
                  console.log('user signed in ');
                  if (result.additionalUserInfo.isNewUser) {
                    firebase
                      .database()
                      .ref('/users/' + result.user.uid)
                      .set({
                        gmail: result.user.email,
                        profile_picture: result.additionalUserInfo.profile.picture,
                        first_name: result.additionalUserInfo.profile.given_name,
                        last_name: result.additionalUserInfo.profile.family_name,
                        created_at: Date.now()
                      })
                      .then(function(snapshot) {
                        // console.log('Snapshot', snapshot);
                      });
                  } else {
                    firebase
                      .database()
                      .ref('/users/' + result.user.uid)
                      .update({
                        last_logged_in: Date.now()
                      });
                  }
                })
                .catch(function(error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  // The email of the user's account used.
                  var email = error.email;
                  // The firebase.auth.AuthCredential type that was used.
                  var credential = error.credential;
                  // ...
                });
            } else {
              console.log('User already signed-in Firebase.');
            }
          }.bind(this)
        );
      };

    signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            androidClientId: "399195797592-st9opdqfkeuvsmctii8d41srcbjsrlpq.apps.googleusercontent.com",
           iosClientId: "399195797592-0sjaneq6cvbe1c8altnfp7kl07ao9ekc.apps.googleusercontent.com",
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.header}>Where is my store</Text>

                <Text style={styles.body}>
                    Please login:
                </Text>
                <TouchableOpacity style={styles.googleLogIn}>
                    <Image style={styles.picture} source={require("../google/img/login.png")}/>
                </TouchableOpacity>
            </View>
        );
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  body: {
    fontSize: 25,
    paddingTop: 100,
  },

  picture: {
      
  },

  googleLogIn: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
    borderRadius: 20,
    paddingTop: 30,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },

  header: {
      fontSize: 35,
      fontWeight: 'normal',
      paddingTop: 100
      
  }
});
