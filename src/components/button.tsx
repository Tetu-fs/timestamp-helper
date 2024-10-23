import { useMemo } from "react"

type Props = {
  children: React.ReactNode
  type?: "button" | "submit" | "reset"
  buttonRole?: "primary" | "secondary" | "danger" | "neutral"
  onClick?: () => void
}
export const Button = ({ children, type = "button", buttonRole = "primary", onClick }: Props) => {
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
    <button type={type} className={`${color} font-bold px-2 py-2 rounded-md text-xs bg- sm:text-sm sm:px-4 hover:opacity-70`} onClick={onClick}>
      {children}
    </button>
  )
}