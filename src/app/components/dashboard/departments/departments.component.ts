import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';

const DEPARTMENTS = [
  {
    name: "Medicina General",
    route: "medicine",
    children: [
      { name: "Servicio Médico Interno", route: "med-inter" },
      { name: "Servicio Psiquiatría", route: "psiquiatry" }
    ]
  },
  {
    name: "Pediatría",
    route: "pediatry",
    children: [
      { name: "Otras Especialidades", route: "other" },
      { name: "Pediatría General", route: "general" }
    ]
  },
  {
    name: "Nutrición y Dietética",
    route: "nutricion"
  }
];

interface DepartmentChild {
  name: string;
  route: string;
}

interface Department {
  name: string;
  route: string;
  children?: DepartmentChild[];
}

@Component({
  selector: 'app-departments',
  imports: [MaterialModule, RouterModule, FormsModule, CommonModule, MatExpansionModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = DEPARTMENTS;
  filterText = '';
  filteredDepartments: Department[] = [];

  ngOnInit(): void {
    this.filteredDepartments = this.departments;
  }

  ngOnChanges(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    const term = this.filterText.toLowerCase();

    this.filteredDepartments = this.departments
      .map(dep => {
        if (dep.children) {
          const filteredChildren = dep.children.filter(child =>
            child.name.toLowerCase().includes(term)
          );

          if (filteredChildren.length > 0 || dep.name.toLowerCase().includes(term)) {
            return { ...dep, children: filteredChildren };
          }
        } else if (dep.name.toLowerCase().includes(term)) {
          return dep;
        }
        return null;
      })
      .filter(dep => dep !== null);
  }
}
