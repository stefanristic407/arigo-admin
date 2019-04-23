import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { NewAuctionComponent } from './new-auction/new-auction.component';
import { BidComponent } from './bid.component';
import { PendingAuctionsComponent } from './pending-auctions/pending-auctions.component';
import { ProgressAuctionsComponent } from './progress-auctions/progress-auctions.component';
import { ClosedAuctionsComponent } from './closed-auctions/closed-auctions.component';
import { AuctionDialogComponent } from './auction-dialog/auction-dialog.component';

export const routes = [
  { path: '', component: BidComponent, pathMatch: 'full' },
  { path: 'newauction', component: NewAuctionComponent, data: { breadcrumb: 'New auction' } },
  { path: 'pendingauctions', component: PendingAuctionsComponent, data: { breadcrumb: 'Pending auction' } },
  { path: 'progressauctions', component: ProgressAuctionsComponent, data: { breadcrumb: 'Progress auction' } },
  { path: 'closedauctions', component: ClosedAuctionsComponent, data: { breadcrumb: 'Closed auction' } },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule,
  ],
  declarations: [
    NewAuctionComponent, 
    BidComponent, PendingAuctionsComponent, 
    ProgressAuctionsComponent, 
    ClosedAuctionsComponent, 
    AuctionDialogComponent
  ],
  entryComponents: [
    AuctionDialogComponent,
  ]
})
export class BidModule { }
