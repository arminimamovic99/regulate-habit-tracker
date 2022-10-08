import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HabitsService } from '../habits.service';

@Component({
  selector: 'app-add-habit',
  templateUrl: './add-habit.component.html',
  styleUrls: ['./add-habit.component.sass']
})
export class AddHabitComponent implements OnInit {
  showForm: boolean = false;
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    goal: new FormControl('', [Validators.required, Validators.minLength(1)])
  });

  constructor(
    private dialogRef: MatDialogRef<AddHabitComponent>,
    private habitsService: HabitsService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);

    this.habitsService.createHabit({
      id: Math.random(),
      name: this.form.value.name,
      count: this.form.value.goal
    })

    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
