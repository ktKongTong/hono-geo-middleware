'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {useGeo} from "@/app/api-hook";
import FieldList from "@/app/field-list";

export default function GeoPanelClient() {
  const {geo, status, provider, setProvider, availableProvider} = useGeo()
  return <div className={'w-full h-96 flex flex-col items-center justify-start gap-2'}>
    <div className={"flex justify-between items-center w-full max-w-96"}>
      <div className={'text-lg font-bold'}>选择provider</div>
      <Select defaultValue={availableProvider[0]} onValueChange={(v)=> setProvider(v)} value={provider}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="provider" />
        </SelectTrigger>
        <SelectContent>
          {
            availableProvider.map(it => <SelectItem value={it} key={it}>{it}</SelectItem>)
          }
        </SelectContent>
      </Select>
    </div>

    <div>
        <FieldList value={geo}/>
    </div>

  </div>
}