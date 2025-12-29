'use client'
import React, {useEffect, useContext,useState } from 'react' 
import { getCookie } from '@/app/components/cookieMgment';
import { AxiosService } from "@/app/components/axiosService";
import { Progress } from '@/components/Progress';
import { Text } from '@/components/Text';
import { Modal } from "@/components/Modal";
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { TotalContext, TotalContextProps } from '@/app/globalContext';

const Progressprogress = ({encryptionFlagCompData, isDynamic, index, item}:any) => {
  const {, set} = useContext(TotalContext) as TotalContextProps; 
  const allCode:any = "";
  let customCode:any=""

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
  const handleCustomCode=async () => {
    let code :any = allCode;
    if (code != '') {
      let codeStates: any = {};
      codeStates['firstgroup']  = firstgroupc08a7,
      codeStates['setfirstgroup'] = setfirstgroupc08a7,
      codeStates['secondgroup']  = secondgroup311a5,
      codeStates['setsecondgroup'] = setsecondgroup311a5,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  useEffect(()=>{
    let temp:any = [0]?.progress
    if (typeof temp != 'number') {
      temp = 0
    } else {
      if (temp < 100) {
        temp = temp
      } else if (100 <= temp && temp < 1000) {
        temp = temp / 10
      }
    }
    setfirstgroupc08a7((pre:any)=>({...pre,progress:temp}))
    handleCustomCode()
  },[progress53986?.refresh])
  if (progress53986?.isHidden) {
    return <></>
  }
return (
  <div 
className="top "    style={{gridColumn: `13 / 16`,gridRow: `153 / 179`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Progress 
      className=""
        needTooltip={true}  
        tooltipProps={{title:"Tooltip",placement:"top-start"}}
        headerPosition='top'
        headerText="Header"
        theme = {'success'}

        value = {isDynamic ? item?.progress : (firstgroupc08a7?.progress || 0)}
    />
  </div>
  )
}

export default Progressprogress
