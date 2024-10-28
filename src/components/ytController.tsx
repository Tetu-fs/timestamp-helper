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
      <Button buttonRole="neutral" onClick={() => { skip(-60) }}><ChevronDoubleLeftIcon className="size-6" />1分</Button>
      <Button buttonRole="neutral" onClick={() => { skip(-10) }}><ChevronLeftIcon className="size-6" />10秒</Button>
      <Button buttonRole="neutral" onClick={() => { skip(10) }}>10秒<ChevronRightIcon className="size-6" /></Button>
      <Button buttonRole="neutral" onClick={() => { skip(60) }}>1分<ChevronDoubleRightIcon className="size-6" /></Button>
    </div>
  )
}