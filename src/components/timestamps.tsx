"use client"

import { useCallback } from "react"
import type { YouTubeEvent } from "react-youtube"
import { type TimeStampData, getSeconds, sortByTime } from "../lib/util"
import { Button } from "./button"
import { InputText } from "./input"

type TimeStampProps = {
  timeStamp: TimeStampData
  setTimestamp: (input: { newTime: string, data: TimeStampData }) => void
  setTitle: (data: TimeStampData) => void
  onDelete: (time: string) => void
  jumpToTime: (time: string) => void
}

const TimeStamp = ({ timeStamp, setTimestamp, setTitle, onDelete, jumpToTime }: TimeStampProps) => {

  const onClick = useCallback(() => {
    onDelete(timeStamp.time)
  }, [timeStamp.time, onDelete])

  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle({ time: timeStamp.time, title: e.target.value })
  }, [timeStamp.time, setTitle])

  return (
    <div className="flex items-center flex-wrap gap-2 overflow-hidden">
      <div className="flex-0">
        <InputText
          className="max-w-24 mr-2"
          defaultValue={timeStamp.time}
          pattern="([0-5]?[0-9]:[0-5]?[0-9]:[0-5]?[0-9])|([0-5]?[0-9]:[0-5]?[0-9])"
          onBlur={(e) => setTimestamp({ newTime: e.target.value, data: timeStamp })}
        />
        <Button onClick={() => jumpToTime(timeStamp.time)}>ジャンプ</Button>
      </div>
      <div className="inline-flex flex-1 w-full justify-between gap-2">
        <InputText className="w-full flex-1"
          type="text" placeholder="タイムスタンプタイトル" defaultValue={timeStamp.title} onChange={onChangeTitle} />
        <div className="flex-none">
          <Button buttonRole="danger" onClick={onClick}>削除</Button>
        </div>
      </div>
    </div>
  )
}

type Props = {
  ytPlayer: YouTubeEvent | null
  timestamps: TimeStampData[]
  setTimestamps: React.Dispatch<React.SetStateAction<TimeStampData[]>>
}
export const Timestamps = ({ ytPlayer, timestamps, setTimestamps }: Props) => {

  const removeTimeStamp = useCallback((time: string) => {
    setTimestamps(old => old.filter(t => t.time !== time))
  }, [setTimestamps])

  const setTimestamp = useCallback((input: { newTime: string, data: TimeStampData }) => {
    setTimestamps(old => {
      return old.map(t => {
        if (t.time === input.data.time) {
          return { time: input.newTime, title: t.title }
        }
        return t
      }).sort(sortByTime)
    })
  }, [setTimestamps])

  const jumpToTime = useCallback((time: string) => {
    if (ytPlayer) {

      const sec = getSeconds(time)
      if (sec === null) {
        return
      }
      ytPlayer.target.seekTo(sec, true)
    }
  }, [ytPlayer])

  const setTimestampTitle = useCallback((data: TimeStampData) => {
    setTimestamps(old => {
      return old.map(t => {
        if (t.time === data.time) {
          return data
        }
        return t
      })
    })
  }, [setTimestamps])

  if (!ytPlayer) {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      {timestamps.map((timeStamp) => (
        <TimeStamp
          key={timeStamp.time}
          timeStamp={timeStamp}
          onDelete={removeTimeStamp}
          setTitle={setTimestampTitle}
          setTimestamp={setTimestamp}
          jumpToTime={jumpToTime} />
      ))}
    </div>
  )
}