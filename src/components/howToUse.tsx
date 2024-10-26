import { useModal } from "../contexts/modal"
import { Button } from "./button"

export const HowToUse = () => {
  const { closeModal } = useModal()
  return (
    <>
      <h2 className="text-lg font-bold">概要</h2>
      <p>YouTubeの動画や配信アーカイブのタイムスタンプ作成補助ツールです。</p>
      <div className="flex flex-col gap-4 pb-2">
        <h2 className="mt-4 text-lg font-bold">使い方</h2>
        <div>
          <p>1. YouTubeの動画や配信アーカイブのURLを入力してください。</p>
          <img className="" src="images/how_1.png" alt="URLを入力" />
        </div>
        <div>
          <p>2. 動画が表示されたら、タイムスタンプを追加したい箇所まで再生するか、シークバーを移動し、タイムスタンプタイトルを入力し、「タイムスタンプを追加」ボタンを押してください。</p>
          <img className="" src="images/how_2.png" alt="タイムスタンプを追加" />
        </div>
        <div>
          <p>4. タイムスタンプが追加されるので、必要に応じて編集してください。</p>
          <p>5. タイムスタンプ一覧をコピーし、YouTubeの動画の説明欄やコメントに貼り付けてください。</p>
          <img className="" src="images/how_3.png" alt="タイムスタンプ一覧" />
        </div>
        <div>
          <p>こんな感じのテキストがコピーされます</p>
          <pre className="p-2 border border-neutral-200 w-min rounded-md text-sm">
            {`00:00 サンプル１
01:07 サンプル２
02:12 サンプル３
03:51 サンプル４`}
          </pre>
        </div>

        <div className="pt-8 text-neutral-600 font-sm">
          <p>もしよければ寄付をお願いします</p>
          <a href='https://ko-fi.com/Q5Q6UMMVT'
            className="ml-auto"
            target='_blank'
            rel="noreferrer">
            <img className="border-0 h-9" src='https://storage.ko-fi.com/cdn/kofi3.png?v=6' alt='Buy Me a Coffee at ko-fi.com' />
          </a>
        </div>
        <Button buttonRole="secondary" onClick={closeModal}>閉じる</Button>
      </div>

    </>
  )
}