import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'

/**
 * Coze-AI 聊天组件（新版SDK）
 */
export default function Coze() {
  const cozeSrc = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/cn/index.js'
  const botId = siteConfig('COZE_BOT_ID')
  const token = siteConfig('pat_MyGsMf0ZGL3Vks7K2cG01yg8joMop0KH8dk7fyLOd0UZuunNtUHlJxxXrvCN9Uo0')
  const title = siteConfig('COZE_TITLE', 'Coze')

  const loadCoze = async () => {
    await loadExternalResource(cozeSrc)
    const CozeWebSDK = window?.CozeWebSDK
    if (CozeWebSDK && botId && token) {
      new CozeWebSDK.WebChatClient({
        config: {
          bot_id: botId
        },
        componentProps: {
          title: title,
          autoRender: true // 自动渲染按钮
        },
        auth: {
          type: 'token',
          token: token,
          onRefreshToken: () => token
        }
      })
    } else {
      console.warn('Coze SDK or config not loaded properly.')
    }
  }

  useEffect(() => {
    loadCoze()
  }, [])

  return <></>
}
