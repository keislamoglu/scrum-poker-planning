import {Component, OnInit, ViewChild} from '@angular/core';
import {SessionService} from '../../services';
import {MasterPanelComponent} from '../master-panel/master-panel.component';
import {ActiveStoryComponent} from '../active-story/active-story.component';

@Component({
  templateUrl: './view-master.component.html',
  styleUrls: ['./view-master.component.scss'],
  providers: [SessionService]
})
export class ViewMasterComponent implements OnInit {
  @ViewChild('masterPanel') masterPanel: MasterPanelComponent;
  @ViewChild('activeStory') activeStory: ActiveStoryComponent;
  sessionId: string;
  viewDevUrl: string;
  ended = false;

  constructor(private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.sessionId = this.sessionService.getSessionId();
    this.viewDevUrl = location.origin + '/view-developer/' + this.sessionId;
  }

  onStoryChange(activeStoryId: string) {
    if (this.ended) {
      return;
    }
    if (activeStoryId === null) {
      this.ended = true;
    }
    this.masterPanel.loadStory(activeStoryId);
    this.activeStory.loadStory(activeStoryId);
  }
}
