import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ValidatorErrorMessagePipe } from '../../pipes/validator-error-message.pipe';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'validator-error-message',
  templateUrl: './validator-error-message.component.html',
  styleUrls: ['./validator-error-message.component.scss'],
  imports: [CommonModule, ValidatorErrorMessagePipe, MatInputModule],
  standalone: true,
})
export class ValidatorErrorMessageComponent {
  @Input() controlName: AbstractControl = new FormControl();
}
