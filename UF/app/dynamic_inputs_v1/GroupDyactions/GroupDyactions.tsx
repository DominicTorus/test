

'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { CommonHeaderAndTooltip } from '@/components/CommonHeaderAndTooltip';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import ButtonReject  from "./ButtonReject";
import ButtonApprove  from "./ButtonApprove";
import ButtonReturn  from "./ButtonReturn";
import ButtonDelete  from "./ButtonDelete";
import ButtonModify  from "./ButtonModify";
import ButtonSave  from "./ButtonSave";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const GroupDyactions = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false}:any)=> {
  const token:string = getCookie('token'); 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  let code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
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
  "Empolyee": {
    "allowedControls": [
      "reject",
      "approve",
      "return",
      "delete",
      "modify",
      "save"
    ],
    "allowedGroups": [
      "canvas",
      "digroup",
      "dyactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template 2": {
    "allowedControls": [
      "reject",
      "approve",
      "return",
      "delete",
      "modify",
      "save"
    ],
    "allowedGroups": [
      "canvas",
      "digroup",
      "dyactions"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "JD": {
    "allowedControls": [
      "reject",
      "approve",
      "return",
      "delete",
      "modify",
      "save"
    ],
    "allowedGroups": [
      "canvas",
      "digroup",
      "dyactions"
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
  const [ButtonGoRuleData,setButtonGoRuleData]=useState<any>({})
 /////////////
   //another screen
  const {digroup04aa5, setdigroup04aa5}= useContext(TotalContext) as TotalContextProps;
  const {digroup04aa5Props, setdigroup04aa5Props}= useContext(TotalContext) as TotalContextProps;
  const {dyactions87a65, setdyactions87a65}= useContext(TotalContext) as TotalContextProps;
  const {dyactions87a65Props, setdyactions87a65Props}= useContext(TotalContext) as TotalContextProps;
  const {rejectbd33d, setrejectbd33d}= useContext(TotalContext) as TotalContextProps;
  const {approvef19e7, setapprovef19e7}= useContext(TotalContext) as TotalContextProps;
  const {return36894, setreturn36894}= useContext(TotalContext) as TotalContextProps;
  const {deletebad33, setdeletebad33}= useContext(TotalContext) as TotalContextProps;
  const {modifya17b9, setmodifya17b9}= useContext(TotalContext) as TotalContextProps;
  const {save69d9c, setsave69d9c}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG3:AFK:DynamicInputs:AFVK:v1",componentId:"08798caf18fc47de93b387b5ee287a65",from:"GroupDyactions",accessProfile:accessProfile},{
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
    if(orchestrationData?.data?.readableControls.includes("reject")){
      setrejectbd33d({...rejectbd33d,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("approve")){
      setapprovef19e7({...approvef19e7,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("return")){
      setreturn36894({...return36894,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("delete")){
      setdeletebad33({...deletebad33,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("modify")){
      setmodifya17b9({...modifya17b9,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("save")){
      setsave69d9c({...save69d9c,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['digroup']  = digroup04aa5,
      codeStates['setdigroup'] = setdigroup04aa5,
      codeStates['dyactions']  = dyactions87a65,
      codeStates['setdyactions'] = setdyactions87a65,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const dyactions87a65Ref = useRef<any>(null);
  const handleClearSearch = () => {
    dyactions87a65Ref.current?.setSearchParams();
    dyactions87a65Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(dyactions87a65) && Object.keys(dyactions87a65)?.length>0)
      {
        setdyactions87a65({})
      }
    }else 
      prevRefreshRef.current= true
  }, [dyactions87a65Props?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '2 / 24',
        gridRow: '139 / 168',
      
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
        overflow: 'auto',
        gridAutoRows: '4px',
        columnGap: '0px',
        backgroundColor:'',
        backgroundImage:"url('')",
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: ''
      }}
      className={`flex flex-col overflow-auto rounded-md  ${isDark ? 'text-white' : 'text-black'}`}
    >
        {        (("reject" in ButtonGoRuleData)?ButtonGoRuleData["reject"]:true) && 
          allowedControls.includes("reject")  ?            <ButtonReject lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {        (("approve" in ButtonGoRuleData)?ButtonGoRuleData["approve"]:true) && 
          allowedControls.includes("approve")  ?            <ButtonApprove lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {        (("return" in ButtonGoRuleData)?ButtonGoRuleData["return"]:true) && 
          allowedControls.includes("return")  ?            <ButtonReturn lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {        (("delete" in ButtonGoRuleData)?ButtonGoRuleData["delete"]:true) && 
          allowedControls.includes("delete")  ?            <ButtonDelete lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {        (("modify" in ButtonGoRuleData)?ButtonGoRuleData["modify"]:true) && 
          allowedControls.includes("modify")  ?            <ButtonModify lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {        (("save" in ButtonGoRuleData)?ButtonGoRuleData["save"]:true) && 
          allowedControls.includes("save")  ?            <ButtonSave lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
    </div>
 )
}

export default GroupDyactions
