import { useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import { loadExternalResource } from '@/lib/utils'

/**
 * Coze-AI 聊天组件（支持 ?chat=true 自动展开）
 */
export default function Coze() {
  const cozeSrc = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/cn/index.js'
  const botId = '7481240586977476659'
  const token = 'pat_MyGsMf0ZGL3Vks7K2cG01yg8joMop0KH8dk7fyLOd0UZuunNtUHlJxxXrvCN9Uo0'
  const title = siteConfig('COZE_TITLE', 'Coze')

  // ✅ 智能等待聊天按钮出现后模拟点击
  const waitAndClickChatButton = (maxWaitMs = 5000) => {
    const interval = 300
    let waited = 0

    const timer = setInterval(() => {
      const btn = document.querySelector('div[class*="asstBtn"]')
      if (btn) {
        btn.click()
        console.log('✅ 找到聊天按钮，已自动展开')
        clearInterval(timer)
      } else {
        waited += interval
        if (waited >= maxWaitMs) {
          console.warn('⏰ 超时未找到聊天按钮，放弃自动展开')
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
          title: title,
          autoRender: true
        },
        auth: {
          type: 'token',
          token: token,
          onRefreshToken: () => token
        }
      })

      // ✅ URL 参数含 chat=true 时自动展开聊天
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
