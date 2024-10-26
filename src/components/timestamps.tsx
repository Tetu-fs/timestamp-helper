"use client"

import { PlayIcon, TrashIcon } from "@heroicons/react/16/solid"
import { useCallback, useMemo } from "react"
import type { YouTubeEvent } from "react-youtube"
import { type TimeStampData, getFormattedTime, getSeconds, sortByTime } from "../lib/util"
import { Button } from "./button"
import { InputText } from "./input"

type TimeStampProps = {
  timeStamp: TimeStampData
  setTimestamp: (input: { newTime: string, data: TimeStampData }) => void
  setTitle: (data: TimeStampData) => void
  onDelete: (time: string) => void
  jumpToTime: (time: string) => void
}

enum TimeType {
  HOUR = "hour",
  MINUTE = "minute",
  SECOND = "second"
}

const TimeInputs = ({ timeStamp, setTimestamp, setTitle, onDelete, jumpToTime }: TimeStampProps) => {
  const splitted = timeStamp.time.split(":")
  const [hour, minute, second] = useMemo(() => {
    if (splitted.length === 3) {
      return splitted
    }
    return ["00", ...splitted]
  }, [splitted])

  const updateTime = (time: string, type: TimeType) => {
    let result = timeStamp.time
    switch (type) {
      case TimeType.HOUR:
        result = `${time}:${minute}:${second}`
        break
      case TimeType.MINUTE:
        result = `${hour}:${time}:${second}`
        break
      case TimeType.SECOND:
        result = `${hour}:${minute}:${time}`
        break
      default:
        result = timeStamp.time
        break
    }
    const seconds = getSeconds(result)
    if (seconds === null) {
      return
    }
    const formatted = getFormattedTime(seconds)
    setTimestamp({ newTime: formatted, data: timeStamp })
  }

  return (
    <>
      <InputText
        className="max-w-12"
        defaultValue={hour}
        onBlur={(e) => updateTime(e.target.value, TimeType.HOUR)}
      />:
      <InputText
        className="max-w-12"
        defaultValue={minute}
        onBlur={(e) => updateTime(e.target.value, TimeType.MINUTE)}
      />:
      <InputText
        className="max-w-12"
        defaultValue={second}
        onBlur={(e) => updateTime(e.target.value, TimeType.SECOND)}
      />
    </>
  )
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
      <div className="inline-flex items-center gap-2 flex-0">
        <TimeInputs timeStamp={timeStamp} setTimestamp={setTimestamp} setTitle={setTitle} onDelete={onDelete} jumpToTime={jumpToTime} />
        <Button onClick={() => jumpToTime(timeStamp.time)}><PlayIcon className="size-6" /></Button>
      </div>
      <div className="inline-flex items-center flex-1 w-full justify-between gap-2">
        <InputText className="w-full flex-1"
          type="text" placeholder="タイムスタンプタイトル" defaultValue={timeStamp.title} onChange={onChangeTitle} />
        <div className="flex-none">
          <Button buttonRole="danger" onClick={onClick}><TrashIcon className="size-6" /></Button>
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
          console.log(t)
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

  console.log("timestamps", timestamps)

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