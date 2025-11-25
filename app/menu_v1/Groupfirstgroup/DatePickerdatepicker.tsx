
'use client'
import React, { useState,useContext,useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import {DatePicker} from '@/components/DatePicker';
import { dateTimeParse } from '@gravity-ui/date-utils';
import i18n from '@/app/components/i18n';
import { getCookie } from '@/app/components/cookieMgment';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import {Modal,Text} from '@gravity-ui/uikit';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import * as v from 'valibot';


const DatePickerdatepicker = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {
  const token:string = getCookie('token'); 
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
 
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
    
  /////////////
   //another screen
  const {firstgroupc4acb, setfirstgroupc4acb}= useContext(TotalContext) as TotalContextProps  
  const {firstgroupc4acbProps, setfirstgroupc4acbProps}= useContext(TotalContext) as TotalContextProps  
  const {textinput2cc5d, settextinput2cc5d}= useContext(TotalContext) as TotalContextProps  
  const {uploade78d7, setuploade78d7}= useContext(TotalContext) as TotalContextProps  
  const {textarea87afb, settextarea87afb}= useContext(TotalContext) as TotalContextProps  
  const {radiof9609, setradiof9609}= useContext(TotalContext) as TotalContextProps  
  const {radiogroup5ad4f, setradiogroup5ad4f}= useContext(TotalContext) as TotalContextProps  
  const {switcha515a, setswitcha515a}= useContext(TotalContext) as TotalContextProps  
  const {pininputf6753, setpininputf6753}= useContext(TotalContext) as TotalContextProps  
  const {save67a1f, setsave67a1f}= useContext(TotalContext) as TotalContextProps  
  const {radiobutton6d7d6, setradiobutton6d7d6}= useContext(TotalContext) as TotalContextProps  
  const {checkbox1c08f, setcheckbox1c08f}= useContext(TotalContext) as TotalContextProps  
  const {signature75ba3, setsignature75ba3}= useContext(TotalContext) as TotalContextProps  
  const {viewer2e45c, setviewer2e45c}= useContext(TotalContext) as TotalContextProps  
  const {card63ac3, setcard63ac3}= useContext(TotalContext) as TotalContextProps  
  const {timepicker40a6b, settimepicker40a6b}= useContext(TotalContext) as TotalContextProps  
  const {slider6c8f7, setslider6c8f7}= useContext(TotalContext) as TotalContextProps  
  const {qrcode772a6, setqrcode772a6}= useContext(TotalContext) as TotalContextProps  
  const {image54de2, setimage54de2}= useContext(TotalContext) as TotalContextProps  
  const {dropdown7f41a, setdropdown7f41a}= useContext(TotalContext) as TotalContextProps  
  const {icon71de8, seticon71de8}= useContext(TotalContext) as TotalContextProps  
  const {text5d0f8, settext5d0f8}= useContext(TotalContext) as TotalContextProps  
  const {label9bd6f, setlabel9bd6f}= useContext(TotalContext) as TotalContextProps  
  const {listec3b4, setlistec3b4}= useContext(TotalContext) as TotalContextProps  
  const {datepickerbe904, setdatepickerbe904}= useContext(TotalContext) as TotalContextProps  
  const {jsonviewerfbb2e, setjsonviewerfbb2e}= useContext(TotalContext) as TotalContextProps  
  const {avatar24aed, setavatar24aed}= useContext(TotalContext) as TotalContextProps  
  const {companycard071eb, setcompanycard071eb}= useContext(TotalContext) as TotalContextProps  
  const {progressd7ccf, setprogressd7ccf}= useContext(TotalContext) as TotalContextProps  
  const {texttospeech63351, settexttospeech63351}= useContext(TotalContext) as TotalContextProps  
  const {speechtotext5f5c9, setspeechtotext5f5c9}= useContext(TotalContext) as TotalContextProps  
  const {tabsb7d72, settabsb7d72}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];
const handleUpdate = async(date: any) => {
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();
  setError('')
  setValidate((pre:any)=>({...pre,datepicker:undefined}))
  setfirstgroupc4acb((prev: any) => ({ ...prev, datepicker: isoDate }))
}



const handleBlur=async () => {
    let code:any;
    const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:AllComponents:AFVK:v1",  componentId:"5909e18973e149f19bb5db9d38fc4acb",controlId:"b5ec1780af3e49db8f18220e901be904",isTable:false,accessProfile:accessProfile,from:"datePickerdatepicker"},{
      headers: {
        Authorization: `Bearer ${token}`
    }})
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
      codeStates['firstgroup']  = firstgroupc4acb;
      codeStates['setfirstgroup'] = setfirstgroupc4acb;
  codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setfirstgroupc4acbProps((pre:any)=>({...pre,validation:true}))
 },[datepickerbe904?.refresh])

  useEffect(()=>{
      handleBlur()
  },[validateRefetch.value])

if (datepickerbe904?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `1 / 3`,gridRow: `200 / 211`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
    className=""
      label={keyset("datepicker")}
      value={firstgroupc4acb?.datepicker?dateTimeParse(firstgroupc4acb?.datepicker):null}
      onChange= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      // style={{width:'100%'}}     
      readOnly=  {datepickerbe904?.isDisabled ? true : false}
          disabled= {datepickerbe904?.isDisabled ? true : false}
      size='l'

      validationState={validate?.datepicker ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdatepicker
