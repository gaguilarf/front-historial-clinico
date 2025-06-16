import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  imports: [CommonModule, RouterModule, SidebarMenuComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  isSidebarCollapsed = false;
  user = { name: 'Valentina', profileImage: 'assets/user.jpg' };
  currentTitle = 'Bienvenida';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const module = router.url.split('/')[1];
        this.currentTitle = this.getTitleFromRoute(module);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  getTitleFromRoute(route: string): string {
    switch (route) {
      case 'usuarios': return 'Gestión de Usuarios';
      case 'reportes': return 'Panel de Reportes';
      default: return 'Bienvenida';
    }
  }

}
