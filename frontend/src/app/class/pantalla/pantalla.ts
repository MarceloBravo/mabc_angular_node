import { Menu } from '../menus/menu';
export class Pantalla {
  id?: number;
  nombre!: string;
  menus_id!: number;
  menu?: string;
  url?: string;
  permite_crear!: boolean;
  permite_modificar!: boolean;
  permite_eliminar!: boolean;
  created_at!: Date;
  updated_at!: Date;
  deleted_at?:Date;
}
