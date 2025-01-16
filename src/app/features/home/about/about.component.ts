import { Component } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
