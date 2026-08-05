import type { SelectOption } from '@/types/portfolio';

/** Every value an admin form field can hold. */
export type FieldValue = string | number | boolean | null;

export type FormValues = Record<string, FieldValue>;

/**
 * A field is described once and then rendered, validated and submitted by the
 * shared kit — so eight CRUD screens share one implementation (RULES §3-DRY).
 */
export type FieldDescriptor =
    | {
          name: string;
          label: string;
          type: 'text' | 'textarea' | 'number';
          placeholder?: string;
          help?: string;
          rows?: number;
      }
    | {
          name: string;
          label: string;
          type: 'select';
          options: readonly SelectOption[];
          help?: string;
      }
    | {
          name: string;
          label: string;
          type: 'toggle';
          help?: string;
      };
