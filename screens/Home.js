import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('tutorialDB');

db.transaction(tx =>{
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INT)'
    )
})

export default function Home({navigation}) {
    const dispatch = useDispatch();
    const {data} = useSelector(state => state);

    
    useEffect(() => {
        getData()
    }, [])

    
    const getData = () => {
        db.transaction(txn =>{
            txn.executeSql(
                "SELECT * FROM users",
                [],
                (txObj, {rows: {_array} }) => { dispatch({type: 'PASS_DATA', payload: _array}) },
                (txObj, error) => console.log('Error ', error)
            )
        })
    }

    const renderItem = ({item}) => {
        return (
            <View>
                <Text style={styles.text}>{item.name} - {item.age}</Text>
            </View>
        )
    }
    return (
        <View>
            <Button title="New" onPress={() => navigation.navigate('Create')} />
            <FlatList 
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})