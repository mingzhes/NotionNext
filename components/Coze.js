import { useEffect } from 'react'

/**
 * Coze-AI机器人（新版嵌入）
 * @returns
 */
export default function Coze() {
  const cozeSrc = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/cn/index.js'

  const loadExternalResource = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
      document.head.appendChild(script)
    })
  }

  const loadCoze = async () => {
    await loadExternalResource(cozeSrc)
    const CozeWebSDK = window?.CozeWebSDK
    if (CozeWebSDK) {
      new CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7481240586977476659'
        },
        componentProps: {
          title: 'Coze'
        },
        auth: {
          type: 'token',
          token: 'pat_OOGD3gnH7qEJGR5JBA1SkIsyEY0D67c9zoMqa0rhIJNrbp8f36JuaNri5ZVsFbn0',
          onRefreshToken: () => {
            return 'pat_OOGD3gnH7qEJGR5JBA1SkIsyEY0D67c9zoMqa0rhIJNrbp8f36JuaNri5ZVsFbn0'
          }
        }
      })
    }
  }

  useEffect(() => {
    loadCoze()
  }, [])

  return <></>
}
