import { Component } from '@angular/core';
import { Note } from './interfaces/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  selectedNote!:Note

  selectedNotes(note :any){
    console.log("note" , note);
    
    this.selectedNote = note;
  }

}
