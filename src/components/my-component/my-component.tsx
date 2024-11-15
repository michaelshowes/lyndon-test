import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {


  render() {
    return <div class={'text-red-500 font-bold underline'}>
      <h1 class=''>Sample Header</h1>
    </div>;
  }
}
