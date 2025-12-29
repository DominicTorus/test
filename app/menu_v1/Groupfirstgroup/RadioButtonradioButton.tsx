'use client'
import i18n from '@/app/components/i18n';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import React, { useState,useContext,useEffect } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import { RadioButton } from '@/components/RadioButton';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { AxiosService } from "@/app/components/axiosService";


const RadioButtonradioButton = ({setCheckToAdd,encryptionFlagCompData}:any) => {
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  let readableControls :any = [];
  const [allCode,setAllCode]=useState<any>("");
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
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

  const handleMapperValue=async()=>{
  try{
    const orchestrationData: any = await AxiosService.post(
      '/UF/Orchestration',
      {
        key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:propsCheck:AFVK:v1",
        componentId: "c2cb1a49935b44419561e81deffc08a7",
        controlId: "63674a76c06c4bb9b13faaf347992d8e",
        isTable: false,
        from:"RadioButtonradioButton",
        accessProfile:accessProfile
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    if(orchestrationData?.data?.error == true){
      return;
    }
    setAllCode(orchestrationData?.data?.code);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    handleMapperValue();
    setfirstgroupc08a7((pre:any)=>({...pre,radiobutton:""}));
  },[radiobutton92d8e?.refresh])

  const options = [
      {value: 'True' ,content:'dfgd'},
      {value: 'False' ,content:'ghgfh'},
  ];
  const handleChange=(e:any)=>{
setfirstgroupc08a7((prev: any) => ({ ...prev, radiobutton: e}));
  }
  const handleBlur=(e:any)=>{
    let code: any = allCode;
      if (code == "") {
        //toast(code?.data?.errorDetails?.message, 'danger');
        //return
      }  else if (code != '') {
        let codeStates: any = {};
              codeStates['firstgroup']  = firstgroupc08a7,
              codeStates['setfirstgroup'] = setfirstgroupc08a7,
              codeStates['secondgroup']  = secondgroup311a5,
              codeStates['setsecondgroup'] = setsecondgroup311a5,
      codeExecution(code,codeStates);
      }
    }

  if (radiobutton92d8e?.isHidden) {
    return <></>
  }
  
  return (
    <div 
      className="" 
      style={{gridColumn: `2 / 6`,gridRow: `232 / 258`, gap:``, height: `100%`, overflow: 'auto'}} >
    <RadioButton 
      className=""
        // value={firstgroupc08a7?.radiobutton||""}
        contentAlign={"center"}
        needTooltip={true}  
        tooltipProps={{title:"Tooltip",placement:"top-start"}}
        headerText="Header"
        headerPosition="top"
        disabled= {radiobutton92d8e?.isDisabled ? true : false}
        defaultValue={options.length>0?options[0].value:""}
        items={options}       
        onChange={handleChange}
        onBlur={handleBlur}
    />
  </div>
  )
}

export default RadioButtonradioButton
