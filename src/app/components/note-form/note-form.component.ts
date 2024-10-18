import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Note } from 'src/app/interfaces/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
})
export class NoteFormComponent implements OnInit, OnChanges {
  noteForm!: FormGroup;
  isEdited!: boolean;
  @Input() selectedNote!: Note;

  constructor(
    private formbuilder: FormBuilder,
    private noteService: NoteService
  ) {
    this.noteService.getEditable().subscribe({
      next: (response) => {
        this.isEdited = response;
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (changes['selectedNote']?.currentValue) {
      const value = changes['selectedNote']?.currentValue;
      this.noteForm.patchValue({
        id: value.id,
        title: value.title,
        content: value.content,
      });
    }
  }

  ngOnInit(): void {
    this.noteForm = this.formbuilder.group({
      id: new Date().getTime(),
      title: [''],
      content: [''],
    });
  }

  addNote(): void {
    if (this.noteForm.invalid) {
      return;
    }

    const newNote: Note = this.noteForm.value;
    if (this.isEdited) {
      this.noteService.updatedNote(newNote);
    } else {
      this.noteService.createNote(newNote);
    }
    this.noteForm.reset();
  }
}
