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
  return <>
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
    <div>
        <FieldList value={geo}/>
    </div>

  </>
}