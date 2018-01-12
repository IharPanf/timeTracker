import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})

export class JournalPage {
  journal: any = [];
  myMoment: moment.Moment = moment();
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getJournal();
    this.journal.reverse();
  }

  getJournal() {
    let journal = this.navParams.get('journal');
    for (let key in journal) {
      if (journal.hasOwnProperty(key)) {
        journal[key]['day'] = moment(journal[key]['time']).format('MMMM') + ' ' + moment(journal[key]['time']).date();
        journal[key]['shortTime'] = moment(journal[key]['time']).format('HH:mm');
        this.journal.push(journal[key])  
      }
    }
  }
}
