import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from "./settings.component";
import {ModuleWithProviders} from "@angular/core";

export const settingsRoutes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        data: {
            pageTitle: 'Settings'
        }
    }
];

export const settingsRouting:ModuleWithProviders = RouterModule.forChild(settingsRoutes);

