import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Módulos de Angular Material agrupados
import { MaterialModule } from '../../shared/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

// Interfaces
export interface Paciente {
  dni: string;
  nombre: string;
  edad: number;
  fecha: string;
  hora: string;
  ubicacion: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    // Módulo de Material que contiene todos los componentes necesarios
    MaterialModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  selectedPatient: Paciente | null = null;
  patientForm: FormGroup;
  estados = [
    {value: 'hospitalizacion', viewValue: 'Hospitalización'},
    {value: 'consulta', viewValue: 'Consulta Externa'},
    {value: 'emergencia', viewValue: 'Emergencia'}
  ];
  servicios = [
    {value: 'medicina', viewValue: 'Medicina'},
    {value: 'cirugia', viewValue: 'Cirugía'},
    {value: 'pediatria', viewValue: 'Pediatría'}
  ];
  profesionales = [
    {value: 'dr1', viewValue: 'Dr. Juan Pérez'},
    {value: 'dr2', viewValue: 'Dra. María Gómez'},
    {value: 'dr3', viewValue: 'Dr. Carlos López'}
  ];
  // Datos de ejemplo para la tabla de pacientes
  pacientes: Paciente[] = [
    { dni: '23950250', nombre: 'Alvarez Jimenez Enrique Carlos', edad: 19, fecha: '31/03/2022', hora: '10:10 AM', ubicacion: 'Sala emergencia 1' },
    { dni: '23950251', nombre: 'Gomez Perez Maria', edad: 25, fecha: '01/04/2022', hora: '11:30 AM', ubicacion: 'Sala emergencia 2' },
    { dni: '23950252', nombre: 'Lopez Martinez Juan', edad: 35, fecha: '01/04/2022', hora: '02:15 PM', ubicacion: 'Sala emergencia 3' },
    { dni: '23950253', nombre: 'Rodriguez Sanchez Ana', edad: 28, fecha: '02/04/2022', hora: '09:45 AM', ubicacion: 'Sala emergencia 1' },
    { dni: '23950254', nombre: 'Garcia Fernandez Carlos', edad: 42, fecha: '02/04/2022', hora: '04:20 PM', ubicacion: 'Sala emergencia 2' },
  ];

  // Configuración de la tabla
  dataSource: MatTableDataSource<Paciente>;
  displayedColumns: string[] = ['dni', 'nombre', 'edad', 'fecha', 'hora', 'ubicacion'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder) {
    // Inicializar el dataSource con los datos de ejemplo
    this.dataSource = new MatTableDataSource(this.pacientes);
    
    // Inicializar el formulario
    this.patientForm = this.fb.group({
      estado: ['hospitalizacion'],
      fechaIngreso: [''],
      fechaHasta: [''],
      servicio: [''],
      profesional: [''],
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: ['']
    });
  }

  // Método para manejar la selección de un paciente
  selectPatient(paciente: Paciente) {
    this.selectedPatient = paciente;
    
    // Dividir el nombre completo en partes
    const nameParts = paciente.nombre.trim().split(' ');
    let nombre = '';
    let apellidoPaterno = '';
    let apellidoMaterno = '';

    // Asignar los valores en el orden correcto
    if (nameParts.length > 0) apellidoPaterno = nameParts[0]; // El primer elemento va a apellido materno
    if (nameParts.length > 1) apellidoMaterno = nameParts[1]; // El segundo a apellido paterno
    if (nameParts.length > 2) nombre = nameParts.slice(2).join(' '); // El resto a nombre

    this.patientForm.patchValue({
      nombre: nombre,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Método para filtrar la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
