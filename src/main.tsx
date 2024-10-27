import { PlusIcon } from "@heroicons/react/16/solid"
import { useCallback, useEffect, useMemo, useState } from "react"
import YouTube, { type YouTubeEvent } from "react-youtube"
import { Button } from "./components/button"
import { CopyButton } from "./components/copyButton"
import { GenericModal } from "./components/genericModal"
import { HowToUse } from "./components/howToUse"
import { InputText } from "./components/input"
import { Timestamps } from "./components/timestamps"
import { YtController } from "./components/ytController"
import { useModal } from "./contexts/modal"
import { type TimeStampData, decompressTimestampData, generateShareUrl, getFormattedTime, getYoutubeId, sortByTime } from "./lib/util"

const Main = () => {
  const [ytPlayer, setYtPlayer] = useState<YouTubeEvent | null>(null)
  const [youtubeId, setYoutubeId] = useState<string | null>(null)
  const [timestamps, setTimestamps] = useState<TimeStampData[]>([])
  const [shareUrl, setShareUrl] = useState("")
  const [newTitle, setNewTitle] = useState("")

  useEffect(() => {
    const set = async () => {
      const convertedURLParam = new URLSearchParams(window.location.search).get("d")
      if (convertedURLParam) {
        const { id, timestamps } = await decompressTimestampData(convertedURLParam)
        setYoutubeId(id)
        setTimestamps(timestamps)
      }
    }
    set()

  }, [])

  const onChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    const youtubeId = getYoutubeId(url)
    setYoutubeId(youtubeId)
  }

  const addTimeStamp = useCallback(() => {
    if (ytPlayer) {
      const currentTime = Math.floor(ytPlayer.target.getCurrentTime())
      const formatted = getFormattedTime(currentTime)
      setTimestamps(old => {
        if (old.length === 0 || !old.find(t => t.time === formatted)) {
          return [...old, {
            time: formatted,
            title: newTitle
          }].sort(sortByTime)
        }
        return old
      })

      setNewTitle("")
    }
  }, [newTitle, ytPlayer])

  const timestampText = useMemo(() => {
    return timestamps.map(t => `${t.time} ${t.title}`).join("\n")
  }, [timestamps])

  const { openModal } = useModal()
  const clickOpenModal = () => {
    openModal({
      title: "使い方",
      content: <HowToUse />
    })
  }

  useEffect(() => {
    const set = async () => {
      const url = await generateShareUrl({ youtubeId, timestamps })
      setShareUrl(url)
    }
    set()
  }, [youtubeId, timestamps])

  return (
    <>
      <header className="fixed top-0 z-10 w-full flex items-center px-2 bg-neutral-100 shadow-md sm:px-4">
        <div className="container inline-flex items-center justify-between w-full mx-auto py-2 px-4">
          <h1 className="text-xl font-bold text-neutral-900 sm:text-3xl">YouTubeタイムスタンプ作成君</h1>
          {/* <Button buttonRole="secondary" onClick={setDemoData}>デモデータをセット</Button> */}
          <Button buttonRole="neutral" onClick={clickOpenModal}>使い方</Button>
        </div>
      </header>
      <main className="container max-h-screen pt-12 overflow-auto flex flex-col gap-4 px-4 bg-neutral-50 mx-auto sm:flex-row sm:overflow-hidden">
        <section className="w-full pt-4 pb-10 inline-flex flex-col gap-2 ">
          <InputText
            className="w-full h-10 border-neutral-600"
            type="text"
            placeholder="Youtubeの動画URL"
            pattern="^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$"
            onChange={onChangeUrl}
          />
          <div
            className="inline-flex items-center justify-center bg-neutral-950 text-neutral-100 aspect-video"
          >
            {youtubeId ? (
              <YouTube
                className="w-full h-full"
                iframeClassName="w-full h-full"
                videoId={youtubeId}
                onReady={(event: YouTubeEvent) => {
                  setYtPlayer(event)
                }}
              />
            ) : (<p>Youtubeの動画URLを入力してください</p>)}
          </div>
          <YtController ytPlayer={ytPlayer} />
          <div className="inline-flex flex-col gap-4 w-full mx-auto">
            <div className="inline-flex items-center gap-4 w-full mx-auto">
              <InputText
                className="w-full"
                type="text"
                placeholder="タイムスタンプタイトル"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <div className="flex-none">
                <Button onClick={addTimeStamp}><PlusIcon className="size-6" />タイムスタンプを追加</Button>
              </div>
            </div>
            <CopyButton label="タイムスタンプ一覧をコピー" copyText={timestampText} />
            <CopyButton label="共有URLをコピー" copyText={shareUrl} />
            <a href='https://ko-fi.com/Q5Q6UMMVT'
              className="ml-auto"
              target='_blank'
              rel="noreferrer">
              <img className="border-0 h-9" src='https://storage.ko-fi.com/cdn/kofi3.png?v=6' alt='Buy Me a Coffee at ko-fi.com' />
            </a>
          </div>


        </section>
        <section className="max-w-lg w-full flex-none h-screen pb-10 sm:overflow-y-auto">
          <h3 className="text-md font-bold h-14 text-neutral-900 w-full bg-neutral-50 flex items-center pt-4 sticky top-0">タイムスタンプ</h3>
          <div className="pt-2 pb-6">
            <Timestamps ytPlayer={ytPlayer} timestamps={timestamps} setTimestamps={setTimestamps} />
          </div>
        </section>
      </main>

      <GenericModal />
    </>

  )
}

export default Main
