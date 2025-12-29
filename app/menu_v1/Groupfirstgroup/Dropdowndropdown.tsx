
'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { getMapperDetailsDto, te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation'
import { Button, DropdownMenu, Select, Modal, Icon,Text  } from '@gravity-ui/uikit'
import { getCookie } from '@/app/components/cookieMgment';
import { getDropdownDetails } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import {ChevronDown} from '@gravity-ui/icons';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import * as v from 'valibot'


const Dropdowndropdown = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagCompData}: any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const keyset:any=i18n.keyset("language");
  const [initialCount,setInitialCount]=useState(0)
  let getMapperDetails:any;
  const toast=useInfoMsg();
  const routes = useRouter();
  const [isRequredData,setIsRequredData]=useState(false)
  const [error, setError] = useState<string>('')
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef(false);
  let customecode:any="";
  const [allCode,setAllCode]=useState<any>("");
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
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  const items = [
   'sivam',
   'amrish',
   'dominic',
  ];

  useEffect(() => {
  if(firstgroupc4acb?.dropdown=="" || firstgroupc4acb?.dropdown==undefined || firstgroupc4acb?.dropdown==null ){
    setSelectedItem("");
  }
  },[firstgroupc4acb?.dropdown])

  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:AllComponents:AFVK:v1",
          componentId: "5909e18973e149f19bb5db9d38fc4acb",
          controlId: "1bb476ab826941d5bc9e1c5da437f41a",
          isTable: false,
          accessProfile:accessProfile,
          from:"dropdowndropdown"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[dropdown7f41a?.refresh])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      setfirstgroupc4acb((prev: any) => ({ ...prev, dropdown: value[0]}))
      setIsRequredData(false)
    } else {
      setfirstgroupc4acb((prev: any) => ({ ...prev, dropdown: ''}))
      setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,dropdown:undefined}))
    selected.current=value
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}
      
        codeStates['firstgroup'] = firstgroupc4acb,
        codeStates['setfirstgroup'] = setfirstgroupc4acb,
        codeStates['selected']  = selected,
        codeStates['firstgroupc4acb'] = firstgroupc4acbProps,
        codeStates['setfirstgroupc4acb'] = setfirstgroupc4acbProps,
        codeStates['selected']  = selected,
        codeStates['textinput'] = textinput2cc5d,
        codeStates['settextinput'] = settextinput2cc5d,
        codeStates['selected']  = selected,
        codeStates['upload'] = uploade78d7,
        codeStates['setupload'] = setuploade78d7,
        codeStates['selected']  = selected,
        codeStates['textarea'] = textarea87afb,
        codeStates['settextarea'] = settextarea87afb,
        codeStates['selected']  = selected,
        codeStates['radio'] = radiof9609,
        codeStates['setradio'] = setradiof9609,
        codeStates['selected']  = selected,
        codeStates['radiogroup'] = radiogroup5ad4f,
        codeStates['setradiogroup'] = setradiogroup5ad4f,
        codeStates['selected']  = selected,
        codeStates['switch'] = switcha515a,
        codeStates['setswitch'] = setswitcha515a,
        codeStates['selected']  = selected,
        codeStates['pininput'] = pininputf6753,
        codeStates['setpininput'] = setpininputf6753,
        codeStates['selected']  = selected,
        codeStates['save'] = save67a1f,
        codeStates['setsave'] = setsave67a1f,
        codeStates['selected']  = selected,
        codeStates['radiobutton'] = radiobutton6d7d6,
        codeStates['setradiobutton'] = setradiobutton6d7d6,
        codeStates['selected']  = selected,
        codeStates['checkbox'] = checkbox1c08f,
        codeStates['setcheckbox'] = setcheckbox1c08f,
        codeStates['selected']  = selected,
        codeStates['signature'] = signature75ba3,
        codeStates['setsignature'] = setsignature75ba3,
        codeStates['selected']  = selected,
        codeStates['viewer'] = viewer2e45c,
        codeStates['setviewer'] = setviewer2e45c,
        codeStates['selected']  = selected,
        codeStates['card'] = card63ac3,
        codeStates['setcard'] = setcard63ac3,
        codeStates['selected']  = selected,
        codeStates['timepicker'] = timepicker40a6b,
        codeStates['settimepicker'] = settimepicker40a6b,
        codeStates['selected']  = selected,
        codeStates['slider'] = slider6c8f7,
        codeStates['setslider'] = setslider6c8f7,
        codeStates['selected']  = selected,
        codeStates['qrcode'] = qrcode772a6,
        codeStates['setqrcode'] = setqrcode772a6,
        codeStates['selected']  = selected,
        codeStates['image'] = image54de2,
        codeStates['setimage'] = setimage54de2,
        codeStates['selected']  = selected,
        codeStates['dropdown'] = dropdown7f41a,
        codeStates['setdropdown'] = setdropdown7f41a,
        codeStates['selected']  = selected,
        codeStates['icon'] = icon71de8,
        codeStates['seticon'] = seticon71de8,
        codeStates['selected']  = selected,
        codeStates['text'] = text5d0f8,
        codeStates['settext'] = settext5d0f8,
        codeStates['selected']  = selected,
        codeStates['label'] = label9bd6f,
        codeStates['setlabel'] = setlabel9bd6f,
        codeStates['selected']  = selected,
        codeStates['list'] = listec3b4,
        codeStates['setlist'] = setlistec3b4,
        codeStates['selected']  = selected,
        codeStates['datepicker'] = datepickerbe904,
        codeStates['setdatepicker'] = setdatepickerbe904,
        codeStates['selected']  = selected,
        codeStates['jsonviewer'] = jsonviewerfbb2e,
        codeStates['setjsonviewer'] = setjsonviewerfbb2e,
        codeStates['selected']  = selected,
        codeStates['avatar'] = avatar24aed,
        codeStates['setavatar'] = setavatar24aed,
        codeStates['selected']  = selected,
        codeStates['companycard'] = companycard071eb,
        codeStates['setcompanycard'] = setcompanycard071eb,
        codeStates['selected']  = selected,
        codeStates['progress'] = progressd7ccf,
        codeStates['setprogress'] = setprogressd7ccf,
        codeStates['selected']  = selected,
        codeStates['texttospeech'] = texttospeech63351,
        codeStates['settexttospeech'] = settexttospeech63351,
        codeStates['selected']  = selected,
        codeStates['speechtotext'] = speechtotext5f5c9,
        codeStates['setspeechtotext'] = setspeechtotext5f5c9,
        codeStates['selected']  = selected,
        codeStates['tabs'] = tabsb7d72,
        codeStates['settabs'] = settabsb7d72,
        codeStates['selected']  = selected,
    codeExecution(customecode,codeStates)
    }
  }
   
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
  let schemaArray = [] ;
  const handleBlur = async () => {
  }

    useEffect(()=>{
        handleBlur()
    },[validateRefetch.value])
  ///////////////

  useEffect(() => {
    if(initialCount!=0)
     setfirstgroupc4acb((pre:any)=>({...pre,dropdown:""}))
    else
      setInitialCount(1)
  },[dropdown7f41a?.refresh])

  if (dropdown7f41a?.isHidden) {
    return <></>
  }

  return (
    <div 
      style={{gridColumn: `8 / 10`,gridRow: `132 / 167`, gap:``, height: `100%`, overflow: 'auto'}} >
      <div>
      </div>
      <Select
        className=""
        placeholder={keyset("dropdown")} 
        filterable={true}
        hasClear={true}
          disabled= {dropdown7f41a?.isDisabled ? true : false}
          width = {250}
          value={firstgroupc4acb?.dropdown ?[firstgroupc4acb?.dropdown] : []}
          onUpdate={handleClick}
          validationState={validate?.dropdown ? "invalid" : undefined}
          errorMessage={error}
      > 
      {items.map((option, index) => (
        <Select.Option key={index} value={option}>
          {option}
        </Select.Option>
      ))}
      </Select>
    </div>
  );
};

export default Dropdowndropdown;
