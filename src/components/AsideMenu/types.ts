export type MenuItem = {
  label: string;
  link: string;
  icon: React.ReactNode;
  roles?: string[];
  submenu?: SubmenuItem[];
};

export type SubmenuItem = {
  label: string;
  link: string;
  roles?: string[];
};
