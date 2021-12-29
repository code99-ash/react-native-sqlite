import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tutorialDB');

export default function Create({navigation}) {
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [age, setAge] = useState('')

    const submit = async() => {
        if(!name || !age) return;

        try {
            db.transaction(async(txn) =>{
                await txn.executeSql(
                    `INSERT INTO users (name, age) VALUES (?,?)`,
                    [name, age],
                    (txObj, resultSet) => {
                        // console.log('Success', resultSet)
                        if(resultSet.rowsAffected < 1) console.log('There is a problem creating new data')
                        
                        dispatch({type: 'NEW_DATA', payload: {id: resultSet.insertId, name, age} })
                        navigation.navigate('Home')
                    },
                    (txObj, error) => {console.log('Error', error)}
                )
            });

        }catch(err) {
            console.log(err)
        }

    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create Data</Text>

            <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Name"
                style={styles.input}
            />
            <TextInput
                value={age}
                onChangeText={setAge}
                placeholder="22"
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title="Submit" onPress={submit} />
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }, 
    input: {
        margin: 10,
        borderWidth: 1.5,
        borderColor: 'dodgerblue',
        padding: 8
    }
})