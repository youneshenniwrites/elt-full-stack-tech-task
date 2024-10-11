import { findEvent, getAddEventButton } from '../support/calendar.po';

describe('Calendar page', () => {
  // Update the base url to the network url of UI being served (doesn't work with localhost)
  beforeEach(() => cy.visit('http://192.168.4.229:4200/'));

  it('should be able to add event to the calendar', () => {
    getAddEventButton().click();
    findEvent('Random event').should('be.visible');
  });

  // this doesn't work
  it.skip('should be able to drag and drop an event', () => {
    cy.get('.rbc-event').first().scrollIntoView().click().trigger('dragstart');

    cy.get('.rbc-time-slot').eq(365)
      .trigger('dragenter', { force: true})
      .trigger('dragover', { force: true })
      .trigger('drop', { force: true })
      .wait(50)
      .trigger('dragend', { force: true });
  });
});
