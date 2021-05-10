import { Rol } from '../rol/rol';

export class Login {
  access_token: string = '';
    token_type: string = '';
    expires_in: number = 0;
    roles!: Rol[]
}
