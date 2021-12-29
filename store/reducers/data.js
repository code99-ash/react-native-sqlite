import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('tutorialDB');

db.transaction(tx =>{
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INT)'
    )
})

const reducer = (state=[], actions) => {
    const {type, payload} = actions;

    if(type === 'PASS_DATA') {
        return state = payload
    }
    if(type === 'NEW_DATA') {
        return state = [...state, payload]
    }
    if(type === 'DELETE_ITEM') {
        return state.filter(each => each.id !== payload);
    }

    return state;
}

export default reducer;
