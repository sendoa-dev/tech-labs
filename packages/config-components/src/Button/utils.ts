import type { BaseButtonProps } from './types'

export const resolveButtonClasses = ({
  category,
  size,
  outline,
  disabled,
  loading,
  icon,
  iconPosition,
}: Required<BaseButtonProps>) => {
  return {
    [`core-button--${category}`]: true,
    [`core-button--${size}`]: true,
    'core-button--outline': outline,
    'core-button--disabled': disabled,
    'core-button--loading': loading,
    'core-button--icon': icon,
    [`core-button--icon-position--${iconPosition}`]: !!icon,
  }
}
