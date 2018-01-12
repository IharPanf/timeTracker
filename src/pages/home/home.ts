import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { JournalPage } from './../../pages/journal/journal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  timerJournal = {};
  activeTimer: string = '';
  
  constructor(public navCtrl: NavController, private storage: Storage) {}
  rootPage: any = HomePage;
  /*
   * set a key/value
   */
  setData(timerName:string) {
    let timestamp = new Date();
    let point = this.returnTimestamp();
    this.timerJournal[point] = {
      "timer": timerName,
      "time": timestamp
    };

    this.storage.set('journal', this.timerJournal);
    this.activeTimer = timerName;
  }

  /**
   * return timestamp
   */
  public returnTimestamp() {
    return Math.round(new Date().getTime() / 1000);
  }

  /**
   * get journal
   */
  getJournal() {
    this.getData();
    this.navCtrl.push(JournalPage, {
      journal: this.timerJournal
    });
  }

  /*
   * get a key/value pair
   */
  getData() {
    this.storage.get('journal').then((val) => {
      this.timerJournal = val;
    });
  }
  
  /*
   * get class name
   */
  getClassName(timerName:string) {
    return this.activeTimer === timerName ? 'timer--active' : '';
  }
}
