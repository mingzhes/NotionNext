import { useEffect, useRef } from 'react'
import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'

/**
 * Coze-AI 聊天组件，支持自动展开 ?chat=true
 */
export default function Coze() {
  const cozeSrc = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/cn/index.js'
  const botId = '7481240586977476659'
  const token = 'pat_MyGsMf0ZGL3Vks7K2cG01yg8joMop0KH8dk7fyLOd0UZuunNtUHlJxxXrvCN9Uo0'
  const title = siteConfig('COZE_TITLE', 'Coze')
  const clientRef = useRef(null)

  const loadCoze = async () => {
    await loadExternalResource(cozeSrc)

    const CozeWebSDK = window?.CozeWebSDK
    if (CozeWebSDK && botId && token) {
      const client = new CozeWebSDK.WebChatClient({
        config: { bot_id: botId },
        componentProps: {
          title,
          autoRender: true
        },
        auth: {
          type: 'token',
          token,
          onRefreshToken: () => token
        }
      })

      clientRef.current = client

      // ✅ 自动展开聊天窗口（实例方法：.show()）
      if (typeof window !== 'undefined' && window.location.search.includes('chat=true')) {
        setTimeout(() => {
          try {
            client.show()
          } catch (e) {
            console.warn('Coze client.show() 调用失败', e)
          }
        }, 500)
      }

    } else {
      console.warn('Coze SDK or config not loaded properly.')
    }
  }

  useEffect(() => {
    loadCoze()
  }, [])

  return <></>
}
