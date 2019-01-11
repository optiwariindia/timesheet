import { NgModule } from '@angular/core';
import { CompHeaderComponent } from './comp-header/comp-header';
import { CompSidebarComponent } from './comp-sidebar/comp-sidebar';
@NgModule({
	declarations: [CompHeaderComponent,
    CompSidebarComponent
    ],
	imports: [],
	exports: [CompHeaderComponent,
    CompSidebarComponent]
})
export class ComponentsModule {}
