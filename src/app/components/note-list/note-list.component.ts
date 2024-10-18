import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Note } from 'src/app/interfaces/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css'],
})
export class NoteListComponent implements OnInit {
  notes: Note[] = [];

  @Output() selectedNote = new EventEmitter<Note>();

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe((notes: Note[]) => {
      this.notes = notes;
    });
  }

  editNote(note: Note): void {
    this.selectedNote.emit(note);
    this.noteService.setEditable(true);
  }

  deleteNote(id: number): void {
    this.noteService.deleteNotebyId(id);
  }
}
