export enum LoginType {
  USER = 'USER',
  MASTER = 'MASTER',
  EMPLOYEE = 'EMPLOYEE',
}

export enum AdminType {
  MASTER = 'MASTER',
  EMPLOYEE = 'EMPLOYEE',
}

export interface GroupAdmin {
  id: number;
  name: string;
  content: string;
  selected: boolean;
}
