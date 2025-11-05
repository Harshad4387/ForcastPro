import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './sidebar-layout.html',
  styleUrls: ['./sidebar-layout.css']
})
export class SidebarLayout {
  sidebarOpen = false;

  toggleSidebar(state: boolean) {
    this.sidebarOpen = state;
  }
}
