import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import { type VariantProps, cva } from 'class-variance-authority';

import { IconName, Size } from '../../utils/enums';
import { getAttributes } from '../../utils/get-attributes';
import { cn } from '../../utils/utils';
import { ButtonVariant } from './lbj-button-types';

const button = cva(
  'inline-flex text-center whitespace-nowrap align-middle font-sans text-lg leading-tight font-bold uppercase no-underline justify-center transition-all duration-200 ease-in-out',
  {
    variants: {
      variant: {
        primary: ['bg-primary-a-500 text-white', 'hover:bg-primary-a-700'],
        secondary: [
          'bg-white text-primary-a-500 border border-primary-a-500',
          'hover:bg-primary-a-500 hover:text-white'
        ],
        'primary-blue': ['bg-blue-500 text-white', 'hover:bg-blue-700'],
        'primary-blue-dark': ['bg-primary-a-800 text-white'],
        'secondary-blue': [
          'bg-white text-blue-500 border border-blue-500',
          'hover:bg-blue-500 hover:text-white'
        ],
        'primary-dark': [
          'bg-black text-white border-black',
          'hover:border-black hover:bg-transparent hover:text-black border'
        ],
        'secondary-dark': [
          'border-black bg-transparent text-black border',
          'hover:bg-black hover:text-white'
        ],
        dropdown: ['bottom-[10px] table-cell relative align-bottom'],
        'secondary-transparent': [
          'bg-white text-primary-a-500 border border-primary-a-500',
          'hover:bg-primary-a-500 text-white'
        ],
        'secondary-no-border': [
          'bg-white text-primary-a-500 border border-primary-a-500'
        ],
        'nav-link': [
          'p-0 py-6 normal-case text-base transition-all duration-200 ease-in-out relative cursor-pointer',
          'after:absolute after:content-none after:w-full after:h-0 after:bg-primary-a-500 after:bottom-0 after:left-0 after:transition-all after:duration-200 after:ease-in-out'
        ],
        'mobile-nav-link': [
          'p-0 pb-4 normal-case text-xl transition-all duration-300 ease-in-out cursor-pointer w-full relative flex justify-between',
          'after:absolute after:content-none after:left-0 after:w-0 after:h-1 after:bg-primary-a-500 after:transition-all after:duration-300 after:ease-in-out after:-bottom-1',
          'hover:after:w-full'
        ],
        white: [
          'bg-transparent text-white border border-white',
          'hover:bg-primary-a-500 hover:text-white'
        ],
        'white-dark': [
          'bg-transparent text-white border border-white',
          'hover:border-black hover:bg-transparent hover:text-black hover:border'
        ],
        tertiary: ['bg-secondary-b-500 text-black', 'bg-black text-white']
      },
      size: {
        sm: ['py-2 px-3'],
        md: ['py-3 px-4'],
        lg: ['py-4 px-6'],
        xl: ['py-5 px-6'],
        xxl: ['py-5 px-20 lg:px-4']
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

@Component({
  tag: 'lbj-button',
  styleUrl: 'lbj-button.css',
  shadow: true
})
export class LbjButton {
  @State() button = button;
  // ---------------------------------------------------------------------------
  // Element
  // ---------------------------------------------------------------------------

  @Element() el: HTMLLbjButtonElement;

  // ---------------------------------------------------------------------------
  // Properties
  // ---------------------------------------------------------------------------

  /**
   * The button styling to display.
   */
  @Prop({ reflect: true }) variant: ButtonVariant;

  /**
   * The internal padding size. sm|md|lg|xl|xxl
   */
  @Prop() size: Size;

  /**
   * The disabled state of the button.
   */
  @Prop() disabled: boolean = false;

  /**
   * An icon to display to the right of text (optional).
   */
  @Prop() icon: IconName | undefined;

  /**
   * An icon to display to the left of text (optional).
   */
  @Prop() iconleft: IconName | undefined;

  /**
   * An icon to display to the right of text (optional).
   */
  @Prop() iconsize: Size = Size.FULL;

  /**
   * If no url, then falls back to <button> element (optional).
   */
  @Prop({ reflect: true }) href: string;
  /**
   * Determines if the button is a breakout button.
   */
  @Prop() isBreakout = false;
  /**
   * Defines target for links (optional).
   */
  @Prop() target: string;

  /**
   * Display mode when nested inside another component.
   */
  @Prop({ reflect: true }) mode: string;

  /**
   * Dropdown nav items.
   */
  @Prop() navItems: { title: string; url: string }[] = [];

  /**
   * Defines active state of button
   */
  @Prop() activeState: boolean;

  //----------------------------------------------------------------------------
  //  State
  //----------------------------------------------------------------------------

  @State() isActive = false;
  @State() dropdownVisible = false;
  @State() isSlotEmpty = true;

  //----------------------------------------------------------------------------
  //  Lifecycle
  //----------------------------------------------------------------------------

  observer: MutationObserver;

  connectedCallback() {
    this.childElType = this.href !== undefined ? 'a' : 'button';

    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.checkSlotContent();
        }
      });
    });

    this.observer.observe(this.el, { childList: true, subtree: true });
  }

  componentWillLoad() {
    this.checkSlotContent();

    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const menu = document.querySelector('.menu-links');
      if (target !== menu) {
        this.isActive = false;
      }
    });
  }

  disconnectedCallback() {
    this.observer.disconnect();
  }

  protected checkSlotContent() {
    const slot = this.el.shadowRoot.querySelector('slot');
    const nodes = this.getAssignedNodes(slot);
    const contentNotEmpty = nodes.some((node) =>
      node.nodeType === Node.TEXT_NODE ? node.textContent.trim() !== '' : true
    );
    this.isSlotEmpty = !contentNotEmpty;
  }

  // Add this method to abstract the direct call to assignedNodes
  protected getAssignedNodes(slot: HTMLSlotElement): Node[] {
    return slot ? slot.assignedNodes({ flatten: true }) : [];
  }

  render() {
    const { variant, size }: VariantProps<typeof button> = this as any;
    const props = ['variant', 'size', 'icon', 'class', 'iconleft', 'target'];
    const elementAttributes =
      this.el.attributes.length !== 0 ? Array.from(this.el.attributes) : [];
    const attributes = getAttributes(props, elementAttributes);
    const Tag = this.childElType;
    // const iconClass = 'icon--size icon--size--' + this.iconsize;

    const classes = {
      'icon-only': this.isSlotEmpty,
      'icon-left': this.iconleft != undefined && this.iconleft,
      'icon-right': this.icon != undefined && this.icon,
      'button-breakout': this.isBreakout
    };

    if (this.iconsize !== Size.FULL) {
      const iconClass = 'self-auto -mt-0.7 icon--size--' + this.iconsize;
      classes[iconClass] = true;
    }

    return (
      <Host>
        {this.href && (
          <Tag
            class={cn(button({ variant, size }), {
              'bg-gray-500 text-white pointer-events-none cursor-not-allowed':
                this.disabled
            })}
            disabled={this.disabled}
            {...attributes}
            href={this.href}
            target={this.target}
            data-active={this.isActive}
          >
            {/* {this.iconleft && (
              <lbj-icon
                class='button__icon__left'
                name={this.iconleft}
                size={this.iconsize}
              ></lbj-icon>
            )} */}
            <span class={this.isBreakout ? '' : 'mx-auto'}>
              <slot></slot>
            </span>
            {/* {this.icon && (
              <lbj-icon
                class='button__icon'
                name={this.icon}
                size={this.iconsize}
              ></lbj-icon>
            )} */}
          </Tag>
        )}
        {(this.href == null || this.href == '') && (
          <Tag
            class={cn(button({ variant, size }), {
              'bg-gray-500 text-white pointer-events-none cursor-not-allowed':
                this.disabled
            })}
            disabled={this.disabled}
            {...attributes}
            onClick={() => this.handleButtonClick()}
            data-active={this.isActive}
          >
            {/* {this.iconleft && (
              <lbj-icon
                class='button__icon__left'
                name={this.iconleft}
                size={this.iconsize}
              ></lbj-icon>
            )} */}
            <span class={this.isBreakout ? '' : 'mx-auto'}>
              <slot></slot>
            </span>
            {/* {this.icon && (
              <lbj-icon
                class='button__icon'
                name={this.icon}
                size={this.iconsize}
              ></lbj-icon>
            )} */}
            {this.variant === 'dropdown' && this.dropdownVisible && (
              <ul class='bg-white text-primary-a-500 border border-primary-a-500 absolute !overflow-visible text-left top-full left-0 w-full z-[9]'>
                <slot name='nav-items'>
                  {this.navItems.map((item) => (
                    <li class='py-1 px-4'>
                      <a
                        href={item.url}
                        class='block decoration-[none]'
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </slot>
              </ul>
            )}
          </Tag>
        )}
      </Host>
    );
  }

  /**
   * The node type of the rendered child element
   */
  private childElType?: 'a' | 'button' = 'button';

  /**
   * Custom Click Handler
   */
  handleButtonClick() {
    if (this.variant === 'dropdown') {
      this.dropdownVisible = !this.dropdownVisible;
    }
  }
}
