'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { Grid } from "@gravity-ui/page-constructor";
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Magnifier,Xmark } from '@gravity-ui/icons'
import Groupcompanygroup  from "../Groupcompanygroup/Groupcompanygroup";
import Groupecom  from "../Groupecom/Groupecom";
import { Button, Icon, Modal } from '@gravity-ui/uikit'
import { eventBus } from '@/app/eventBus';
import CompanyCardcompany  from "./CompanyCardcompany";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useGlobal } from '@/context/GlobalContext';
import { getBorderRadiusClass } from '@/utils/branding';



const Groupgroup = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false}:any)=> {
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
      "company"
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
  const {company7395c, setcompany7395c}= useContext(TotalContext) as TotalContextProps;
  const {companygroup72d6d, setcompanygroup72d6d}= useContext(TotalContext) as TotalContextProps;
  const {companygroup72d6dProps, setcompanygroup72d6dProps}= useContext(TotalContext) as TotalContextProps;
  const {cgroupf48bf, setcgroupf48bf}= useContext(TotalContext) as TotalContextProps;
  const {cgroupf48bfProps, setcgroupf48bfProps}= useContext(TotalContext) as TotalContextProps;
  const {ecom231c9, setecom231c9}= useContext(TotalContext) as TotalContextProps;
  const {ecom231c9Props, setecom231c9Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1",componentId:"32cccc4278934d4cba94a6471941d56d",from:"GroupGroup",accessProfile:accessProfile},{
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
    if(orchestrationData?.data?.readableControls.includes("company")){
      setcompany7395c({...company7395c,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("companygroup")){
      setcompanygroup72d6d({...companygroup72d6d,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("ecom")){
      setecom231c9({...ecom231c9,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['group']  = group1d56d,
      codeStates['setgroup'] = setgroup1d56d,
      codeStates['companygroup']  = companygroup72d6d,
      codeStates['setcompanygroup'] = setcompanygroup72d6d,
      codeStates['cgroup']  = cgroupf48bf,
      codeStates['setcgroup'] = setcgroupf48bf,
      codeStates['ecom']  = ecom231c9,
      codeStates['setecom'] = setecom231c9,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const group1d56dRef = useRef<any>(null);
  const handleClearSearch = () => {
    group1d56dRef.current?.setSearchParams();
    group1d56dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(group1d56d) && Object.keys(group1d56d)?.length>0)
      {
        setgroup1d56d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [group1d56dProps?.refresh])

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
        gridRow: '4 / 283',
        height: '100%',
        overflow: 'auto',
        backgroundColor:'',
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
        {allowedComponent.includes("companygroup")  &&<Groupcompanygroup  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}        />}
        {allowedComponent.includes("ecom")  &&<Groupecom  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}
          encryptionFlagPageData={encryptionFlagPageData}
          paginationDetails={paginationDetails}        />}
        {securityData[accessProfile].allowedControls.includes("company") ?<CompanyCardcompany  /* 7395c */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
    </div>             
  )
}

export default Groupgroup
