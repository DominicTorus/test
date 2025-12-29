'use client'
import React, { useState,useContext,useEffect } from 'react'
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
//////////
import { Modal } from "@/components/Modal";
import { ConfirmModal } from "@/components/ConfirmModal";
import { TextToSpeech } from "@/components/TextToSpeech";
import { Text } from "@/components/Text";
import { TextInput } from '@/components/TextInput';
import { DatePicker } from '@/components/DatePicker';
import Pagination from '@/components/Pagination';
import { Table } from '@/components/Table';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
////////////
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation'
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';


const TextToSpeechOutputtexttospeech = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {  
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const actionDetails :any = {
  "action": {
    "lock": {
      "lockMode": "",
      "name": "",
      "ttl": ""
    },
    "stateTransition": {
      "sourceQueue": "",
      "sourceStatus": "",
      "targetQueue": "",
      "targetStatus": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "events": {}
  },
  "code": "",
  "rule": {},
  "events": {},
  "mapper": []
}
  const toast:any=useInfoMsg()
  const keyset:any=i18n.keyset("language"); 
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'texttospeech',type:""})
  const routes = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {firstgroupc08a7, setfirstgroupc08a7}= useContext(TotalContext) as TotalContextProps;
  const {firstgroupc08a7Props, setfirstgroupc08a7Props}= useContext(TotalContext) as TotalContextProps;
  const {button6c543, setbutton6c543}= useContext(TotalContext) as TotalContextProps;
  const {avatard99b3, setavatard99b3}= useContext(TotalContext) as TotalContextProps;
  const {radiogroupcf04e, setradiogroupcf04e}= useContext(TotalContext) as TotalContextProps;
  const {datepickerbe7c3, setdatepickerbe7c3}= useContext(TotalContext) as TotalContextProps;
  const {checkbox2289f, setcheckbox2289f}= useContext(TotalContext) as TotalContextProps;
  const {dropdown0e57d, setdropdown0e57d}= useContext(TotalContext) as TotalContextProps;
  const {upload2cc02, setupload2cc02}= useContext(TotalContext) as TotalContextProps;
  const {label9be35, setlabel9be35}= useContext(TotalContext) as TotalContextProps;
  const {card498e2, setcard498e2}= useContext(TotalContext) as TotalContextProps;
  const {imageeee6c, setimageeee6c}= useContext(TotalContext) as TotalContextProps;
  const {textinput56a48, settextinput56a48}= useContext(TotalContext) as TotalContextProps;
  const {icon0a30c, seticon0a30c}= useContext(TotalContext) as TotalContextProps;
  const {liste965e, setliste965e}= useContext(TotalContext) as TotalContextProps;
  const {pininput92978, setpininput92978}= useContext(TotalContext) as TotalContextProps;
  const {progress53986, setprogress53986}= useContext(TotalContext) as TotalContextProps;
  const {qrcoded45d1, setqrcoded45d1}= useContext(TotalContext) as TotalContextProps;
  const {radiobutton92d8e, setradiobutton92d8e}= useContext(TotalContext) as TotalContextProps;
  const {radio65f38, setradio65f38}= useContext(TotalContext) as TotalContextProps;
  const {speechtotextf8edf, setspeechtotextf8edf}= useContext(TotalContext) as TotalContextProps;
  const {texttospeech35a79, settexttospeech35a79}= useContext(TotalContext) as TotalContextProps;
  const {textf0149, settextf0149}= useContext(TotalContext) as TotalContextProps;
  const {switch4a6e4, setswitch4a6e4}= useContext(TotalContext) as TotalContextProps;
  const {textareaa5a38, settextareaa5a38}= useContext(TotalContext) as TotalContextProps;
  const {timepicker8a8fa, settimepicker8a8fa}= useContext(TotalContext) as TotalContextProps;
  const {signature63e12, setsignature63e12}= useContext(TotalContext) as TotalContextProps;
  const {sliderde96f, setsliderde96f}= useContext(TotalContext) as TotalContextProps;
  const {secondgroup311a5, setsecondgroup311a5}= useContext(TotalContext) as TotalContextProps;
  const {secondgroup311a5Props, setsecondgroup311a5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  

  const handleChange = async(value: any) => {
    await handleBlur();
    if(dynamicStateandType.type=="number"){
    setfirstgroupc08a7((prev: any) => ({ ...prev, texttospeech: +value }))
    }
    else{
    setfirstgroupc08a7((prev: any) => ({ ...prev, texttospeech: value }))
    }
  }
  const handleBlur=async () => {
    let code:any=``;
     if (code != '') {
      let codeStates: any = {}
      codeStates['firstgroup']  = firstgroupc08a7,
      codeStates['setfirstgroup'] = setfirstgroupc08a7,
      codeStates['secondgroup']  = secondgroup311a5,
      codeStates['setsecondgroup'] = setsecondgroup311a5,
    codeExecution(code,codeStates)
    }
  }

  useEffect(()=>{
    handleBlur()
  },[validateRefetch.value])

  if (texttospeech35a79?.isHidden) {
    return <></>
  }

  return (   
    <div 
      style={{gridColumn: `18 / 21`,gridRow: `232 / 258`, gap:``, height: `100%`, overflow: 'auto'}} >
      <TextToSpeech
        className=""
        // label={keyset("texttospeech")}
        needTooltip={true}  
        tooltipProps={{title:"Tooltip",placement:"top-start"}}
        headerPosition='top'
        headerText="Header"
        onUpdate= {handleChange}
        onBlur={()=>handleBlur()}
        // type={dynamicStateandType.type}
        value={firstgroupc08a7?.texttospeech||""}
        disabled= {texttospeech35a79?.isDisabled ? true : false}
        placeholder = 'Type Here...'      
      />
    </div>
        
  )
}

export default TextToSpeechOutputtexttospeech
