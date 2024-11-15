/**
 * Merge into argTypes in stories for a repeatable slot content type
 * This is for a control to dump in arbitrary strings which are NOT properties
 * of a component.
 */
export const argTypeSlotContent = {
  defaultSlot: {
    name: 'Default Slot',
    description: 'The default slot; show everything that is passed into the inner HTML of the given element. It is not an attribute of the component.',
  },
};

export const argTypeInputPlaceholder = {
  defaultValue: {
    name: 'Placeholder Value',
    description: 'Default value for input elements.',
  },
};

export const argTypeImageUrl = {
  name: 'Image URL',
  description: 'The image URL to use for this demo.',
  control: {
    type: 'text',
  },
};
