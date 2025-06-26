import { ComponentType, Element } from 'react';

export interface IRoute {
  showDivider?: boolean;
  name: string;
  layout: string;
  icon: JSX.Element | string;
  items?: any;
  path: string;
  secondary?: boolean | undefined;
}
interface RoutesType {
  showDivider?: boolean;
  heading?: string;
  name: string;
  layout: string;
  icon: JSX.Element | string;
  path: string;
  secondary?: boolean | undefined;
}
