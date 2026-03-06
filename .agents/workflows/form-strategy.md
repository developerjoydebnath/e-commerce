---
description: Standard Form Development Strategy
---

# Form Development Strategy Pattern

This document outlines the standard pattern for implementing forms in this project. Follow these steps to ensure consistency, type safety, and maintainability.

## 1. Define the Zod Schema (DTO)

Create or update the DTO file in the module's `dto` directory.

**File**: `src/modules/[module]/dto/[feature].dto.ts`

```typescript
import z from 'zod';

export const featureSchema = z.object({
  fieldName: z.string().min(1, 'Error message'),
  // ... other fields
});
```

## 2. Infer Types

Define and export types inferred from the schema.

**File**: `src/modules/[module]/type/[feature].type.ts`

```typescript
import z from 'zod';
import { featureSchema } from '../dto/[feature].dto';

export type FeatureDto = z.infer<typeof featureSchema>;
```

## 3. Centralize Form Fields

Define the UI properties for each field (label, placeholder, type, etc.) in a constants file. Use `InputFieldProps` for type safety.

**File**: `src/modules/[module]/constant/formFields.ts`

```typescript
import { InputFieldProps } from '@/shared/components/form/InputField';

export const FEATURE_FORM_FIELDS: Record<string, InputFieldProps[]> = {
  SECTION_NAME: [
    {
      name: 'fieldName',
      label: 'Field Label',
      type: 'text', // 'text', 'password', 'select', 'date', etc.
      required: true,
      placeholder: 'Enter something...',
    },
  ],
};
```

## 4. Implement the Form Component

Use `react-hook-form` with `zodResolver` and the `InputField` component.

**File**: `src/modules/[module]/components/FeatureForm.tsx`

```tsx
'use client';

import InputField from '@/shared/components/form/InputField';
import { Button } from '@/shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FEATURE_FORM_FIELDS } from '../constant/formFields';
import { featureSchema } from '../dto/[feature].dto';
import { FeatureDto } from '../type/[feature].type';

export default function FeatureForm() {
  const form = useForm<FeatureDto>({
    resolver: zodResolver(featureSchema),
    defaultValues: {
      /* ... */
    },
  });

  const onSubmit = (data: FeatureDto) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {FEATURE_FORM_FIELDS.SECTION_NAME.map((field) => (
        <InputField key={field.name} {...field} control={form.control} />
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## 5. Generic InputField (Shared)

The `src/shared/components/form/InputField.tsx` component handles the mapping between `type` and UI components (Input, PasswordInput, DatePicker, Select) using `ts-pattern`. Always update this shared component if a new input type is needed.
