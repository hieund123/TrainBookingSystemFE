import { INavData } from '@coreui/angular';

export interface INavDataWithRoles extends INavData {
  roles?: string[];
}

export const navItems: INavDataWithRoles[] = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   iconComponent: { name: 'cil-speedometer' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  //   roles: ['Admin', 'Passenger'],
  // },
  {
    name: 'Tìm và đặt vé',
    url: '/schedule-lookup',
    iconComponent: { name: 'cil-map' },
    
  },
  {
    name: 'Lịch sử đặt vé',
    url: '/booking-history',
    iconComponent: { name: 'cil-map' },
    roles: ['Admin', 'Passenger'],
  },
  {
    name: 'Quản lý chuyến tàu',
    url: '/journey',
    iconComponent: { name: 'cil-map' },
    roles: ['Admin'],
  },
  {
    name: 'Quản lý ga tàu',
    url: '/train-station',
    iconComponent: { name: 'cil-map' },
    roles: ['Admin'],
  },
  {
    name: 'Quản lý loại toa',
    url: '/carriage-class',
    iconComponent: { name: 'cil-map' },
    roles: ['Admin'],
  },
];
