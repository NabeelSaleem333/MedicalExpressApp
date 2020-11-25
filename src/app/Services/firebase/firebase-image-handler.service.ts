import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { JwtService } from './../../core/services/jwt.service';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseImageHandler {
  task: AngularFireUploadTask;

  constructor(
    private authService: JwtService,
    private storage: AngularFireStorage
  ) {}

  public async uploadProfileImg(credentials, folder) {
    const token = await this.authService.getToken();
    const decodedToken = this.authService.getUserId();

    const uploadObs = this.uploadFileAndGetMetadata(
      credentials.file,
      decodedToken,
      folder
    );

    return uploadObs.downloadUrl$;
  }

  uploadFileAndGetMetadata(fileToUpload: File, userId, folder) {
    const filePath = `public/img/${folder}/${folder}-${Date.now()}-${userId}`;
    const ref = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, fileToUpload);

    return {
      uploadProgress$: this.task.percentageChanges(),
      downloadUrl$: this.getDownloadUrl$(this.task, filePath),
    };
  }

  private getDownloadUrl$(
    uploadTask: AngularFireUploadTask,
    path: string
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.storage.ref(path).getDownloadURL())
    );
  }

  async deleteImage(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }
}
