import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'

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

      // ✅ 若含有 chat=true，模拟点击悬浮按钮展开聊天框
      if (typeof window !== 'undefined' && window.location.search.includes('chat=true')) {
        setTimeout(() => {
          const btn = document.querySelector('div[class*="asstBtn"]')
          if (btn) {
            btn.click()
            console.log('模拟点击成功，已展开聊天框')
          } else {
            console.warn('未找到聊天按钮，可能还没加载完成')
          }
        }, 1000)
      }

    } else {
      console.warn('Coze SDK 初始化失败')
    }
  }

  useEffect(() => {
    loadCoze()
  }, [])

  return <></>
}

