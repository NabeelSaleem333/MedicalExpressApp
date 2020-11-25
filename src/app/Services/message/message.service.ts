import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private toast: ToastController) {}

  async message(msg: string) {
    const t = await this.toast.create({
      message: msg,
      duration: 3000,
    });
    t.present();
  }
} // End
