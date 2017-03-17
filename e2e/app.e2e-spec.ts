import { ChatPage } from './app.po';

describe('chat App', () => {
  let page: ChatPage;

  beforeEach(() => {
    page = new ChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
