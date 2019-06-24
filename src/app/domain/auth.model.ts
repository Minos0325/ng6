import { User } from '.';
import { Err } from '.';

export interface Auth {
    user?: User;
    userId?: string;
    err?: string;
    token?: string;
}
  