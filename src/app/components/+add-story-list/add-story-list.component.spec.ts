import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AddStoryListComponent} from './add-story-list.component';
import {Component} from '@angular/core';
import {SessionRepoService} from '../../repositories';
import {Session} from '../../entities';
import {Observable, of} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';

describe('AddStoryListComponent', () => {
  let fixture: ComponentFixture<AddStoryListComponent>;
  let component: AddStoryListComponent;

  const sessionRepoService = {
    add: jasmine.createSpy('add').and.callFake((session: Session): Observable<Session> => {
      session.id = 'session-1';
      return of(session);
    })
  };

  @Component({
    selector: 'app-story-textarea',
    template: ``
  })
  class TestingStoryTextareaComponent {

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [AddStoryListComponent, TestingStoryTextareaComponent],
      providers: [
        {provide: SessionRepoService, useValue: sessionRepoService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStoryListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => sessionRepoService.add.calls.reset());

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should validate session name', () => {
    fixture.detectChanges();
    // empty
    component.session.name = '';
    expect(component.validateSessionName()).toBe(false);

    // length exceeded (max 200)
    for (let i = 0; i < 201; i++) {
      component.session.name += 'a';
    }
    expect(component.validateSessionName()).toBe(false);

    // valid
    component.session.name = 'lorem ipsum dolor';
    expect(component.validateSessionName()).toBe(true);
  });

  it('should validate number of voters value', () => {
    fixture.detectChanges();
    // not set
    expect(component.validateNumberOfVoters()).toBe(false);
    component.session.numberOfVoters = 0;

    // 0
    expect(component.validateNumberOfVoters()).toBe(false);

    // valid
    component.session.numberOfVoters = 5;
    expect(component.validateNumberOfVoters()).toBe(true);
  });

  it('should create the session', () => {
    spyOn(component, 'validateNumberOfVoters').and.callThrough();
    spyOn(component, 'validateSessionName').and.callThrough();

    fixture.detectChanges();
    component.session.name = 'Lorem ipsum dolor';
    component.session.numberOfVoters = 5;
    component.startSession();
    expect(component.validateSessionName).toHaveBeenCalled();
    expect(component.validateNumberOfVoters).toHaveBeenCalled();
    expect(sessionRepoService.add).toHaveBeenCalledWith(component.session);
  });

  it('should not create the session when values are not valid', () => {
    fixture.detectChanges();
    // by default, values are not set
    component.startSession();
    expect(component.validateSessionName()).toBe(false);
    expect(component.validateNumberOfVoters()).toBe(false);
    expect(sessionRepoService.add).not.toHaveBeenCalled();
  });
});
