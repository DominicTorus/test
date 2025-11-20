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
import Tableecom  from './Tableecom';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useGlobal } from '@/context/GlobalContext';
import { getBorderRadiusClass } from '@/utils/branding';


const Groupecom = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false}:any)=> {
  const token:string = getCookie('token');
  const { theme, branding, direction, language } = useGlobal();
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;

  // Theme-based styling
  const isDark = theme === "dark" || theme === "dark-hc";
  const backgroundColor = isDark ? "#1F2937" : "#FFFFFF";
  const textColor = isDark ? "#F9FAFB" : "#111827";
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
      "t_id",
      "t_name",
      "trs_status",
      "view"
    ],
    "allowedGroups": [
      "canvas",
      "group",
      "companygroup",
      "cgroup",
      "ecom"
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
  const {group1d56d, setgroup1d56d}= useContext(TotalContext) as TotalContextProps;
  const {group1d56dProps, setgroup1d56dProps}= useContext(TotalContext) as TotalContextProps;
  const {companygroup72d6d, setcompanygroup72d6d}= useContext(TotalContext) as TotalContextProps;
  const {companygroup72d6dProps, setcompanygroup72d6dProps}= useContext(TotalContext) as TotalContextProps;
  const {cgroupf48bf, setcgroupf48bf}= useContext(TotalContext) as TotalContextProps;
  const {cgroupf48bfProps, setcgroupf48bfProps}= useContext(TotalContext) as TotalContextProps;
  const {ecom231c9, setecom231c9}= useContext(TotalContext) as TotalContextProps;
  const {ecom231c9Props, setecom231c9Props}= useContext(TotalContext) as TotalContextProps;
  const {t_idb9088, sett_idb9088}= useContext(TotalContext) as TotalContextProps;
  const {t_namefbecd, sett_namefbecd}= useContext(TotalContext) as TotalContextProps;
  const {trs_status2a19e, settrs_status2a19e}= useContext(TotalContext) as TotalContextProps;
  const {viewab0b7, setviewab0b7}= useContext(TotalContext) as TotalContextProps;
  const {time96133, settime96133}= useContext(TotalContext) as TotalContextProps;
  const {time96133Props, settime96133Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1",componentId:"55e7abcbeac94084a4a55c14763231c9",from:"GroupEcom",isTable : true,accessProfile:accessProfile},{
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
    if(orchestrationData?.data?.readableControls.includes("t_id")){
      sett_idb9088({...t_idb9088,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("t_name")){
      sett_namefbecd({...t_namefbecd,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("trs_status")){
      settrs_status2a19e({...trs_status2a19e,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("view")){
      setviewab0b7({...viewab0b7,isDisabled:true});
    }
  //////////////
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const ecom231c9Ref = useRef<any>(null);
  const handleClearSearch = () => {
    ecom231c9Ref.current?.setSearchParams();
    ecom231c9Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(ecom231c9) && Object.keys(ecom231c9)?.length>0)
      {
        setecom231c9({})
      }
    }else 
      prevRefreshRef.current= true
  }, [ecom231c9Props?.refresh])

  return (
    <div
      style={{
        gridAutoRows: '4px',
        columnGap: '0px',
        rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        gridColumn: '1 / 13',
        gridRow: '195 / 271',
        height: '100%',
        overflow: 'auto',
        backgroundColor: backgroundColor,
        color: textColor,
        backgroundImage:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`${getBorderRadiusClass(branding.borderRadius)} ${direction === 'RTL' ? 'rtl' : 'ltr'}`}
      dir={direction}
    >
        {<Tableecom lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} paginationDetails={paginationDetails} open={open} setOpen={setOpen} ref={ecom231c9Ref}/>}
    </div>             
  )
}

export default Groupecom
