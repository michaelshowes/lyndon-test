import { newSpecPage } from '@stencil/core/testing';
import { LbjButton } from '../lbj-button';

describe('lbj-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LbjButton],
      html: `<lbj-button></lbj-button>`,
    });
    expect(page.root).toEqualHtml(`
      <lbj-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </lbj-button>
    `);
  });
});
