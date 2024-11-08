

// 1. ssr

import GeoPanelClient from "@/app/geo-panel.client";

export default function Page() {
  return <div className="flex h-full grow md:overflow-hidden min-h-screen">
    <div className="flex-grow md:overflow-y-auto">
      <div className={'w-full h-16 border-b flex items-center justify-end gap-4 font-bold px-4'}>
        <div>
          Docs
        </div>
        <div>
          Help
        </div>
        <div>
          GitHub
        </div>
      </div>
      <div className={'h-[calc(100vh-64px)] pb-10'}>
        <div className={'grow h-full mx-auto max-w-5xl px-6 flex flex-col items-center justify-center'}>
         <GeoPanelClient/>
        </div>
      </div>

    </div>

  </div>
}