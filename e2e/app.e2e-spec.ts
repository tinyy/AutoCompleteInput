import { AutoCompleteInputPage } from './app.po';

describe('auto-complete-input App', function() {
  let page: AutoCompleteInputPage;

  beforeEach(() => {
    page = new AutoCompleteInputPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
