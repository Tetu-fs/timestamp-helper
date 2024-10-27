import { useMemo } from "react"

type Props = {
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
  buttonRole?: "primary" | "secondary" | "danger" | "neutral"
  disabled?: boolean
  onClick?: () => void
}
export const Button = ({ children, type = "button", buttonRole = "primary", disabled, onClick }: Props) => {
  const color = useMemo(() => {
    switch (buttonRole) {
      case "primary":
        return "bg-sky-600 text-neutral-50"
      case "secondary":
        return "bg-teal-600 text-neutral-50"
      case "danger":
        return "bg-red-600 text-neutral-50"
      case "neutral":
        return "border border-sky-600 text-neutral-900"
    }
  }, [buttonRole])

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${color} select-none shadow-sm font-bold flex items-center justify-center leading-normal gap-1 px-2 py-2 rounded-md hover:opacity-70 transition-colors`} onClick={onClick}>
      {children}
    </button>
  )
}