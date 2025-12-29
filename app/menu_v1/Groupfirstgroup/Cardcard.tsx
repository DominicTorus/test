'use client'
import React, { useState, useContext, useEffect, useRef } from 'react' 
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { Modal } from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { getCookie } from '@/app/components/cookieMgment';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';

const Cardcard = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;  
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const prevRefreshRef = useRef(false);
 
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
  const {label9be35, setlabel9be35}= useContext(TotalContext) as TotalContextProps  
  const {card498e2, setcard498e2}= useContext(TotalContext) as TotalContextProps  
  const {imageeee6c, setimageeee6c}= useContext(TotalContext) as TotalContextProps  
  const {textinput56a48, settextinput56a48}= useContext(TotalContext) as TotalContextProps  
  const {icon0a30c, seticon0a30c}= useContext(TotalContext) as TotalContextProps  
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
  

  const handleClick=async(value:any)=>{
   }


  useEffect(() => {
    setfirstgroupc08a7((pre:any)=>({...pre,card:""}));
  },[card498e2?.refresh])

  const style = {    
    display: 'flex',
    //boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  if (card498e2?.isHidden) {
    return <></>
  }  
  return (
    <div 
    style={{gridColumn: `13 / 16`,gridRow: `111 / 136`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Card 
        style={style}
        className=""
        theme="success"
        view="filled"
        icon="Md10Mp"
        prefixValue="card"
        disabled= {card498e2?.isDisabled ? true : false}
        onClick={handleClick}  
        needTooltip={true}  
        tooltipProps={{title:"Tooltip",placement:"top-start"}}
        contentAlign={"center"}
        headerPosition='top'
        headerText="Header"
        >
₹{firstgroupc08a7?.card?firstgroupc08a7?.card:"0"}
      </Card>
      </div>
  )
}

export default Cardcard
