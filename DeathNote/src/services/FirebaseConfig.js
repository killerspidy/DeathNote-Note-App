import { View, Text } from 'react-native'
import React from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const FirebaseConfig = {
    apiKey: "AIzaSyDqwkyqb40JXMoMHQPebYIsKsjWWyJN6C0",
    authDomain: "deathnote-eef1d.firebaseapp.com",
    databaseURL: "https://deathnote-eef1d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "deathnote-eef1d",
    storageBucket: "deathnote-eef1d.firebasestorage.app",
    messagingSenderId: "51117411932",
    appId: "1:51117411932:web:4e6cfcce389d3c415e2099",
    measurementId: "G-EH22ZVP9ME"
}

const app = initializeApp(FirebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export{auth,database};