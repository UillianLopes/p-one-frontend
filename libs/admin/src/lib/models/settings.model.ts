export interface SettingsModel {
  language: string;
  currency: string;
  financial: FinancialSettingsModel;
}

export interface FinancialSettingsModel {
  currency: string;
}
