
'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TorusSpeechToTextInput } from '@/components/SpeechToText';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Text } from '@/components/Text';
import { Button } from '@/components/Button';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation'
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { te_eventEmitterDto, uf_ifoDto, uf_initiatePfDto } from '@/app/interfaces/interfaces';
import { eventFunction } from '@/app/utils/eventFunction';
import { Icon } from '@/components/Icon';



const SpeechToTextInputspeechtotext = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const prevRefreshRef = useRef(false);
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
  const [loading, setLoading] = useState(false);
  const toast:any=useInfoMsg()
  const keyset:any=i18n.keyset("language"); 
  let schemaArray :any =[]; 
  const [allCode,setAllCode]=useState<any>(""); 
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'speechtotext',type:"text"})
  const routes = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
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
  const {label33b92, setlabel33b92}= useContext(TotalContext) as TotalContextProps;
  const {imageeee6c, setimageeee6c}= useContext(TotalContext) as TotalContextProps;
  const {textinput56a48, settextinput56a48}= useContext(TotalContext) as TotalContextProps;
  const {icon0a30c, seticon0a30c}= useContext(TotalContext) as TotalContextProps;
  const {cardaf24d, setcardaf24d}= useContext(TotalContext) as TotalContextProps;
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
  

  const handleChange = async (newValue: any) => {
   if (firstgroupc08a7?.speechtotext !== newValue) {
    if(dynamicStateandType.type=="number"){
    setfirstgroupc08a7((prev: any) => ({ ...prev, speechtotext: +newValue }))
    }
    else{
    setfirstgroupc08a7((prev: any) => ({ ...prev, speechtotext: newValue }))
    }
  }    
  }
  const handleBlur=async () => {
    let code:any=allCode;
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
    if (prevRefreshRef.current) {
      handleBlur()
      }else 
    prevRefreshRef.current= true
  },[validateRefetch.value])


  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:propsCheck:AFVK:v1",
          componentId: "c2cb1a49935b44419561e81deffc08a7",
          controlId: "b9c8a60606994cc891f3106caddf8edf",
          isTable: false,
          from:"TextInputspeechtotext",
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
        let type:any={name:'speechtotext',type:'text'}
        type={
          name:'speechtotext',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.speechtotext.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.speechtotext.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.speechtotext.type
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
    setfirstgroupc08a7((pre:any)=>({...pre,speechtotext:""}));
  },[speechtotextf8edf?.refresh])
  
  if (speechtotextf8edf?.isHidden) {
    return <></>
  }

  return (   
    <div  
      style={{gridColumn: `13 / 16`,gridRow: `232 / 257`, gap:``, height: `100%`, overflow: 'auto'}} >
      <TorusSpeechToTextInput
      className=""
        onChange= {handleChange}
        onSearch={handleBlur}
        needTooltip={true}  
        tooltipProps={{title:"Tooltip",placement:"top-start"}}
        contentAlign={"left"}
      //  type={dynamicStateandType.type}
        value={firstgroupc08a7?.speechtotext||""}
        disabled= {speechtotextf8edf?.isDisabled ? true : false}
        placeholder = 'Type Here...'      
        headerPosition='top'
        headerText="Header"
      />
      <div style={{display:"flex",justifyContent:"center" ,alignItems:"center"}}>
      {loading ? <Icon size={20} data="FaSpinner" /> : "" }  
      </div>
    </div>
        
  )
}

export default SpeechToTextInputspeechtotext
