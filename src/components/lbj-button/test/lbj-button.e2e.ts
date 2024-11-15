import { newE2EPage } from '@stencil/core/testing';

describe('lbj-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<lbj-button></lbj-button>');

    const element = await page.find('lbj-button');
    expect(element).toHaveClass('hydrated');
  });
});
