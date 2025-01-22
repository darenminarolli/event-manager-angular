import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-button',
  imports: [CommonModule, ButtonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  
 @Input({required:true}) labelText!: string;
 @Input() class!: string;
 @Input() disabled!: boolean;
//  @Input() severity!: string;
//  @Input() icon!: string;
//  @Input() iconPosition!: string;
 @Input() type!: string;
}
