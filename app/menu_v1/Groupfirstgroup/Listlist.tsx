
'use client'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { codeExecution } from '@/app/utils/codeExecution';
import React, { useState,useEffect,useContext,useRef } from 'react'

import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useRouter } from 'next/navigation'
import {List, Modal} from '@gravity-ui/uikit';
import { eventBus } from '@/app/eventBus';

const Listlist = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
  const token:string = getCookie('token'); 
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const prevRefreshRef = useRef(false);
  const toast:any=useInfoMsg();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
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

  let items=[
  {
    "title": "sivam",
    "disabled": false,
    "group": false
  },
  {
    "title": "amrish",
    "disabled": false,
    "group": false
  },
  {
    "title": "dominic",
    "disabled": false,
    "group": false
  }
] ;

const handleonItemClick=async(value:any={})=>{
  setfirstgroupc4acb((prev: any) => ({ ...prev, list: value.title||"" }));
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:AllComponents:AFVK:v1",  componentId:"5909e18973e149f19bb5db9d38fc4acb",controlId:"252fe4f08d764e07aec22ebdbcbec3b4",isTable:false,accessProfile:accessProfile,from:"listList"},{
    headers: {
      Authorization: `Bearer ${token}`
  }})
   let code:any=orchestrationData?.data?.code;

    if (code != '') {
    let codeStates: any = {};
      codeStates['firstgroup']  = firstgroupc4acb,
      codeStates['setfirstgroup'] = setfirstgroupc4acb,
  codeExecution(code,codeStates);
  }
}

useEffect(() => {
  if (prevRefreshRef.current) {
    setfirstgroupc4acb((pre:any)=>({...pre,list:""}));
    handleonItemClick();
  }else 
  prevRefreshRef.current= true    
},[listec3b4?.refresh])

if (listec3b4?.isHidden) {
  return <></>;
}

return (
  <div 
    style={{gridColumn: `4 / 6`,gridRow: `188 / 223`, gap:``, height: `100%`, overflow: 'auto'}} >
    <List 
      className=""
      sortable={false}
      filterable={false}
      itemsHeight={0}
      items={items}
      onItemClick={value => handleonItemClick(value)}
      renderItem={(item:any) => {
        if (item.group) {
          return (
            <div className={'group'}>
              <div className={'select-text'}>{item.title}</div>
            </div>
          )
        }
        return (
          <div className={'select'}>
            <div className={'select-text'}>{item.title}</div>
          </div>
        )
      }}
    />
  </div>
  )
}

export default Listlist
