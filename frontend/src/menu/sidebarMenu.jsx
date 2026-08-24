import { getUser } from "../services/auth/auth";

const menuList = {
  admin:[
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: 'IconLayoutGrid'
    },
    {
      id: 'employees',
      title: 'Employees',
      type: 'item',
      url: '/employees',
      icon: 'IconUsers'
    },
    {
      id: 'departments',
      title: 'Departments',
      type: 'item',
      url: '/departments',
      icon: 'IconBuilding'
    },
    {
      id: 'attendance',
      title: 'Attendance',
      type: 'item',
      url: '/attendance',
      icon: 'IconClock'
    },
    {
      id: 'leave',
      title: 'Leave',
      type: 'item',
      url: '/leave',
      icon: 'IconCalendarEvent'
    },
    {
      id: 'payroll',
      title: 'Payroll',
      type: 'item',
      url: '/payroll',
      icon: 'IconCash'
    },
    // {
    //   id: 'performance',
    //   title: 'Performance',
    //   type: 'item',
    //   url: '/performance',
    //   icon: 'IconLayoutGrid'
    // },
    {
      id: 'reports',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: 'IconReportAnalytics'
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      icon: 'IconSettings'
    },
],
hr:[
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: 'IconLayoutGrid'
    },
    {
      id: 'employees',
      title: 'Employees',
      type: 'item',
      url: '/employees',
      icon: 'IconUsers'
    },
    {
      id: 'departments',
      title: 'Departments',
      type: 'item',
      url: '/departments',
      icon: 'IconBuilding'
    },
    {
      id: 'attendance',
      title: 'Attendance',
      type: 'item',
      url: '/attendance',
      icon: 'IconClock'
    },
    {
      id: 'leave',
      title: 'Leave',
      type: 'item',
      url: '/leave',
      icon: 'IconCalendarEvent'
    },
    {
      id: 'payroll',
      title: 'Payroll',
      type: 'item',
      url: '/payroll',
      icon: 'IconCash'
    },
    {
      id: 'performance',
      title: 'Performance',
      type: 'item',
      url: '/performance',
      icon: 'IconLayoutGrid'
    },
    {
      id: 'reports',
      title: 'Reports',
      type: 'item',
      url: '/reports',
      icon: 'IconReportAnalytics'
    },

],
manager:[
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: 'IconLayoutGrid'
    },
    {
      id: 'team',
      title: 'My Team',
      type: 'item',
      url: '/team',
      icon: 'IconUsers'
    },
    
    {
      id: 'attendance',
      title: 'Attendance',
      type: 'item',
      url: '/attendance',
      icon: 'IconClock'
    },
    {
      id: 'leave',
      title: 'Leave',
      type: 'item',
      url: '/leave',
      icon: 'IconCalendarEvent'
    },
    {
      id: 'performance',
      title: 'Performance',
      type: 'item',
      url: '/performance',
      icon: 'IconCalendarEvent'
    },
    
    
],
user:[
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: 'IconLayoutGrid'
    },
    {
      id: 'profile',
      title: 'My Profile',
      type: 'item',
      url: '/profile',
      icon: 'IconLayoutGrid'
    },
   
    {
      id: 'attendance',
      title: 'Attendance',
      type: 'item',
      url: '/attendance',
      icon: 'IconClock'
    },
    {
      id: 'leave',
      title: 'Leave',
      type: 'item',
      url: '/leave',
      icon: 'IconCalendarEvent'
    },
    {
      id: 'payslip',
      title: 'Payslip',
      type: 'item',
      url: '/payslip',
      icon: 'IconCash'
    },
   
],

};

// let menuList = [];
// const user = getUser();
// menuList = menu[user?.role.toLowerCase()];
// debugger
export default menuList;