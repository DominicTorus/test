
'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Slider } from "@/components/Slider";
import { Text } from "@/components/Text";
import { Button } from '@/components/Button';
import { Modal } from "@/components/Modal";
import i18n from '@/app/components/i18n';
import { useRouter } from 'next/navigation';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';

    
const Sliderslider = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  let code:any="";
  const prevRefreshRef = useRef(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const toast:any=useInfoMsg();
  const routes = useRouter();
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
  const keyset:any=i18n.keyset("language");

  useEffect(() => { 
    setfirstgroupc08a7((pre:any)=>({...pre,slider:""}))
  },[sliderde96f?.refresh])

  const handleChange = async(newValue: number) => {
    setfirstgroupc08a7((prev: any) => ({ ...prev, slider: newValue}));
  }
  const handleBlur=async(e:any)=>{
     if (code != '') {
      let codeStates: any = {};
            codeStates['firstgroup']  = firstgroupc08a7,
            codeStates['setfirstgroup'] = setfirstgroupc08a7,
            codeStates['secondgroup']  = secondgroup311a5,
            codeStates['setsecondgroup'] = setsecondgroup311a5,
      codeExecution(code,codeStates);
    }
  }

  if (sliderde96f?.isHidden) {
    return <></>
  }
return (   
  <div 
    style={{gridColumn: `8 / 11`,gridRow: `321 / 338`, gap:``, height: `100%`, overflow: 'auto',paddingTop: '30px'}}>


    <Slider
      className=""
      onChange={handleChange}
      onBlur={handleBlur}
      value={typeof firstgroupc08a7?.slider=='number' ? firstgroupc08a7?.slider:0}
      min = {0}
      max = {100}
      step = {10}
      disabled= {sliderde96f?.isDisabled ? true : false}
      tooltipDisplay='off'
      needTooltip={true}  
      tooltipProps={{title:"Tooltip",placement:"top-start"}}
      headerPosition='top'
      headerText="Header"
      showValue={true}
      valueLabel="slider"
      />
    </div>
        
  )
}

export default Sliderslider
