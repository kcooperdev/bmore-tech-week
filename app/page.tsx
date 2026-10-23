import { CycleScene } from '@/components/cycle-scene'
import { HomeEditorial } from '@/components/home-editorial'
import { HarborFooter } from '@/components/harbor-footer'
import '../styles.css'

export default function Page() {
  return (
    <div className="bmore">
      <CycleScene />
      <HomeEditorial />
      <HarborFooter />
    </div>
  )
}
