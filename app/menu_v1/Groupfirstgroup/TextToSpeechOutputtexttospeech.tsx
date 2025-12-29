'use client'
import React, { useState,useContext,useEffect } from 'react'
import { TorusTextToSpeechOutput } from '@/app/TorusComponents/TextToSpeechOutput';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Button,Text } from "@gravity-ui/uikit";
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation'
import {Modal} from '@gravity-ui/uikit';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';


const TextToSpeechOutputtexttospeech = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
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
  const toast:any=useInfoMsg();
  const keyset:any=i18n.keyset("language"); 
  const [allCode,setAllCode]=useState<any>(""); 
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'texttospeech',type:"text"});
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
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
  

  const handleChange = async(e: any) => {
    await handleBlur();
    if(dynamicStateandType.type=="number"){
    setfirstgroupc4acb((prev: any) => ({ ...prev, texttospeech: +e.target.value }))
    }
    else{
    setfirstgroupc4acb((prev: any) => ({ ...prev, texttospeech: e.target.value }))
    }
  }
  const handleBlur=async () => {
    let code:any= allCode;
     if (code != '') {
      let codeStates: any = {}
      codeStates['firstgroup']  = firstgroupc4acb,
      codeStates['setfirstgroup'] = setfirstgroupc4acb,
    codeExecution(code,codeStates)
    }
  }

  useEffect(()=>{
    handleBlur()
  },[validateRefetch.value])

  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:AllComponents:AFVK:v1",
          componentId: "5909e18973e149f19bb5db9d38fc4acb",
          controlId: "20eb5085198a49d8a9cb205e91163351",
          isTable: false,
          from:"TextInputtexttospeech",
          accessProfile:accessProfile
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(orchestrationData?.data?.error == true){
       
        return
      }
      setAllCode(orchestrationData?.data?.code)
      
      if(orchestrationData?.data?.schemaData){
      if(orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'texttospeech',type:'text'}
        type={
          name:'texttospeech',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.texttospeech.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.texttospeech.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.texttospeech.type
        }
        setDynamicStateandType(type);       
      }
    }
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    handleMapperValue();
    setfirstgroupc4acb((pre:any)=>({...pre,texttospeech:""}));
  },[texttospeech63351?.refresh])

  if (texttospeech63351?.isHidden) {
    return <></>
  }

  return (   
    <div 
      style={{gridColumn: `4 / 6`,gridRow: `264 / 295`, gap:``, height: `100%`, overflow: 'auto'}} >
      <TorusTextToSpeechOutput
        className=""
        // label={keyset("texttospeech")}
        onChange= {handleChange}
        onBlur={()=>handleBlur()}
        // type={dynamicStateandType.type}
        value={firstgroupc4acb?.texttospeech||""}
        disabled= {texttospeech63351?.isDisabled ? true : false}
        placeholder = 'Type here...'      
      />
    </div>
        
  )
}

export default TextToSpeechOutputtexttospeech
