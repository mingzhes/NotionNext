import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'

/**
 * Coze-AI 聊天组件（新版SDK，支持 ?chat=true 自动展开）
 */
export default function Coze() {
  const cozeSrc = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/cn/index.js'
  const botId = '7481240586977476659'
  const token = 'pat_MyGsMf0ZGL3Vks7K2cG01yg8joMop0KH8dk7fyLOd0UZuunNtUHlJxxXrvCN9Uo0'
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
          autoRender: true
        },
        auth: {
          type: 'token',
          token: token,
          onRefreshToken: () => token
        }
      })

      // ✅ 如果 URL 中含有 chat=true，则立即展开聊天框
      if (typeof window !== 'undefined' && window.location.search.includes('chat=true')) {
        setTimeout(() => {
          try {
            CozeWebSDK.showChatBot()
          } catch (e) {
            console.warn('CozeWebSDK.showChatBot() 调用失败', e)
          }
        }, 800) // 延迟一点，确保 SDK 已初始化
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
