import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ImageBackground } from 'react-native';
import { render } from 'react-dom';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ShoppingList extends React.Component {
    constructor(props) {
        super(props);   
        this.state = {
            value1: '',
            ShoppingList: [],
        }
    }

    buttonAdd = () => {

        const formShoppingListdata = this.state.value1
        this.setState({
            ShoppingList: [...this.state.ShoppingList, formShoppingListdata]
        })
        
    }

    //set new empty array
    buttonClear = () => {
        this.setState({
            ShoppingList: [],
        })

    }

    render() {
        return(   

            <View style={{flex: 1 , paddingTop: 100, position: 'absolute', alignItems: 'center', alignContent: 'center', alignSelf:'center'}}>
                <TextInput 
                    style={{width: 200, borderColor: 'gray', borderWidth: 1}}
                    value={this.state.value1}
                    onChangeText={value1 => this.setState({ value1 })}
                />

                <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingBottom: 40, paddingTop: 10 }}>
                    <Button
                        style={{flexDirection: 'row', alignItems: 'center' }}
                        onPress={this.buttonAdd} title='Add'/>
                    
                    <Button
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        onPress={this.buttonClear} title='Clear all'/> 
                        
                </View>
                
                <Text style={{color: 'blue', fontSize: 20, textAlign: 'center', paddingBottom: 20, textDecorationLine:'underline'}}>
                    Shopping List
                </Text>
                <FlatList
                    style={{fontSize: 16, alignSelf: 'center'}}
                    data={this.state.ShoppingList}
                    renderItem={({item}) =>
                    
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 5 }}>
                            <Text style={{fontSize: 20}}>{item}</Text>
                        </View>
                    }
                />

            </View> 
        );   
    }
}
