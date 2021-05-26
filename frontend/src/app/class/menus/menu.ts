export class Menu {
  id!: number;
  nombre!: string;
  url!: string;
  menu_padre_id?: number;
  posicion!: number;
  acceder?: boolean;
  sub_menu?: Menu[];
  created_at!: Date;
  updated_at!: Date;
  deleted_at?: Date;
}
