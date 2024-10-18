import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes: Note[] = [];

  private noteSubject = new BehaviorSubject<Note[]>([]);
  private isEditable = new BehaviorSubject<boolean>(false)

  constructor() {}

  getEditable() {
    return this.isEditable.asObservable();
  }
  setEditable(value: boolean) {
    this.isEditable.next(value);
  }

  getNotes(): Observable<Note[]> {
    return this.noteSubject.asObservable();
  }

  updatedNote(updatedNote: Note) {
    const index = this.notes.findIndex((note) => note.id === updatedNote.id)
    if(index!=-1){
      this.notes[index] = updatedNote;
      this.noteSubject.next(this.notes);
    }

  }

  createNote(note: Note): void {
    note.id = this.notes.length;
    this.notes.push(note);
    this.noteSubject.next(this.notes);
  }

  deleteNotebyId(id: number): void {
    if (this.notes.length > 0) {
      this.notes = this.notes.filter((note) => note.id != id);
      this.noteSubject.next(this.notes);
    }
  }
}
