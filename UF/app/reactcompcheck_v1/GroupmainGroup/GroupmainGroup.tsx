

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
import ListlistDemo  from "./ListlistDemo";
import RadioButtonRbtn1  from "./RadioButtonRbtn1";
import AvatarUser1  from "./AvatarUser1";
import ButtonBtn1  from "./ButtonBtn1";
import Buttonbtn55  from "./Buttonbtn55";
import Buttonbtn66  from "./Buttonbtn66";
import CustomWidgetcustomW  from "./CustomWidgetcustomW";
import CustomWidgetwidget2  from "./CustomWidgetwidget2";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const GroupmainGroup = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false}:any)=> {
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
      "listdemo",
      "rbtn1",
      "user1",
      "btn1",
      "btn55",
      "btn66",
      "customw",
      "widget2"
    ],
    "allowedGroups": [
      "canvas",
      "maingroup"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "Template 2": {
    "allowedControls": [
      "listdemo",
      "rbtn1",
      "user1",
      "btn1",
      "btn55",
      "btn66",
      "customw",
      "widget2"
    ],
    "allowedGroups": [
      "canvas",
      "maingroup"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  },
  "JD": {
    "allowedControls": [
      "listdemo",
      "rbtn1",
      "user1",
      "btn1",
      "btn55",
      "btn66",
      "customw",
      "widget2"
    ],
    "allowedGroups": [
      "canvas",
      "maingroup"
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
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG3:AFK:reactComp:AFVK:v1",componentId:"dc0597ae1ca34218b1f97e27dd381e1f",from:"GroupMaingroup",accessProfile:accessProfile},{
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
    if(orchestrationData?.data?.readableControls.includes("listdemo")){
      setlistdemod14c2({...listdemod14c2,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("rbtn1")){
      setrbtn1862c0({...rbtn1862c0,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("user1")){
      setuser1fe47c({...user1fe47c,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("btn1")){
      setbtn1899aa({...btn1899aa,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("btn55")){
      setbtn55667eb({...btn55667eb,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("btn66")){
      setbtn6652747({...btn6652747,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("customw")){
      setcustomw7f3cd({...customw7f3cd,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("widget2")){
      setwidget2416c9({...widget2416c9,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['maingroup']  = maingroup81e1f,
      codeStates['setmaingroup'] = setmaingroup81e1f,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const maingroup81e1fRef = useRef<any>(null);
  const handleClearSearch = () => {
    maingroup81e1fRef.current?.setSearchParams();
    maingroup81e1fRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(maingroup81e1f) && Object.keys(maingroup81e1f)?.length>0)
      {
        setmaingroup81e1f({})
      }
    }else 
      prevRefreshRef.current= true
  }, [maingroup81e1fProps?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '2 / 24',
        gridRow: '18 / 414',
      
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
        {allowedControls.includes("listdemo") ?<ListlistDemo   /* d14c2 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("rbtn1")?<RadioButtonRbtn1  /* 862c0 */  checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {allowedControls.includes("user1")?<AvatarUser1 /* fe47c */ encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {        (("btn1" in ButtonGoRuleData)?ButtonGoRuleData["btn1"]:true) && 
          allowedControls.includes("btn1")  ?            <ButtonBtn1 lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {        (("btn55" in ButtonGoRuleData)?ButtonGoRuleData["btn55"]:true) && 
          allowedControls.includes("btn55")  ?            <Buttonbtn55 lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {        (("btn66" in ButtonGoRuleData)?ButtonGoRuleData["btn66"]:true) && 
          allowedControls.includes("btn66")  ?            <Buttonbtn66 lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>} 
        {allowedControls.includes("customw") ?<CustomWidgetcustomW /* 7f3cd */ encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("widget2") ?<CustomWidgetwidget2 /* 416c9 */ encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
    </div>
 )
}

export default GroupmainGroup
