export { };

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface RoutesType {
    showDivider?: boolean;
    heading?: string;
    submenu: any;
    name: string;
    layout: string;
    icon: JSX.Element | string;
    path: string;
    secondary?: boolean | undefined;
    submenu?: RoutesType[];
  }
}
