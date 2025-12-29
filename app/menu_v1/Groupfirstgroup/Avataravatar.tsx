

'use client'
import React, { useState,useContext,useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { Avatar } from "@/components/Avatar";
import { codeExecution } from '@/app/utils/codeExecution'
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'

const Avataravatar =  ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any)=> { 
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const token:string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const [allCode,setAllCode]=useState<any>("");
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

  const handleCode=async () => {
    let code:any;
    const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:propsCheck:AFVK:v1",  componentId:"c2cb1a49935b44419561e81deffc08a7",controlId:"f4f96f2f8a1d4b95b48d80fc9eed99b3",isTable:false,accessProfile:accessProfile,from:"avataravatar"},{
      headers: {
        Authorization: `Bearer ${token}`
    }})
    code=orchestrationData?.data?.code
    if (code == '') {
      //toast(code?.message, 'danger')
      //return
    }  else if (code != '') {
        let codeStates: any = {}
            codeStates['firstgroup']  = firstgroupc08a7,
            codeStates['setfirstgroup'] = setfirstgroupc08a7,
            codeStates['secondgroup']  = secondgroup311a5,
            codeStates['setsecondgroup'] = setsecondgroup311a5,
      codeExecution(code,codeStates)
    }
  }

  useEffect(() => {
    setfirstgroupc08a7((pre:any)=>({...pre,avatar:""}));
    handleCode()
  }, [avatard99b3?.refresh])

  if (avatard99b3?.isHidden) {
    return <></>
  } 

  return (
    <div 
      className="" 
      style={{gridColumn: `8 / 11`,gridRow: `18 / 46`, gap:``, height: `100%`, overflow: 'auto'}}>
      <Avatar
        className=""
        icon="Md10Mp"
        text="sivam"
        view="filled"
        theme="brand"
        needTooltip={true}  
        tooltipProps={{title:"Tooltip",placement:"top-start"}}
        contentAlign={"left"}
        headerText="Avatar"
        headerPosition="top"
      />
  </div>
  )
}

export default Avataravatar
