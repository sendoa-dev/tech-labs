export type ButtonCategory = 'primary' | 'secondary' | 'yellow' | 'danger' | 'white' | 'transparent'
export type ButtonSize = 'full' | 'md' | 'fit' | 'slim'

export type ButtonOutline = true | false
export type ButtonDisabled = true | false
export type ButtonLoading = true | false
export type ButtonIcon = true | false
export type ButtonIconPosition = 'left' | 'right'

export interface BaseButtonProps {
  category?: ButtonCategory
  size?: ButtonSize
  outline?: ButtonOutline
  disabled?: ButtonDisabled
  loading?: ButtonLoading
  icon?: ButtonIcon
  iconPosition?: ButtonIconPosition
}
