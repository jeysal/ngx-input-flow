import './e2e-polyfills';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { E2eModule } from './e2e.module';

platformBrowserDynamic().bootstrapModule(E2eModule);
