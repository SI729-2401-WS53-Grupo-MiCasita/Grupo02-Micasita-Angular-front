import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { Injectable } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { environment } from '../../../../environments/environment';

if (environment.production) {
  enableProdMode();
}

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageRef = firebase.storage().ref();
  constructor() { }

  async uploadImage(archiver_name: string, name: string, imgBase64: any) {
    try {
      let response = await this.storageRef.child(archiver_name + "/" + name).putString(imgBase64, 'data_url');
      console.log(response);
      return await response.ref.getDownloadURL();
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
