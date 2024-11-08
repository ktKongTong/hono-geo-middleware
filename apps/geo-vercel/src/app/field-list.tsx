export default function FieldList({value}:{value:Record<string, any> | null}) {


  const keys = Object.keys(value ?? {})
  return <>
  <ul className={'w-96 bg-zinc-100 shadow-sm rounded-lg p-4 min-h-64'}>
    {
      value == null ? (
        <>loading</>
      ):(
        <>
          {
            keys.map(key=><li><FiledItem key={key} name={key} value={value?.[key]} /></li>)
          }
        </>
      )
    }
  </ul>
  </>
}
interface FieldItemProps {
  name: string,
  value: any
}
const FiledItem = ({name, value}:FieldItemProps )=> {
  let comp = 'span'
  let v = value
  if(typeof value === 'string' || typeof value === 'number'){
    v = decodeURIComponent(v)
  }

  if(typeof value === 'object' && Array.isArray(value)){
    // return <span></span>
  }

  if(typeof value === 'undefined'){

  }

  return <div className={'flex items-center justify-between w-full'}>
    <span>{name}</span>
    <span>{v}</span>
  </div>
}