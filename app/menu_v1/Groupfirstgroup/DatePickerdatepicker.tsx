
'use client'
import React, { useState,useContext,useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { getCookie } from '@/app/components/cookieMgment';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { DatePicker } from '@/components/DatePicker';
import { Text } from '@/components/Text';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import * as v from 'valibot';


const DatePickerdatepicker = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {
  const token:string = getCookie('token'); 
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
 
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
  const {firstgroupc08a7, setfirstgroupc08a7}= useContext(TotalContext) as TotalContextProps  
  const {firstgroupc08a7Props, setfirstgroupc08a7Props}= useContext(TotalContext) as TotalContextProps  
  const {button6c543, setbutton6c543}= useContext(TotalContext) as TotalContextProps  
  const {avatard99b3, setavatard99b3}= useContext(TotalContext) as TotalContextProps  
  const {radiogroupcf04e, setradiogroupcf04e}= useContext(TotalContext) as TotalContextProps  
  const {datepickerbe7c3, setdatepickerbe7c3}= useContext(TotalContext) as TotalContextProps  
  const {checkbox2289f, setcheckbox2289f}= useContext(TotalContext) as TotalContextProps  
  const {dropdown0e57d, setdropdown0e57d}= useContext(TotalContext) as TotalContextProps  
  const {upload2cc02, setupload2cc02}= useContext(TotalContext) as TotalContextProps  
  const {label33b92, setlabel33b92}= useContext(TotalContext) as TotalContextProps  
  const {imageeee6c, setimageeee6c}= useContext(TotalContext) as TotalContextProps  
  const {textinput56a48, settextinput56a48}= useContext(TotalContext) as TotalContextProps  
  const {icon0a30c, seticon0a30c}= useContext(TotalContext) as TotalContextProps  
  const {cardaf24d, setcardaf24d}= useContext(TotalContext) as TotalContextProps  
  const {liste965e, setliste965e}= useContext(TotalContext) as TotalContextProps  
  const {pininput92978, setpininput92978}= useContext(TotalContext) as TotalContextProps  
  const {progress53986, setprogress53986}= useContext(TotalContext) as TotalContextProps  
  const {qrcoded45d1, setqrcoded45d1}= useContext(TotalContext) as TotalContextProps  
  const {radiobutton92d8e, setradiobutton92d8e}= useContext(TotalContext) as TotalContextProps  
  const {radio65f38, setradio65f38}= useContext(TotalContext) as TotalContextProps  
  const {speechtotextf8edf, setspeechtotextf8edf}= useContext(TotalContext) as TotalContextProps  
  const {texttospeech35a79, settexttospeech35a79}= useContext(TotalContext) as TotalContextProps  
  const {textf0149, settextf0149}= useContext(TotalContext) as TotalContextProps  
  const {switch4a6e4, setswitch4a6e4}= useContext(TotalContext) as TotalContextProps  
  const {textareaa5a38, settextareaa5a38}= useContext(TotalContext) as TotalContextProps  
  const {timepicker8a8fa, settimepicker8a8fa}= useContext(TotalContext) as TotalContextProps  
  const {signature63e12, setsignature63e12}= useContext(TotalContext) as TotalContextProps  
  const {sliderde96f, setsliderde96f}= useContext(TotalContext) as TotalContextProps  
  const {secondgroup311a5, setsecondgroup311a5}= useContext(TotalContext) as TotalContextProps  
  const {secondgroup311a5Props, setsecondgroup311a5Props}= useContext(TotalContext) as TotalContextProps  
  //////////////


  // Validation
  const [error, setError] = useState<string>('');
  let schemaArray :any =[];

  const schema : any  = v.pipe(v.date(),v.maxValue(new Date(), 'Date must be in the past'))
const handleUpdate = async(date: any) => {
  const selectedDate = new Date(date);
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const indiaTime = new Date(selectedDate.getTime() + IST_OFFSET);
  const isoDate = indiaTime.toISOString();
  setError('')
  setValidate((pre:any)=>({...pre,datepicker:undefined}))
  setfirstgroupc08a7((prev: any) => ({ ...prev, datepicker: isoDate }))
}



const handleBlur=async () => {
    if(firstgroupc08a7?.datepicker == "" || firstgroupc08a7?.datepicker == undefined){
    firstgroupc08a7.datepicker = "";
    const validate:any = v.safeParse(schema, firstgroupc08a7?.datepicker);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,datepicker:"invalid"}))
    }
    setError('')
    setValidate((pre:any)=>({...pre,datepicker:undefined}))
    }else if(firstgroupc08a7?.datepicker !== ""){
      const validate:any = v.safeParse(schema, new Date(firstgroupc08a7?.datepicker));
      if(!validate.success){
        setError(validate?.issues[0]?.message);
        setValidate((pre:any)=>({...pre,datepicker:"invalid"}))
      }
    }
    let code:any;
    const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:propsCheck:AFVK:v1",  componentId:"c2cb1a49935b44419561e81deffc08a7",controlId:"c83e26921dd44c55bde28d858a8be7c3",isTable:false,accessProfile:accessProfile,from:"datePickerdatepicker"},{
      headers: {
        Authorization: `Bearer ${token}`
    }})
    code=orchestrationData?.data?.code
    if (code != '') {
    let codeStates: any = {};
      codeStates['firstgroup']  = firstgroupc08a7;
      codeStates['setfirstgroup'] = setfirstgroupc08a7;
      codeStates['secondgroup']  = secondgroup311a5;
      codeStates['setsecondgroup'] = setsecondgroup311a5;
  codeExecution(code,codeStates);
  }
}

useEffect(()=>{
  setfirstgroupc08a7Props((pre:any)=>({...pre,validation:true,required:true}))
 },[datepickerbe7c3?.refresh])

  useEffect(()=>{
    if(validateRefetch.init!=0)
      handleBlur()
  },[validateRefetch.value])

if (datepickerbe7c3?.isHidden) {
  return <></>
}
return (
  <div 
  style={{gridColumn: `13 / 16`,gridRow: `19 / 47`, gap:``, height: `100%`, overflow: 'auto'}} >
    <DatePicker
      className=""
      //label={keyset("datepicker")}
      value={firstgroupc08a7?.datepicker}
      onUpdate= {handleUpdate}
      onBlur= {()=>handleBlur()} 
      readOnly=  {datepickerbe7c3?.isDisabled ? true : false}
      disabled= {datepickerbe7c3?.isDisabled ? true : false}
      needTooltip={true}  
      tooltipProps={{title:"Tooltip",placement:"top-start"}}
      contentAlign={"left"}
      headerPosition='top'
      headerText="DatePicker"
      validationState={validate?.datepicker ? "invalid" : undefined}
      errorMessage={error}
      />
  </div>
  )
}

export default DatePickerdatepicker
