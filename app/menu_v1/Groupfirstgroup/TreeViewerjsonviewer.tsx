'use client'
import React, { useContext, useEffect, useState } from "react";
import i18n from "@/app/components/i18n";
import { getMapperDetailsDto, te_refreshDto } from "@/app/interfaces/interfaces";
import { Table, withTableActions,Icon,Button,Container,Text } from '@gravity-ui/uikit';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from "@/app/globalContext";
import TorusDocViewer from "@/components/DocumentViewer";
import { AxiosService } from "@/app/components/axiosService";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import imageNotFound from '@/app/assets/imageNotFound.png';
import {ChevronDown,ChevronUp,Pin} from '@gravity-ui/icons';

    
function createData(
  data: any,
  handleClick: (val: any, path: string) => void = () => {},
  path: string
): React.ReactNode {
  const isUrl = (str: string): boolean => {
    try {
      new URL(str)
      return true
    } catch {
      return false
    }
  }

  if (data) {
    // Primitive types: string, number, boolean
    if (['string', 'number', 'boolean'].includes(typeof data)) {
      const content = String(data)

      return isUrl(content) ? (
        <div className='flex items-center gap-2'>
          <button
            onClick={() => handleClick(content, path + '/' + content)}
            className='cursor-pointer p-1 hover:text-blue-500'
            aria-label='Pin link'
          >
            <Icon data={Pin} width={15} height={15} />
          </button>
          <a
            href={content}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1 text-blue-600 hover:underline'
          >
            <Text>{content}</Text>
          </a>
        </div>
      ) : (
        <div className='flex items-center gap-2'>
           <button
            onClick={() => handleClick(content, path + '/' + content)}
            className='cursor-pointer p-1 hover:text-blue-500'
            aria-label='Pin link'
          >
            <Icon data={Pin} width={15} height={15} />
          </button>
          <Text>{content}</Text>
        </div>
      )
    }

    // Array
    else if (Array.isArray(data)) {
      if (
        data.length > 0 &&
        typeof data[0] === 'object' &&
        data[0] !== null &&
        Object.keys(data[0]).length > 0
      ) {
        return (
          <div className='flex flex-col gap-3'>
            {data.map((subData: any, id: number) => {
              return (
                <div key={id} className='flex'>
                  {createData(subData, handleClick, path)}
                </div>
              )
            })}
          </div>
        )
      } else {
        // Array of primitives or empty objects
        return (
          <div className='flex flex-col gap-2'>
            {data.map((item, idx) => (
              <div key={idx}>{createData(item, handleClick, path)}</div>
            ))}
          </div>
        )
      }
    }

    // Nested object
    else if (typeof data === 'object') {
      return (
        <div className='flex flex-col gap-3'>
          <NestedObject data={data} handleClick={handleClick} path={path} />
        </div>
      )
    }
  }

  return <div className='italic text-gray-500'>No Data</div>
}

const NestedObject = ({
  data,
  handleClick,
  path
}: {
  data: any
  handleClick: (val: any, path: string) => void
  path: string
}) => {
  const [expandedKeys, setExpandedKeys] = useState<{ [key: string]: boolean }>(
    {}
  )

  const toggleKey = (key: string) => {
    setExpandedKeys(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className='flex flex-col gap-3 pl-4'>
      {Object.keys(data).map(key => {
        const isExpanded = expandedKeys[key]
        return (
          <div key={key}>
            <div className='flex items-center gap-1'>
              <strong className='flex items-center gap-1'>
                <button
                  onClick={() => handleClick(data[key], path + '/' + key)}
                  className='cursor-pointer hover:text-blue-500'
                  aria-label={`Pin ${key}`}
                >
                  <Icon data={Pin} width={15} height={15} />
                </button>
                {key}
              </strong>
              <button
                onClick={() => toggleKey(key)}
                className='text-gray-600 hover:text-black focus:outline-none'
                aria-label={isExpanded ? `Collapse ${key}` : `Expand ${key}`}
              >
                {isExpanded ? (
                  <Icon data={ChevronUp} width={15} height={15} />
                ) : (
                  <Icon data={ChevronDown} width={15} height={15} />
                )}
              </button>
            </div>
            {isExpanded && (
              <div className='ml-6 mt-2 border-l border-gray-200'>
                {createData(data[key], handleClick, path + '/' + key)}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const TreeViewerjsonviewer = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {
  const token:string = getCookie('token'); 
  const {disableParam, setDisableParam} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const [open, setOpen] = React.useState(false);

  const [url, setUrl] = useState<string>('');
  const [documentType, setDocumentType] = useState('');
  const [data, setData] = React.useState<any>("");
  const [otherFileFormat, setOtherFileFormat] = useState(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
 /////////////
   //another screen
  const {firstgroupc4acb, setfirstgroupc4acb}= useContext(TotalContext) as TotalContextProps;
  const {firstgroupc4acbProps, setfirstgroupc4acbProps}= useContext(TotalContext) as TotalContextProps;
  const {textinput2cc5d, settextinput2cc5d}= useContext(TotalContext) as TotalContextProps;
  const {uploade78d7, setuploade78d7}= useContext(TotalContext) as TotalContextProps;
  const {textarea87afb, settextarea87afb}= useContext(TotalContext) as TotalContextProps;
  const {radiof9609, setradiof9609}= useContext(TotalContext) as TotalContextProps;
  const {radiogroup5ad4f, setradiogroup5ad4f}= useContext(TotalContext) as TotalContextProps;
  const {switcha515a, setswitcha515a}= useContext(TotalContext) as TotalContextProps;
  const {pininputf6753, setpininputf6753}= useContext(TotalContext) as TotalContextProps;
  const {save67a1f, setsave67a1f}= useContext(TotalContext) as TotalContextProps;
  const {radiobutton6d7d6, setradiobutton6d7d6}= useContext(TotalContext) as TotalContextProps;
  const {checkbox1c08f, setcheckbox1c08f}= useContext(TotalContext) as TotalContextProps;
  const {signature75ba3, setsignature75ba3}= useContext(TotalContext) as TotalContextProps;
  const {viewer2e45c, setviewer2e45c}= useContext(TotalContext) as TotalContextProps;
  const {card63ac3, setcard63ac3}= useContext(TotalContext) as TotalContextProps;
  const {timepicker40a6b, settimepicker40a6b}= useContext(TotalContext) as TotalContextProps;
  const {slider6c8f7, setslider6c8f7}= useContext(TotalContext) as TotalContextProps;
  const {qrcode772a6, setqrcode772a6}= useContext(TotalContext) as TotalContextProps;
  const {image54de2, setimage54de2}= useContext(TotalContext) as TotalContextProps;
  const {dropdown7f41a, setdropdown7f41a}= useContext(TotalContext) as TotalContextProps;
  const {icon71de8, seticon71de8}= useContext(TotalContext) as TotalContextProps;
  const {text5d0f8, settext5d0f8}= useContext(TotalContext) as TotalContextProps;
  const {label9bd6f, setlabel9bd6f}= useContext(TotalContext) as TotalContextProps;
  const {listec3b4, setlistec3b4}= useContext(TotalContext) as TotalContextProps;
  const {datepickerbe904, setdatepickerbe904}= useContext(TotalContext) as TotalContextProps;
  const {jsonviewerfbb2e, setjsonviewerfbb2e}= useContext(TotalContext) as TotalContextProps;
  const {avatar24aed, setavatar24aed}= useContext(TotalContext) as TotalContextProps;
  const {companycard071eb, setcompanycard071eb}= useContext(TotalContext) as TotalContextProps;
  const {progressd7ccf, setprogressd7ccf}= useContext(TotalContext) as TotalContextProps;
  const {texttospeech63351, settexttospeech63351}= useContext(TotalContext) as TotalContextProps;
  const {speechtotext5f5c9, setspeechtotext5f5c9}= useContext(TotalContext) as TotalContextProps;
  const {tabsb7d72, settabsb7d72}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleMapperDetails=async()=>{
    try{
      let code:any;
      const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{
        key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:AllComponents:AFVK:v1",  componentId:"5909e18973e149f19bb5db9d38fc4acb",
        controlId:"eb0752688442417d8179cb10fb7fbb2e",isTable:false,
        accessProfile:accessProfile,from:"TreeViewer"},{
        headers: {
          Authorization: `Bearer ${token}`
      }})
      let dfdKey:any=""
      if( orchestrationData?.data?.mapper?.length && orchestrationData?.data?.mapper[0]?.sourceKey?.length){
        dfdKey = orchestrationData?.data?.mapper[0]?.sourceKey[0]?.split("|")?.at(0)
      }
      if(dfdKey=='')
        return
      let te_refreshBody:te_refreshDto={
          key: dfdKey+":",
          refreshFlag: "Y",
          count:1000,
          page:1
        }
        if (encryptionFlagCont) {
          te_refreshBody["dpdKey"] = encryptionDpd;
          te_refreshBody["method"] = encryptionMethod;
        }
        const te_refreshData:any=await AxiosService.post("/te/eventEmitter",te_refreshBody,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(te_refreshData?.data?.error == true){
          toast(te_refreshData?.data?.errorDetails?.message, 'danger')
        }else{
          setfirstgroupc4acb({...firstgroupc4acb, jsonviewer:te_refreshData?.data?.dataset?.data || []})
        }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperDetails()
  },[])

  function handleClick(data:any,path:string){
    data=path.replace('/','')
  }

  if (jsonviewerfbb2e?.isHidden) {
    return <></>
  }  return (
    <div 
      style={{gridColumn: `1 / 3`,gridRow: `225 / 241`, gap:``, height: `100%`, overflow: 'auto'}} >  
      <Container>
        <div className='flex overflow-auto w-[200] h-[200]'>{createData(firstgroupc4acb?.jsonviewer, handleClick, '')}</div>
      </Container>
    </div>
  );
}

export default TreeViewerjsonviewer

