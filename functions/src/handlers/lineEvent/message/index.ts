import { Line, client } from '../../../line.config'
import Text from './text'
import { makeReplyMessages } from '../../../lib/line'

export default async (event: Line.MessageEvent): Promise<string> => {
  // Webhookの検証
  if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return 'Webhookの検証'
  }

  switch (event.message.type) {
    case 'text':
      return await Text(event)
    default:
      await client.replyMessage(
        event.replyToken,
        makeReplyMessages('文字以外は受け付けてません。')
      )
      return '文字以外を受信しました'
  }
}
