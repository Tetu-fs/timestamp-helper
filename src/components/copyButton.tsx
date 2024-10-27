import { useState } from "react"
import { Button } from "./button"

type Props = {
  label?: string
  copyText: string
}

export const CopyButton = ({ label = "コピー", copyText }: Props) => {
  const [copied, setCopied] = useState(false)
  const [timeoutId, setTimeoutId] = useState<number | null>(null)
  const copy = () => {
    navigator.clipboard.writeText(copyText)
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setCopied(true)

    setTimeoutId(setTimeout(() => {
      setCopied(false)
    }, 1000))
  }
  return (
    <Button buttonRole="secondary" onClick={copy}>
      {copied ? 'コピーしました' : label}
    </Button>
  )
}