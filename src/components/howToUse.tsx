import { useModal } from "../contexts/modal"
import { Button } from "./button"

export const HowToUse = () => {
  const { closeModal } = useModal()
  return (
    <div className="flex flex-col gap-2 pt-2">
      <p>表示及び使い勝手の都合上、パソコン＋横長画面での使用を推奨します。</p>
      <div className="border border-neutral-200 rounded-md p-2">
        <img className="" src="images/howto_base.jpg" alt="使い方" />
      </div>
      <div>
        <p>こんな感じのテキストがコピーされます</p>
        <pre className="p-2 border border-neutral-200 w-min rounded-md text-sm">
          {`00:00 サンプル１
01:07 サンプル２
02:12 サンプル３
03:51 サンプル４
1:32:05 サンプル５`}
        </pre>
      </div>
      <Button buttonRole="secondary" onClick={closeModal}>閉じる</Button>
    </div>
  )
}