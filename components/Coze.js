import { useEffect, useRef } from 'react'
import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'

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
          title: title,
          autoRender: true,
          triggerButton: true // ✅ 关键配置
        },
        auth: {
          type: 'token',
          token: token,
          onRefreshToken: () => token
        }
      })

      clientRef.current = client

      // ✅ 自动展开入口控制
      if (typeof window !== 'undefined' && window.location.search.includes('chat=true')) {
        setTimeout(() => {
          try {
            client.open() // ✅ 只有 triggerButton 为 true 才有 open 方法
          } catch (e) {
            console.warn('Coze open failed:', e)
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

