import { NextRequest, NextResponse } from 'next/server'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const responses = [
  "这是一个很好的问题！作为AI助手，我可以帮助您探索各种话题。",
  "让我想想...这个话题确实很有趣。",
  "基于我的理解，我认为这个问题可以从多个角度来分析。",
  "很高兴能和您讨论这个话题！",
  "这是一个深入的问题，让我为您详细解答。",
]

const topicResponses: { [key: string]: string } = {
  '人工智能': '人工智能（AI）是计算机科学的一个分支，致力于创建能够模拟人类智能的系统。它包括机器学习、深度学习、自然语言处理等技术。现代AI已经在图像识别、语音识别、自动驾驶等领域取得了重大突破。',
  '量子计算': '量子计算是一种利用量子力学原理进行计算的新型计算方式。与传统计算机使用比特（0或1）不同，量子计算机使用量子比特，可以同时处于多个状态。这使得量子计算机在某些特定问题上具有指数级的速度优势。',
  '机器学习': '机器学习是人工智能的核心技术之一，它使计算机能够从数据中学习并改进性能，而无需明确编程。常见的机器学习方法包括监督学习、无监督学习和强化学习。',
  '区块链': '区块链是一种分布式账本技术，通过加密算法确保数据的安全性和不可篡改性。它最初作为比特币的底层技术，现在已经扩展到金融、供应链、医疗等多个领域。',
}

function generateResponse(messages: Message[]): string {
  const lastMessage = messages[messages.length - 1]
  const userInput = lastMessage.content.toLowerCase()

  // Check for specific topics
  for (const [topic, response] of Object.entries(topicResponses)) {
    if (userInput.includes(topic.toLowerCase())) {
      return response
    }
  }

  // Handle greetings
  if (userInput.match(/你好|您好|嗨|hi|hello/)) {
    return '你好！我是AI助手，很高兴为您服务。有什么我可以帮助您的吗？'
  }

  // Handle poetry requests
  if (userInput.match(/诗|诗歌|写诗/)) {
    return `春风拂面花满枝，\n莺歌燕舞醉人时。\n碧水青山相映美，\n人间四月好风姿。\n\n这是我为您创作的一首关于春天的诗，希望您喜欢！`
  }

  // Handle thanks
  if (userInput.match(/谢谢|感谢|thank/)) {
    return '不客气！很高兴能帮到您。如果您还有其他问题，随时告诉我！'
  }

  // Handle "what can you do"
  if (userInput.match(/你能|你会|功能|能做什么/)) {
    return '我可以帮您：\n• 回答各种问题\n• 解释复杂概念\n• 创作诗歌和文章\n• 进行知识探讨\n• 提供学习建议\n还有更多功能等您探索！'
  }

  // Default contextual response
  const randomResponse = responses[Math.floor(Math.random() * responses.length)]
  return `${randomResponse} 关于"${lastMessage.content}"，我理解您想了解更多相关信息。虽然我是一个演示版本的LLM，但我会尽力为您提供有价值的回答。您能否告诉我您具体想了解哪方面的内容呢？`
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: '无效的消息格式' },
        { status: 400 }
      )
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000))

    const response = generateResponse(messages)

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: '服务器错误，请稍后再试' },
      { status: 500 }
    )
  }
}
