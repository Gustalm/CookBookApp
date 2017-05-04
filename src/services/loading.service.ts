import { LoadingController } from "ionic-angular";
import { Injectable } from "@angular/core";

@Injectable()
export class LoadingService {
    private loader: any;
    constructor(private loadingCtrl: LoadingController) {

    }

    showLoading(text: string, duration: number = 0) {
        this.loader = this.loadingCtrl.create({
            content: text
        });

        if (duration)
            this.loader.duration = duration;

        console.log(this.loader);
        this.loader.present();
    }

    dismissLoading(){
        this.loader.dismiss();
    }
}