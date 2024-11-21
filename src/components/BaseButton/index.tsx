/**
 * BaseButton component.
 *
 * @param {string} [className] - The className to add your custom style.
 * @param {string} [label] - The label of the input.
 * @param {any} [icon] - The value of the icon field. Use @tabler/icons-react component
 * @param {string} [size] - 'sm', 'md or 'lg'
 * @param {string} [iconPlacement] - 'before' or 'after'
 * @param {Function} [onClick] - Callback for onClick event.
 * @param {boolean} [disabled] - Whether the input is disabled.
 */
export interface BaseButtonProps {
  label: string;
  icon?: string;
  iconPlacement?: string;
  size?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
export default function BaseButton({
  label = '',
  icon = '',
  iconPlacement = 'before',
  size = 'sm',
  onClick = () => null,
  className = '',
  disabled = false,
}: BaseButtonProps) {
  const sizeClass =
    {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
    }[size] || 'text-sm';

  return (
    <button
      className={`${sizeClass} disabled:text-tertiary disabled:bg-fill-tertiary cursor-pointer rounded-xl p-4 font-semibold disabled:cursor-not-allowed ${className}`}
      type="button"
      role="button"
      disabled={disabled}
      onClick={onClick}
    >
      {iconPlacement === 'before' && icon && <span>{icon}</span>}
      {label}
      {iconPlacement === 'after' && icon && <span>{icon}</span>}
    </button>
  );
}
