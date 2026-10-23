import { redirect } from 'next/navigation'
import { applyLink } from '@/lib/data'

export default function SubmitTalkRedirect() {
  redirect(applyLink('speak').href)
}
