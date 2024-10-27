import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid"
import type { YouTubeEvent } from "react-youtube"
import { Button } from "./button"

type Props = {
  ytPlayer: YouTubeEvent | null
}
export const YtController = ({ ytPlayer }: Props) => {
  const skip = (seconds: number) => {
    if (!ytPlayer) {
      return
    }
    const currentTime = ytPlayer.target.getCurrentTime()
    ytPlayer.target.seekTo(currentTime + seconds, true)
  }
  return (
    <div className={`flex items-center gap-2 ${ytPlayer ? "" : "pointer-events-none opacity-50"}`}>
      <Button buttonRole="neutral" onClick={() => { skip(-60) }}><ChevronDoubleLeftIcon className="size-6" />1分戻る</Button>
      <Button buttonRole="neutral" onClick={() => { skip(-10) }}><ChevronLeftIcon className="size-6" />10秒戻る</Button>
      <Button buttonRole="neutral" onClick={() => { skip(10) }}><ChevronRightIcon className="size-6" />10秒進む</Button>
      <Button buttonRole="neutral" onClick={() => { skip(60) }}><ChevronDoubleRightIcon className="size-6" />1分進む</Button>
    </div>
  )
}