import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-journal',
  templateUrl: 'journal.html'
})

export class JournalPage {
  journal: any = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getJournal();
  }

  getJournal() {
    this.journal = this.navParams.get('journal');
  }
}
