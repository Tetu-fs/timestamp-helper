import type { HTMLInputTypeAttribute } from "react"
type Props = {
  type?: HTMLInputTypeAttribute,
  className?: string,
  placeholder?: string,
  pattern?: string,
  defaultValue?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}
export const InputText = ({ className = "", defaultValue, pattern, placeholder, type, onBlur, onChange }: Props) => {
  return (
    <input
      className={` bg-neutral-50 box-border border-2 border-neutral-200 text-neutral-900 rounded-md  text-sm px-2 py-1 sm:text-md sm:px-3 ${className} outline-none focus:border-neutral-500`}
      type={type} placeholder={placeholder}
      pattern={pattern}
      onChange={onChange}
      onBlur={onBlur}
      defaultValue={defaultValue}
    />
  )
}