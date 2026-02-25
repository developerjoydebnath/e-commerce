import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { Control, useController, UseControllerProps } from 'react-hook-form';
import { match } from 'ts-pattern';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import DatePicker from './DatePicker';
import PasswordInput from './PasswordInput';

export interface InputFieldProps extends UseControllerProps {
  label?: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultPreview?: string;
  defaultPreviews?: string[];
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  min?: number;
  max?: number;
  readOnly?: boolean;
  helperText?: string;
  control?: Control<any>;
  futureDaysDisabled?: boolean;
}

export default function InputField({ ...props }: InputFieldProps) {
  const { field, fieldState } = useController(props);
  return (
    <div className="flex flex-col gap-2">
      {props.label && (
        <Label
          htmlFor={field.name}
          className={cn(
            'text-sm font-medium text-zinc-700',
            fieldState.error && 'text-destructive',
            props.labelClassName
          )}
        >
          {props.label} {props.required && <span className="text-red-500">*</span>}
        </Label>
      )}

      {match(props.type)
        // password
        .with('password', () => (
          <PasswordInput
            id={field.name}
            {...field}
            className={cn('', props.inputClassName)}
            placeholder={props.placeholder}
            hasError={!!fieldState.error}
          />
        ))

        // date picker
        .with('date', () => (
          <DatePicker
            value={field.value}
            onValueChange={field.onChange}
            className={cn('', props.inputClassName)}
            futureDaysDisabled={props.futureDaysDisabled}
          />
        ))

        // select box
        .with('select', () => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id={field.name} className={cn('w-full', props.inputClassName)}>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent position="popper">
              {props.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))

        // input field
        .with('text', 'email', 'tel', 'url', 'search', 'color', 'time', () => (
          <Input
            id={field.name}
            {...field}
            className={cn(
              '',
              fieldState.error &&
                'border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive',
              props.inputClassName
            )}
          />
        ))

        // other
        .otherwise(() => null)}

      {fieldState.error && <p className="text-sm text-red-400">{fieldState.error.message}</p>}
    </div>
  );
}
