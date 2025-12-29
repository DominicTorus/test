

'use client'
import React, { useContext, useEffect,useState } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import DocumentUploader from '@/components/DocumentUploader';
import { codeExecution } from '@/app/utils/codeExecution';
import { Text } from '@/components/Text';

const Documentuploaderupload = ({checkToAdd,setCheckToAdd,refetch,setRefetch}:any) => {
  let code:any = "";
  let customCode:any;
  const handleCustomCode=async () => {
    if (code != '') {
      let codeStates: any = {};
      codeStates['firstgroup']  = firstgroupc08a7,
      codeStates['setfirstgroup'] = setfirstgroupc08a7,
      codeStates['secondgroup']  = secondgroup311a5,
      codeStates['setsecondgroup'] = setsecondgroup311a5,
      customCode = codeExecution(code,codeStates);
    }
  }
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
  const handleClick = async (file:any) => {
    setfirstgroupc08a7((prev: any) => ({ ...prev, upload: file }))
  handleCustomCode()
  }

  if (upload2cc02?.isHidden) {
    return <></>
  }

  return (
    <div    
      style={{gridColumn: `8 / 11`,gridRow: `63 / 89`, gap:``, height: `100%`, overflow: 'auto'}} >
      <DocumentUploader
        className=""
        id="upload2cc02"
        value={firstgroupc08a7.upload}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 1 // 1MB
        }}
        needTooltip={true}  
        tooltipProps={{title:"Tooltip",placement:"top-end"}}
        contentAlign={"center"}
        headerPosition='top'
        headerText="Header"
        onChange={handleClick}
        preview={true}
        draggable={true}
        singleSelect={false}
        viewType="modal"
        DbType={"DB"}
        enableEncryption={"true"}
        fileNamingPreference={"use_system_generated_name"}
      />
    </div>
  )
}

export default Documentuploaderupload





