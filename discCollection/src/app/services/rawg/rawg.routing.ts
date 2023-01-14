import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { HomeComponent } from 'src/app/home/home.component';
import { SearchComponent } from 'src/app/search/search.component';
import { UserLibraryComponent } from 'src/app/user-library/user-library.component';

const apikey = '0a799dff77744cf0a8fd7ea3c76db3e2';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'userlibrary', component: UserLibraryComponent },
];

export const RawgRouteRoutes = RouterModule.forChild(routes);
