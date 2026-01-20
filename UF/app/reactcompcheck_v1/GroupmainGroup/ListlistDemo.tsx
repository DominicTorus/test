
'use client'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { codeExecution } from '@/app/utils/codeExecution';
import React, { useState,useEffect,useContext,useRef } from 'react';
import { List } from '@/components/List';
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import evaluateDecisionTable from '@/app/utils/evaluateDecisionTable';
import decodeToken from '@/app/components/decodeToken';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { useRouter } from 'next/navigation'
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';

const ListlistDemo = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
  const token:string = getCookie('token'); 
  const decodedTokenObj: any = decodeToken(token);
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
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
  const {maingroup81e1f, setmaingroup81e1f}= useContext(TotalContext) as TotalContextProps;
  const {maingroup81e1fProps, setmaingroup81e1fProps}= useContext(TotalContext) as TotalContextProps;
  const {listdemod14c2, setlistdemod14c2}= useContext(TotalContext) as TotalContextProps;
  const {rbtn1862c0, setrbtn1862c0}= useContext(TotalContext) as TotalContextProps;
  const {user1fe47c, setuser1fe47c}= useContext(TotalContext) as TotalContextProps;
  const {btn1899aa, setbtn1899aa}= useContext(TotalContext) as TotalContextProps;
  const {btn55667eb, setbtn55667eb}= useContext(TotalContext) as TotalContextProps;
  const {btn6652747, setbtn6652747}= useContext(TotalContext) as TotalContextProps;
  const {customw7f3cd, setcustomw7f3cd}= useContext(TotalContext) as TotalContextProps;
  const {widget2416c9, setwidget2416c9}= useContext(TotalContext) as TotalContextProps;
  //////////////

  let items=[
  {
    "title": "Home",
    "disabled": false,
    "group": false
  },
  {
    "title": "File",
    "disabled": false,
    "group": false
  },
  {
    "title": "Delete",
    "disabled": false,
    "group": false
  }
] ;

let dataItems = items

const handleonItemClick=async(value:any={})=>{
    const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG3:AFK:reactComp:AFVK:v1",  componentId:"dc0597ae1ca34218b1f97e27dd381e1f",controlId:"4501a874bb5b4c3e9c11b96f4cfd14c2",isTable:false,accessProfile:accessProfile,from:"listlistDemo"},{
    headers: {
      Authorization: `Bearer ${token}`
  }})
   let code:any=orchestrationData?.data?.code;

    if (code != '') {
    let codeStates: any = {};
      codeStates['maingroup']  = maingroup81e1f,
      codeStates['setmaingroup'] = setmaingroup81e1f,
  codeExecution(code,codeStates);
  }
  setmaingroup81e1f((prev: any) => ({ ...prev, listdemo: value||"" }));
}

useEffect(() => {
  if (prevRefreshRef.current) {
    setmaingroup81e1f((pre:any)=>({...pre,listdemo:""}));
    handleonItemClick();
  }else 
  prevRefreshRef.current= true    
},[listdemod14c2?.refresh])

if (listdemod14c2?.isHidden) {
  return <></>;
}

return (
  <div 
    style={{gridColumn: `2 / 4`,gridRow: `29 / 85`, gap:``, height: `100%`, overflow: 'auto'}} >
    <List 
      className=""
      sortable={true}
      filterable={true}
      items={dataItems}
      onItemClick={value => handleonItemClick(value?.title)}
      contentAlign='center'
    />
  </div>
  )
}

export default ListlistDemo
