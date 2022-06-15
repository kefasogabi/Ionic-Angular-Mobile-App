import { TrackingModalComponent } from './tracking-modal/tracking-modal.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { RiderExpandedComponent } from './rider-expanded/rider-expanded.component';
import { VendorExpandedComponent } from './vendor-expanded/vendor-expanded.component';
import { ExpandableComponent } from './expandable/expandable.component';
import { MapModalComponent } from './map-modal/map-modal.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCardComponent } from './home-card/home-card.component';
import { IonicModule } from '@ionic/angular';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { DetailItemComponent } from './detail-item/detail-item.component';
import { BillCardComponent } from './bill-card/bill-card.component';
import { AvatarComponent } from './avatar/avatar.component';
import { SmallCardComponent } from './small-card/small-card.component';
import { BudgetItemComponent } from './budget-item/budget-item.component';
import { CategoryComponent } from './category/category.component';
import { StockItemComponent } from './stock-item/stock-item.component';
import { StarterCardComponent } from './starter-card/starter-card.component';
import { IntegerInputDirective } from 'src/Directives/num-validation.directive';
import { ImagePickerComponent } from './image-picker/image-picker.component';

@NgModule({
  declarations: [
    HomeCardComponent,
    CreditCardComponent,
    BillCardComponent,
    DetailItemComponent,
    AvatarComponent,
    SmallCardComponent,
    BudgetItemComponent,
    CategoryComponent,
    StarterCardComponent,
    StockItemComponent,
    IntegerInputDirective,
    ImagePickerComponent,
    LocationPickerComponent,
    MapModalComponent,
    ExpandableComponent,
    VendorExpandedComponent,
    RiderExpandedComponent,
    StarRatingComponent,
    TrackingModalComponent
  ],
  imports: [CommonModule, IonicModule.forRoot()],
  exports: [
    HomeCardComponent,
    CreditCardComponent,
    BillCardComponent,
    DetailItemComponent,
    AvatarComponent,
    SmallCardComponent,
    BudgetItemComponent,
    CategoryComponent,
    StarterCardComponent,
    StockItemComponent,
    ImagePickerComponent,
    LocationPickerComponent,
    MapModalComponent,
    IntegerInputDirective,
    ExpandableComponent,
    VendorExpandedComponent,
    RiderExpandedComponent,
    StarRatingComponent,
    TrackingModalComponent
  ],
  entryComponents: [MapModalComponent]
})
export class ComponentsModule {}
