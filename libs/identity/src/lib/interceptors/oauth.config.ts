import { InjectionToken } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';

export const O_AUTH_CONFIG = new InjectionToken<AuthConfig>('O_AUTH_CONFIG');
