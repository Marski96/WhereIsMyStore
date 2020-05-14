import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { render } from 'react-dom';
import firebase from 'firebase'

export default class ShoppingList extends React.Component {
    constructor(props) {
        super(props);   
        this.state = {
            products: [],
            product: '',
        }
    }
    
    componentWillMount() {
        const ref = firebase.database().ref('products/')
          ref.orderByChild('item').on('child_added', snapshot => {
              this.state.products.push({
                  id: snapshot.key,
                  item: snapshot.val().item
              });
          }); 
    }

    readDataInFirebase = () => {
        const ref = firebase.database().ref('products/')

        ref.orderByChild('products').on('child_added', snapshot => {
          this.state.highScoreList.push({
            id: snapshot.key,
            item: snapshot.val().item,   
          });
        });
      }

    buttonAdd = () => {
        firebase.database().ref('products/').push(
            {
                item: this.state.product
            }
        ).then(() => {
            console.log('Data added to database');
        }).catch((e) => {
            console.log('Error occurred', e)
        }) 
    }

    buttonClear = () => {
        console.log(this.state.products)
    }
    render() {
        return(   

            <View style={{flex: 1 , paddingTop: 100, position: 'absolute', alignItems: 'center', alignContent: 'center', alignSelf:'center'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <TextInput 
                            style={{width: 250, borderColor: 'gray', borderWidth: 1, padding: 15}}
                            value={this.state.product}
                            onChangeText={product => this.setState({ product })}
                        />

                        <View style={{paddingLeft: 5,paddingTop: 5, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                            <Button
                                style={{flexDirection: 'row', alignItems: 'center', }}
                                onPress={this.buttonAdd} title='Add item'/>
                            
                            <Button
                                style={{flexDirection: 'row', alignItems: 'center' }}
                                onPress={this.buttonClear} title='Clear items'/> 
                        </View>

                        <Text style={{color: 'blue', fontSize: 18, textAlign: 'center', paddingBottom: 10, paddingTop: 25, alignItems: 'flex-start'}}>
                            Shopping List
                        </Text>

                        {this.state.products.map( item => <Text key = {item.key} style = {{textAlign: 'center', marginBottom: 10}}>{item.item}</Text>)}

                    </View>
            </View> 
        );   
    }
}
