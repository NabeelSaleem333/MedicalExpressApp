// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url: 'http://localhost:7000/api',
  // https://medicalexpress.herokuapp.com/api   http://localhost:3000/api
  firebaseConfig: {
    apiKey: 'AIzaSyAAhYIdrzBjKELgND53dkaQswDMbxcCb-Q',
    authDomain: 'medicalexpress-3e768.firebaseapp.com',
    databaseURL: 'https://medicalexpress-3e768.firebaseio.com',
    projectId: 'medicalexpress-3e768',
    storageBucket: 'medicalexpress-3e768.appspot.com',
    messagingSenderId: '729805146941',
    appId: '1:729805146941:web:88a65a02979761499b9354',
    measurementId: 'G-8BH5LZSTC3'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
