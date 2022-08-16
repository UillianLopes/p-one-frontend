export interface ApplicationModel {
  title: string;
  description: string;
  modules: ModuleModel[];
}

export interface ModuleModel {
  title: string;
  description: string;
  roles: RoleModel[];
}

export interface RoleModel {
  title: string;
  description: string;
  key: string;
  isActive: boolean;
}
