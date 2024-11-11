"use client"

import { motion } from "framer-motion"
import { Cloud, Loader2 } from "lucide-react"
import React, {useState, useEffect, Provider} from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {useGeo} from "@/app/api-hook";

const shatterAnimation = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
    transitionEnd: {
      display: "none",
    },
  },
}

const slideInAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
}
interface BodyProps {
  geo: Record<string, any>| null,
  preData: Record<string, any> | null,
  status : any
}
function Body({status, geo, preData}: BodyProps) {
  const loading = status.loading
  return (
    <div className="rounded-lg border  overflow-hidden">
      <Table className={' overflow-hidden '}>
        <TableHeader>
          <TableRow>
            <TableHead className={'w-32'}>Property</TableHead>
            <TableHead className={'text-right'}>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-hidden ">
          {Object.entries(geo ?? {}).map(([key, value]) => (
            <motion.tr
              key={key}
              initial={preData?.[key] ? false : slideInAnimation.initial}
              animate={slideInAnimation.animate}
              exit={shatterAnimation.exit}
              className={'w-full overflow-hidden'}
              transition={slideInAnimation.transition}
            >
              <TableCell className="font-medium w-32">{key}</TableCell>
              <TableCell className={''}>
                <div className={' w-full h-full flex items-center justify-end'}>
                  <AnimatedValue value={value} isLoading={loading}/>
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

interface Props {
  provider: string
  availableProvider: string[],
  onProviderChangeAction: (value: string) => void
}

export function Header({provider, availableProvider, onProviderChangeAction}: Props) {
  return (
    <div className={'w-full flex items-center justify-between p-2'}>
      <div className={'flex items-center gap-2'}>
        <span>Runtime</span>
      </div>
      <Select onValueChange={onProviderChangeAction} value={provider}>
        <SelectTrigger id="runtime-select" className="max-w-40">
          <SelectValue placeholder="Select a runtime"/>
        </SelectTrigger>
        <SelectContent>
          {availableProvider.map((runtime) => (
            <SelectItem key={runtime} value={runtime}>
              {runtime}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

  )
}

export default function Wrapped() {

  const {geo,preData, status, provider, setProvider, availableProvider} = useGeo()
  return <div className={'relative w-full overflow-hidden gap-1 h-[500px]'}>
    <Header availableProvider={availableProvider} provider={provider} onProviderChangeAction={setProvider}/>

    <Body preData={preData} status={status} geo={geo}/>
  </div>

}

function AnimatedValue({value, isLoading}: { value: string; isLoading: boolean }) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    if (!isLoading) {
      setDisplayValue(value)
    }
  }, [value, isLoading])

  return (
    <motion.div
      key={value}
      initial={isLoading ? {opacity: 0.5} : {opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      className={'text-right '}
      transition={{duration: 0.2}}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2 ">
          <Loader2 className="h-4 w-4 animate-spin"/>
          <span>{displayValue}</span>
        </div>
      ) : (
        displayValue
      )}
    </motion.div>
  )
}