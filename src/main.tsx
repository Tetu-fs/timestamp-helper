import { useCallback, useState } from "react"
import YouTube, { type YouTubeEvent } from "react-youtube"
import { Button } from "./components/button"
import { InputText } from "./components/input"
import { Timestamps } from "./components/timestamps"
import { type TimeStampData, getFormattedTime, getYoutubeId, sortByTime } from "./lib/util"

const DEMO_DATA = {
  youtubeId: "5_HEzFkD_EE",
  timestamps: [
    { time: "07:16", title: "げのげ feat.ロス" },
    { time: "15:00", title: "カワキヲアメク" },
    { time: "20:50", title: "ただ声一つ" },
    { time: "24:13", title: "キャットラビング" },
    { time: "26:59", title: "マーシャル・マキシマイザー feat.可不(KAFU)" },
    { time: "30:42", title: "イガク" },
    { time: "33:58", title: "晴る" },
    { time: "39:34", title: "快晴" },
    { time: "44:56", title: "ロウワー" },
    { time: "49:59", title: "愛して愛して愛して" },
    { time: "54:46", title: "ERROR" },
    { time: "59:35", title: "ひとりごつ" },
    { time: "1:01:27", title: "告知1" },
    { time: "1:02:07", title: "告知2" },
  ]
}

const Main = () => {
  const [ytPlayer, setYtPlayer] = useState<YouTubeEvent | null>(null)
  const [youtubeId, setYoutubeId] = useState<string | null>(null)
  const [timestamps, setTimestamps] = useState<TimeStampData[]>([])

  const [newTitle, setNewTitle] = useState("")

  const setDemoData = () => {
    setYoutubeId(DEMO_DATA.youtubeId)
    setTimestamps(DEMO_DATA.timestamps)
  }
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

  const copyToClipboard = useCallback(() => {
    const joined = timestamps.map(t => `${t.time} ${t.title}`).join("\n")
    navigator.clipboard.writeText(joined)
  }, [timestamps])

  return (
    <>
      <header className="fixed top-0 z-10 w-full flex items-center px-2 bg-neutral-100 shadow-md sm:px-4">
        <div className="container inline-flex items-center justify-between w-full mx-auto py-2 px-4">
          <h1 className="text-xl font-bold text-neutral-900 sm:text-3xl">YouTubeタイムスタンプ作成君</h1>
          <Button buttonRole="secondary" onClick={setDemoData}>デモデータをセット</Button>
        </div>
      </header>
      <main className="container max-h-screen pt-12 overflow-auto flex flex-col gap-4 px-4 bg-neutral-50 mx-auto sm:flex-row sm:overflow-hidden">
        <section className="w-full pt-4 pb-10 inline-flex flex-col gap-2 resize-x">
          <InputText
            className="w-full"
            type="text"
            placeholder="Youtubeの動画URL"
            pattern="^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$"
            onChange={onChangeUrl}
          />
          <div
            className="inline-flex items-center justify-center rounded-md bg-neutral-950 text-neutral-100 overflow-hidden aspect-video"
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
            ) : (<p>URLを入力してください</p>)}
          </div>
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
                <Button onClick={addTimeStamp}>タイムスタンプを追加</Button>
              </div>
            </div>

            <Button buttonRole="secondary" onClick={copyToClipboard}>タイムスタンプ一覧をコピー</Button>
            <a href='https://ko-fi.com/Q5Q6UMMVT'
              className="ml-auto"
              target='_blank'
              rel="noreferrer">
              <img className="border-0 h-9" src='https://storage.ko-fi.com/cdn/kofi3.png?v=6' alt='Buy Me a Coffee at ko-fi.com' />
            </a>
          </div>


        </section>
        <section className="max-w-md w-full flex-none h-screen pt-4 pb-10 sm:overflow-y-auto">
          <h3 className="text-md font-bold text-neutral-900 w-full bg-neutral-50 pt-2 pb-4 sticky top-0">タイムスタンプ</h3>
          <Timestamps ytPlayer={ytPlayer} timestamps={timestamps} setTimestamps={setTimestamps} />
        </section>
      </main>
    </>

  )
}

export default Main
