import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'

export default function Coze() {
  const cozeSrc = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/cn/index.js'
  const botId = '7481240586977476659'
  const token = 'pat_MyGsMf0ZGL3Vks7K2cG01yg8joMop0KH8dk7fyLOd0UZuunNtUHlJxxXrvCN9Uo0'
  const title = siteConfig('COZE_TITLE', 'Coze')

  // 等待浮窗按钮加载后模拟点击展开聊天框
  const waitAndClickChatButton = (maxWaitMs = 10000) => {
    const interval = 300
    let waited = 0

    const timer = setInterval(() => {
      const btn = document.querySelector('div.ab1ac9d9bab12da47298')
      if (btn) {
        btn.click()
        console.log('✅ 自动点击悬浮球，聊天框已展开')
        clearInterval(timer)
      } else {
        waited += interval
        if (waited >= maxWaitMs) {
          console.warn('⏰ 超时未找到悬浮球按钮，放弃自动展开')
          clearInterval(timer)
        }
      }
    }, interval)
  }

  const loadCoze = async () => {
    await loadExternalResource(cozeSrc)

    const CozeWebSDK = window?.CozeWebSDK
    if (CozeWebSDK && botId && token) {
      new CozeWebSDK.WebChatClient({
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

      // ✅ 判断 URL 是否带有 chat=true，满足时自动展开
      if (typeof window !== 'undefined' && window.location.search.includes('chat=true')) {
        waitAndClickChatButton()
      }
    } else {
      console.warn('❌ Coze SDK 初始化失败')
    }
  }

  useEffect(() => {
    loadCoze()
  }, [])

  return <></>
}
