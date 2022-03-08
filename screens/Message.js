import React, {useRef} from 'react'
import {Pressable, Text, StyleSheet, SafeAreaView, TextInput, Button} from 'react-native';
import * as SMS from 'expo-sms';

export default function Message({route}) {
    const [msg, setMsg] = React.useState('');
    const [data, setData] = React.useState({});
    const inputRef = useRef();

    React.useEffect(async() => {
        await setData(route.params.item);
    }, [data]);

    const sendMessage = async() => {
        const isAvailable = await SMS.isAvailableAsync();
        if(isAvailable && msg) {
            const { result } = await SMS.sendSMSAsync(data.phoneNumbers[0]['number'],msg);
            console.log(result)
            alert(result);
        }else {
            alert('There is no SMS available on this device')
        }
    }

    return (
        <Pressable  style={styles.container} onPress={() => inputRef.current.focus()}>
            <SafeAreaView>
                <Text style={styles.header}>{data?.name}</Text>
            </SafeAreaView>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={setMsg}
                    value={msg}
                    placeholder="Enter your message here..."
                    ref={inputRef}
                />
            </SafeAreaView>
            <Pressable style={styles.btn} onPress={sendMessage}>
                <Text style={styles.btnText}>Send</Text>
            </Pressable>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 8,
        borderColor: '#ddd',
        borderBottomWidth: .8,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'right',
        paddingRight: 15
    },
    input: {
        padding: 10,
        fontSize: 16
    },
    btn: {
        position: 'absolute',
        backgroundColor: 'dodgerblue',
        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: .75,
        bottom: 10, 
        right: 10,
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }
})