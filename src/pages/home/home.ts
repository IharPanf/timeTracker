import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { JournalPage } from './../../pages/journal/journal';
import * as moment from 'moment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {
  journal = [];
  activeTimer: string = '';
  lastTime: string = '';
  rootPage: any = HomePage;
  
  constructor(public navCtrl: NavController, private storage: Storage) {
    this.getData();
  }

  /*
   * set a key/value
   */
  setData(timerName:string) {
    let timestamp = new Date();
    this.journal.unshift({
      "timer": timerName,
      "time": timestamp,
      "shortTime": moment(timestamp).format('HH:mm'),
      "day": moment(timestamp).format('MMMM') + ' ' + moment(timestamp).date()
    });

    this.storage.set('journal', this.journal);
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
      journal: this.journal
    });
  }

  /*
   * get a key/value pair
   */
  getData() {
    this.storage.get('journal').then((val) => {
      this.journal = val;
    });
  }
  
  /*
   * get class name
   */
  getClassName(timerName:string) {
    if (this.journal.length > 0) {
      this.activeTimer = this.journal[0].timer;
    }
    return this.activeTimer === timerName ? 'timer--active' : '';
  }

  /*
   * get last value for timer
   */
  getLastValue(timerName: string): string {
    let lastTime: string = '';
    
    for (let i = 0; i < this.journal.length; i++) {
      if (this.journal[i].timer === timerName && lastTime.length === 0) {
        lastTime = this.journal[i].shortTime;
      }
    }

    return lastTime;
  }
}
