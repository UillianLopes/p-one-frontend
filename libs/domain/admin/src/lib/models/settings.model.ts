export interface SettingsModel {
  language: string;
  currency: string;
  financial: DomainFinancialSettingsModel;
}

export interface DomainFinancialSettingsModel {
  currency: string;
}
