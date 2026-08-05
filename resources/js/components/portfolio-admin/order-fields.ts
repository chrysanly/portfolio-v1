import type { FieldDescriptor } from './field-types';

/**
 * Position + visibility appear on every collection, so they are declared once.
 */
export const orderingFields: readonly FieldDescriptor[] = [
    {
        name: 'position',
        label: 'Position',
        type: 'number',
        help: 'Lower numbers appear first.',
    },
    {
        name: 'is_visible',
        label: 'Show on the portfolio',
        type: 'toggle',
    },
];
