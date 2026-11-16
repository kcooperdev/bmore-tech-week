import { HarborScene } from "@/components/HarborScene";
import { LivePortal } from "@/components/LivePortal";
import { UpdatesModal } from "@/components/UpdatesModal";
import { site } from "@/lib/site";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ live?: string }>;
}) {
  const params = await searchParams;
  const live = site.phase === "live" || params.live === "1";

  return (
    <>
      <HarborScene />
      <UpdatesModal />
      {live ? (
        <div className="editorial-flow">
          <LivePortal />
        </div>
      ) : null}
    </>
  );
}
