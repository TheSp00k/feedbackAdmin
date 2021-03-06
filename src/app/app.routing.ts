/**
 * Created by griga on 7/11/16.
 */


import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from "./shared/layout/app-layouts/main-layout.component";
import {AuthLayoutComponent} from "./shared/layout/app-layouts/auth-layout.component";
import {ModuleWithProviders} from "@angular/core";
import {AuthGuard} from "./+auth/auth.guard.service";
import {FeedbackComponent} from "./feedback/feedback.component";
import {SettingsComponent} from "./settings/settings.component";
import {ProductComponent} from "./product/product.component";
import {RequestComponent} from "./request/request.component";

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    data: {pageTitle: 'Dashboard'},
    canActivate: [AuthGuard],
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full',


      },
      {path: 'dashboard', loadChildren: 'app/+home/home.module#HomeModule',data:{pageTitle: 'Dashboard'}},
      {path: 'feedback', component: FeedbackComponent, loadChildren: 'app/feedback/feedback.module#FeedbackModule',data:{pageTitle: 'Feedback'}},
    //   {path: 'settings', component: SettingsComponent, data:{pageTitle: 'Settings'}},
      {path: 'products', component: ProductComponent, loadChildren: 'app/product/product.module#ProductModule',data:{pageTitle: 'Products'}},
      // {path: 'products/:id', component: ProductItemComponent, data:{pageTitle: 'Product details'}},
      {path: 'settings', component: SettingsComponent, loadChildren: 'app/settings/settings.module#SettingsModule',data:{pageTitle: 'Settings'}},
      // {path: 'smartadmin', loadChildren: 'app/+smartadmin-intel/smartadmin-intel.module#SmartadminIntelModule',data:{pageTitle: 'Smartadmin'}},
      // {path: 'app-views', loadChildren: 'app/+app-views/app-views.module#AppViewsModule',data:{pageTitle: 'App Views'}},
      // {path: 'calendar', loadChildren: 'app/+calendar/calendar.module#CalendarModule',data:{pageTitle: 'Calendar'}},
      // {path: 'e-commerce', loadChildren: 'app/+e-commerce/e-commerce.module#ECommerceModule',data:{pageTitle: 'E-commerce'}},
      // {path: 'forms', loadChildren: 'app/+forms/forms-showcase.module#FormsShowcaseModule',data:{pageTitle: 'Forms'}},
      // {path: 'graphs', loadChildren: 'app/+graphs/graphs-showcase.module#GraphsShowcaseModule',data:{pageTitle: 'Graphs'}},
      // {path: 'maps', loadChildren: 'app/+maps/maps.module#MapsModule',data:{pageTitle: 'Maps'}},
      // {path: 'miscellaneous', loadChildren: 'app/+miscellaneous/miscellaneous.module#MiscellaneousModule',data:{pageTitle: 'Miscellaneous'}},
      // {path: 'outlook', loadChildren: 'app/+outlook/outlook.module#OutlookModule',data:{pageTitle: 'Outlook'}},
      // {path: 'tables', loadChildren: 'app/+tables/tables.module#TablesModule',data:{pageTitle: 'Tables'}},
      // {path: 'ui', loadChildren: 'app/+ui-elements/ui-elements.module#UiElementsModule',data:{pageTitle: 'Ui'}},
      // {path: 'widgets', loadChildren: 'app/+widgets/widgets-showcase.module#WidgetsShowcaseModule',data:{pageTitle: 'Widgets'}},
    ]
  },

  {path: 'auth', component: AuthLayoutComponent, loadChildren: 'app/+auth/auth.module#AuthModule'},
  {path: 'request/:id/:accessToken', component: RequestComponent, loadChildren: 'app/request/request.module#RequestModule'},
  {path: 'request/:id/:accessToken/:feedbackLeft', component: RequestComponent, loadChildren: 'app/request/request.module#RequestModule'},
  {path: '**', redirectTo: 'dashboard'}
//
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});
