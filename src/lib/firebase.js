/* eslint-disable no-invalid-this */
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyDSKgK1d5zpwvrmjpMg0ABH_K9X0n6Ji2Y',
    authDomain: 'hareketlen-8266d.firebaseapp.com',
    databaseURL: 'https://hareketlen-8266d.firebaseio.com',
    projectId: 'hareketlen-8266d',
    storageBucket: 'hareketlen-8266d.appspot.com',
    messagingSenderId: '189197197985',
    appId: '1:189197197985:web:e02041bd81b6ad3cf206e0',
    measurementId: 'G-3V9TQWKEH4'
};

export default class FirebaseAPI {
    constructor () {
        app.initializeApp(firebaseConfig);

        this.FieldValue = app.firestore.FieldValue;
        this.Timestamp = app.firestore.Timestamp;

        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();

        this.authUser = null;

        this.githubProvider = new app.auth.GithubAuthProvider();
    }

    getGame = gameId => this.db.collection('games')
        .doc(gameId)
        .get();

    loadGameFile = filePath => {
        const ref = this.storage.ref(filePath);
        return ref.getDownloadURL()
            .then(url => fetch(url))
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
                }
                return response.arrayBuffer();
            })
            .then(buffer => new Uint8Array(buffer));
    }
}
