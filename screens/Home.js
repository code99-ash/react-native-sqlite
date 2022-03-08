import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, Pressable } from 'react-native';
import * as Contacts from 'expo-contacts'

export default function Home({navigation}) {
    const [contacts, setContacts]  = useState([]);
 
    useEffect(async() => {
            const {status} = await Contacts.requestPermissionsAsync();
            if(status === 'granted') {
                const {data} = await Contacts.getContactsAsync({});
                setContacts(data);
                // if(data.length > 0) {
                //     const contact = data.find(each => each.id === "8253");
                //     console.log(contact)
                // }
            }
            
    }, [])

    const navigateTo = item => {
        navigation.navigate('Message', {item})
    }

    const renderItem = ({ item }) => (
            <Pressable style={styles.item} onPress={()=>navigateTo(item)}>
                <Image 
                    source={!item.imageAvailable?
                        require('../assets/favicon.png'):{uri: item.image.uri}} 
                    style={styles.image}
                />
                <View>
                    <Text style={styles.name}>{item.name}</Text>
                    {item.phoneNumbers?.map((each, i) => i == 0 && <Text key={i} style={styles.num}>{each.number}</Text>)}
                    {/* <Text>{item.id}</Text> */}
                </View>
            </Pressable>
        );
    return (
        <View>
            {/* <Text style={styles.text}>Home Screen</Text> */}
            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={contacts} 
                    renderItem={renderItem} 
                    keyExtractor={item => item.id} 
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 8,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginTop: 1.5
    },
    name: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    num: {
        color: '#999',
        fontSize: 12
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 50
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})