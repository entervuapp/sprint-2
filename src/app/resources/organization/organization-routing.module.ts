import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManageCandidateService } from "./manage-candidates/manage-candidates/manage-candidate.service";
import { ManageEventsService } from "./manage-events/manage-events/manage-events.service";

const routes: Routes = [];
const SERVICES_LIST = [ManageCandidateService, ManageEventsService];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [...SERVICES_LIST],
})
export class OrganizationRoutingModule {}
