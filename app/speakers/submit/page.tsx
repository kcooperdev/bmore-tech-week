import { redirect } from 'next/navigation'
import { EVENT } from '@/lib/data'

export default function SubmitTalkRedirect() {
  redirect(`${EVENT.speakersPath}#apply`)
}
