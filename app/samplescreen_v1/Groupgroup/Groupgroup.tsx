'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { Grid } from "@gravity-ui/page-constructor";
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Magnifier,Xmark } from '@gravity-ui/icons'
import { Button, Icon, Modal } from '@gravity-ui/uikit'
import { eventBus } from '@/app/eventBus';
import Iconicon  from "./Iconicon";
import TextInputphone  from "./TextInputphone";
import Radioradio  from "./Radioradio";
import TextInputtextInut  from "./TextInputtextInut";
import Switchswitch  from "./Switchswitch";
import DropdowndropDown  from "./DropdowndropDown";
import TextInputemail  from "./TextInputemail";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';


const Groupgroup = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false}:any)=> {
  const token:string = getCookie('token'); 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let code:any = ``;
  const encryptionFlagComp: boolean = encryptionFlagPageData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagPageData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagPageData?.method;
  let encryptionFlagCompData :any ={
    "flag":encryptionFlagComp,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  };
  const securityData:any={
  "Employee": {
    "allowedControls": [
      "icon",
      "phone",
      "radio",
      "textinut",
      "switch",
      "dropdown",
      "email"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "table",
      "employee"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "user": {
    "allowedControls": [
      "icon",
      "phone",
      "radio",
      "textinut",
      "switch",
      "dropdown",
      "email"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "table",
      "employee"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
 /////////////
   //another screen
  const {group2911c, setgroup2911c}= useContext(TotalContext) as TotalContextProps;
  const {group2911cProps, setgroup2911cProps}= useContext(TotalContext) as TotalContextProps;
  const {icone5068, seticone5068}= useContext(TotalContext) as TotalContextProps;
  const {phonedeef3, setphonedeef3}= useContext(TotalContext) as TotalContextProps;
  const {radioedaba, setradioedaba}= useContext(TotalContext) as TotalContextProps;
  const {textinut187a8, settextinut187a8}= useContext(TotalContext) as TotalContextProps;
  const {switch23709, setswitch23709}= useContext(TotalContext) as TotalContextProps;
  const {dropdown32403, setdropdown32403}= useContext(TotalContext) as TotalContextProps;
  const {emailda9f0, setemailda9f0}= useContext(TotalContext) as TotalContextProps;
  const {table77086, settable77086}= useContext(TotalContext) as TotalContextProps;
  const {table77086Props, settable77086Props}= useContext(TotalContext) as TotalContextProps;
  const {employee03307, setemployee03307}= useContext(TotalContext) as TotalContextProps;
  const {employee03307Props, setemployee03307Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:SampleScreen:AFVK:v1",componentId:"3ba85417fe05446aa44c2198d522911c",from:"GroupGroup",accessProfile:accessProfile},{
    headers: {
      Authorization: `Bearer ${token}`
    }})
  code = orchestrationData?.data?.code;
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("icon")){
      seticone5068({...icone5068,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("phone")){
      setphonedeef3({...phonedeef3,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("radio")){
      setradioedaba({...radioedaba,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("textinut")){
      settextinut187a8({...textinut187a8,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("switch")){
      setswitch23709({...switch23709,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("dropdown")){
      setdropdown32403({...dropdown32403,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("email")){
      setemailda9f0({...emailda9f0,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['group']  = group2911c,
      codeStates['setgroup'] = setgroup2911c,
      codeStates['table']  = table77086,
      codeStates['settable'] = settable77086,
      codeStates['employee']  = employee03307,
      codeStates['setemployee'] = setemployee03307,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const group2911cRef = useRef<any>(null);
  const handleClearSearch = () => {
    group2911cRef.current?.setSearchParams();
    group2911cRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group2911c) && Object.keys(group2911c)?.length>0)
      {
        setgroup2911c({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group2911cProps?.refresh])

  return (
    <div 
      style={{
        gridAutoRows: '4px',
        columnGap: '4px',
        rowGap: '4px',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        gridColumn: '1 / 13',
        gridRow: '1 / 47',
        height: '100%',
        overflow: 'auto',
        backgroundColor:'#ffffff',
        backgroundImage:'',
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'space',
        backgroundAttachment: 'fixed',
        backgroundClip: 'content-box',
        backgroundBlendMode: 'multiply'
      }}
      className="border border-slate-300 rounded-md "
    >
        {allowedControls.includes("icon")?<Iconicon /* e5068 */ encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {allowedControls.includes("phone") ?<TextInputphone   /* deef3 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("radio")?<Radioradio  /* edaba */  checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {allowedControls.includes("textinut") ?<TextInputtextInut   /* 187a8 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("switch")?<Switchswitch  /* 23709 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("dropdown") ?<DropdowndropDown   /* 32403 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("email") ?<TextInputemail   /* da9f0 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
    </div>             
  )
}

export default Groupgroup
