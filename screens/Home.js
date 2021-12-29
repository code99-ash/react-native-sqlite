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

    const deleteItem = id => {
        dispatch({type: 'DELETE_ITEM', payload: id})
    }

    const renderItem = ({item}) => {
        return (
            <View style={styles.dataList}>
                <View style={styles.dataProp}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={[styles.text, styles.age]}>{item.age}</Text>
                </View>
                <Button 
                    title="X" 
                    style={styles.deleteBtn} 
                    color="red" 
                    onPress={() => deleteItem(item.id)}
                />
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
    },
    dataList: {
        padding: 8,
        backgroundColor: '#fff',
        marginVertical: 3,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dataProp: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    age: {
        marginLeft: 10,
        color: '#999'
    },
    deleteBtn: {
        marginRight: 8
    }
})