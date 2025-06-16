import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../shared/material.module';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

export interface Paciente {
  dni: string;
  nombre: string;
  edad: number;
  fecha: string;
  hora: string;
  ubicacion: string;
}

@Component({
  selector: 'app-patients',
  imports: [CommonModule, RouterModule, MaterialModule, ReactiveFormsModule, MatIconModule, FormsModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})
export class PatientsComponent implements OnInit, AfterViewInit {
  tipoServicio: string = '';
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
  // Datos de pacientes cargados desde el archivo JSON
  pacientes: Paciente[] = [];

  // Configuración de la tabla
  dataSource: MatTableDataSource<Paciente>;
  displayedColumns: string[] = ['dni', 'nombre', 'edad', 'fecha', 'hora', 'ubicacion'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    // Inicializar el dataSource vacío, se llenará cuando se carguen los datos
    this.dataSource = new MatTableDataSource<Paciente>([]);
    
    // Inicializar el formulario con controles deshabilitados
    this.patientForm = this.fb.group({
      estado: {value: 'hospitalizacion', disabled: true},
      fechaIngreso: {value: '', disabled: true},
      fechaHasta: {value: '', disabled: true},
      servicio: {value: '', disabled: true},
      profesional: {value: '', disabled: true},
      nombre: {value: '', disabled: true},
      apellidoPaterno: {value: '', disabled: true},
      apellidoMaterno: {value: '', disabled: true}
    });
  }

  ngOnInit() {
    this.loadPatients();
  }

  ngAfterViewInit() {
    this.initializeTable();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadPatients() {
    this.http.get<any>('assets/data/patients.json').subscribe({
      next: (data) => {
        this.pacientes = data.pacientes;
        this.initializeTable();
      },
      error: (error) => {
        console.error('Error al cargar los pacientes:', error);
      }
    });
  }

  private initializeTable() {
    this.dataSource = new MatTableDataSource(this.pacientes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectPatient(paciente: Paciente) {
    this.selectedPatient = paciente;
    
    // Dividir el nombre completo en partes
    const nameParts = paciente.nombre.trim().split(' ');
    let nombre = '';
    let apellidoPaterno = '';
    let apellidoMaterno = '';

    // Asignar los valores en el orden correcto
    if (nameParts.length > 0) apellidoPaterno = nameParts[0];
    if (nameParts.length > 1) apellidoMaterno = nameParts[1];
    if (nameParts.length > 2) nombre = nameParts.slice(2).join(' ');

    // Actualizar el formulario con los datos del paciente seleccionado
    this.patientForm.patchValue({
      nombre: nombre,
      apellidoPaterno: apellidoPaterno,
      apellidoMaterno: apellidoMaterno
    });
  }
}
