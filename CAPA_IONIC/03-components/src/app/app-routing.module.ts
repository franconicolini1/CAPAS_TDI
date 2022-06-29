import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'alert',
    loadChildren: () =>
      import('./pages/vista/vista.module').then((m) => m.VistaPageModule),
  },
  {
    path: 'action-sheet',
    loadChildren: () =>
      import('./action-sheet/action-sheet.module').then(
        (m) => m.ActionSheetPageModule
      ),
  },
  {
    path: 'avatar',
    loadChildren: () =>
      import('./pages/avatar/avatar.module').then((m) => m.AvatarPageModule),
  },
  {
    path: 'button',
    loadChildren: () =>
      import('./pages/button/button.module').then((m) => m.ButtonPageModule),
  },
  {
    path: 'card',
    loadChildren: () =>
      import('./pages/card/card.module').then((m) => m.CardPageModule),
  },
  {
    path: 'checkbox',
    loadChildren: () =>
      import('./pages/checkbox/checkbox.module').then(
        (m) => m.CheckboxPageModule
      ),
  },
  {
    path: 'date-time',
    loadChildren: () =>
      import('./pages/date-time/date-time.module').then(
        (m) => m.DateTimePageModule
      ),
  },
  {
    path: 'fab',
    loadChildren: () =>
      import('./pages/fab/fab.module').then((m) => m.FabPageModule),
  },
  {
    path: 'grid',
    loadChildren: () =>
      import('./pages/grid/grid.module').then((m) => m.GridPageModule),
  },
  {
    path: 'infinite-scroll',
    loadChildren: () =>
      import('./pages/infinite-scroll/infinite-scroll.module').then(
        (m) => m.InfiniteScrollPageModule
      ),
  },
  {
    path: 'input',
    loadChildren: () =>
      import('./pages/input/input.module').then((m) => m.InputPageModule),
  },
  {
    path: 'sliding',
    loadChildren: () =>
      import('./pages/sliding/sliding.module').then((m) => m.SlidingPageModule),
  },
  {
    path: 'reorder',
    loadChildren: () =>
      import('./pages/reorder/reorder.module').then((m) => m.ReorderPageModule),
  },
  {
    path: 'loading',
    loadChildren: () =>
      import('./pages/loading/loading.module').then((m) => m.LoadingPageModule),
  },
  {
    path: 'modal',
    loadChildren: () =>
      import('./pages/modal/modal.module').then((m) => m.ModalPageModule),
  },
  {
    path: 'popover-info',
    loadChildren: () =>
      import('./pages/popover-info/popover-info.module').then(
        (m) => m.PopoverInfoPageModule
      ),
  },
  {
    path: 'progress-range',
    loadChildren: () =>
      import('./pages/progress-range/progress-range.module').then(
        (m) => m.ProgressRangePageModule
      ),
  },
  {
    path: 'refresh',
    loadChildren: () =>
      import('./pages/refresh/refresh.module').then((m) => m.RefreshPageModule),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('./pages/search/search.module').then((m) => m.SearchPageModule),
  },
  {
    path: 'segment',
    loadChildren: () =>
      import('./pages/segment/segment.module').then((m) => m.SegmentPageModule),
  },
  {
    path: 'skeleton',
    loadChildren: () =>
      import('./pages/skeleton/skeleton.module').then(
        (m) => m.SkeletonPageModule
      ),
  },
  {
    path: 'slides',
    loadChildren: () =>
      import('./pages/slides/slides.module').then((m) => m.SlidesPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'toast',
    loadChildren: () =>
      import('./pages/toast/toast.module').then((m) => m.ToastPageModule),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
