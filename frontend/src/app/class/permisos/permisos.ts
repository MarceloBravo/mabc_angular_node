export class Permisos {
  id?: number;
  roles_id!: number;
  pantallas_id!: number;
  acceder?: boolean =  false;
  crear?: boolean = false;
  modificar?: boolean = false;
  eliminar?: boolean = false;
  permite_crear?: boolean = true;
  permite_modificar?: boolean = true;
  permite_eliminar?: boolean = true;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date;
  rol?: string = "";
  pantalla?: string = "";
}
