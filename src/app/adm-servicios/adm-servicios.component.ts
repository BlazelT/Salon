import { Component, OnInit, ViewChild } from '@angular/core';
import { AdmServiciosService } from '../adm-servicios/adm-servicios.service'

import { MatDialog, MatTableDataSource, MatPaginator } from '@angular/material';
import { ModalAgregarComponent } from '../componentes/adm-servicios/modal-agregar/modal-agregar.component';
import { ModalEditarComponent } from '../componentes/adm-servicios/modal-editar/modal-editar.component';
import { ModalBorrarServicioComponent } from '../componentes/adm-servicios/modal-borrar-servicio/modal-borrar-servicio.component';
import { UserService } from '../user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-servicios',
  templateUrl: './adm-servicios.component.html',
  styleUrls: ['./adm-servicios.component.scss'],

})
export class AdmServiciosComponent implements OnInit {
  constructor(private AdmServicios: AdmServiciosService, public dialog: MatDialog, public user : UserService , public afAuth: AngularFireAuth ,
     private db: AngularFireDatabase, private router: Router) { }


  servicios: IServicio[] = [];
  customCollapsedHeight;
  customExpandedHeight;
  dataSource;
  displayedColumns: string[] = ['descripcion', 'editar', 'borrar'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit() {



    history.pushState(null, null, document.URL);
    this.servicios = [];
    this.mapearObjetosArray(await this.AdmServicios.obtenerServicios());

    this.dataSource = new MatTableDataSource<any>(this.servicios);
    this.dataSource.paginator = this.paginator;

    this.customCollapsedHeight = (window.innerWidth <= 400) ? '100px' : '40px';
    this.customExpandedHeight = (window.innerWidth <= 400) ? '100px' : '40px';


  }

  onResize(event) {

    this.customCollapsedHeight = (event.target.innerWidth <= 400) ? '100px' : '40px';
    this.customExpandedHeight = (event.target.innerWidth <= 400) ? '100px' : '40px';
  }


  mapearObjetosArray(objeto) {
    console.log(objeto);
    for (let key in objeto) {
      console.log(key);
      let servicio = objeto[key];
      servicio['idServicio'] = key;
      this.servicios.push(servicio);
    }
  }

  modalAgregarServicio() {
    console.log("asdas");

    const dialogRef = this.dialog.open(ModalAgregarComponent, {
      width: "340px",
      maxWidth: "600px",
      autoFocus: true,
      hasBackdrop: true,
      closeOnNavigation: true,
      data: { servicios: this.servicios }

    });

    dialogRef.afterClosed().subscribe(o => {
      console.log(o);

      if (o == true) {
        this.ngOnInit();
      }
    });

  }

  modalEditarServicio(servicio) {
    const dialogRef2 = this.dialog.open(ModalEditarComponent, {
      width: "340px",
      maxWidth: "600px",
      autoFocus: true,
      hasBackdrop: true,
      closeOnNavigation: true,
      data: {
        servicios: this.servicios,
        servicioSeleccionado: servicio
      }

    });

    dialogRef2.afterClosed().subscribe(o => {


      if (o == true) {

        this.ngOnInit();
      }
    });
  }

  modalBorrarServicio(servicio) {
    const dialogRef2 = this.dialog.open(ModalBorrarServicioComponent, {
      width: "340px",
      maxWidth: "600px",
      autoFocus: true,
      hasBackdrop: true,
      closeOnNavigation: true,
      data: {
        servicioSeleccionado: servicio
      }

    });

    dialogRef2.afterClosed().subscribe(o => {

      if (o == true) {

        this.ngOnInit();
      }
    });
  }


}
