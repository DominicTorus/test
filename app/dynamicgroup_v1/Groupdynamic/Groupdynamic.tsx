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
import Textnamedf  from "./Textnamedf";
import Textplandf  from "./Textplandf";
import Textindustrydf  from "./Textindustrydf";
import Textemployeedf  from "./Textemployeedf";
import Textlocationdf  from "./Textlocationdf";
import Textrevenue  from "./Textrevenue";
import Textrevenuedf  from "./Textrevenuedf";
import Buttonviewdetails  from "./Buttonviewdetails";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupdynamic = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
  const token:string = getCookie('token'); 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {dfd_carddoc_v1Props, setdfd_carddoc_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "namedf",
      "plandf",
      "industrydf",
      "employeedf",
      "locationdf",
      "revenue",
      "revenuedf",
      "viewdetails"
    ],
    "allowedGroups": [
      "canvas",
      "parent",
      "container",
      "dynamic",
      "tableecom"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
 /////////////
   //another screen
  const {parent1d56d, setparent1d56d}= useContext(TotalContext) as TotalContextProps;
  const {parent1d56dProps, setparent1d56dProps}= useContext(TotalContext) as TotalContextProps;
  const {container72d6d, setcontainer72d6d}= useContext(TotalContext) as TotalContextProps;
  const {container72d6dProps, setcontainer72d6dProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamic9403b, setdynamic9403b}= useContext(TotalContext) as TotalContextProps;
  const {dynamic9403bProps, setdynamic9403bProps}= useContext(TotalContext) as TotalContextProps;
  const {namedf0caad, setnamedf0caad}= useContext(TotalContext) as TotalContextProps;
  const {namedf0caadProps, setnamedf0caadProps}= useContext(TotalContext) as TotalContextProps;
  const {plandf36f3e, setplandf36f3e}= useContext(TotalContext) as TotalContextProps;
  const {plandf36f3eProps, setplandf36f3eProps}= useContext(TotalContext) as TotalContextProps;
  const {industrydf5679e, setindustrydf5679e}= useContext(TotalContext) as TotalContextProps;
  const {industrydf5679eProps, setindustrydf5679eProps}= useContext(TotalContext) as TotalContextProps;
  const {employeedfb0755, setemployeedfb0755}= useContext(TotalContext) as TotalContextProps;
  const {employeedfb0755Props, setemployeedfb0755Props}= useContext(TotalContext) as TotalContextProps;
  const {locationdf8b23d, setlocationdf8b23d}= useContext(TotalContext) as TotalContextProps;
  const {locationdf8b23dProps, setlocationdf8b23dProps}= useContext(TotalContext) as TotalContextProps;
  const {revenue95787, setrevenue95787}= useContext(TotalContext) as TotalContextProps;
  const {revenue95787Props, setrevenue95787Props}= useContext(TotalContext) as TotalContextProps;
  const {revenuedfbd405, setrevenuedfbd405}= useContext(TotalContext) as TotalContextProps;
  const {revenuedfbd405Props, setrevenuedfbd405Props}= useContext(TotalContext) as TotalContextProps;
  const {viewdetails50348, setviewdetails50348}= useContext(TotalContext) as TotalContextProps;
  const {viewdetails50348Props, setviewdetails50348Props}= useContext(TotalContext) as TotalContextProps;
  const {tableecom7ef45, settableecom7ef45}= useContext(TotalContext) as TotalContextProps;
  const {tableecom7ef45Props, settableecom7ef45Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("namedf")){
      setnamedf0caad({...namedf0caad,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("plandf")){
      setplandf36f3e({...plandf36f3e,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("industrydf")){
      setindustrydf5679e({...industrydf5679e,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("employeedf")){
      setemployeedfb0755({...employeedfb0755,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("locationdf")){
      setlocationdf8b23d({...locationdf8b23d,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("revenue")){
      setrevenue95787({...revenue95787,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("revenuedf")){
      setrevenuedfbd405({...revenuedfbd405,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("viewdetails")){
      setviewdetails50348({...viewdetails50348,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['parent']  = parent1d56d,
      codeStates['setparent'] = setparent1d56d,
      codeStates['container']  = container72d6d,
      codeStates['setcontainer'] = setcontainer72d6d,
      codeStates['dynamic']  = dynamic9403b,
      codeStates['setdynamic'] = setdynamic9403b,
      codeStates['tableecom']  = tableecom7ef45,
      codeStates['settableecom'] = settableecom7ef45,

    codeExecution(code,codeStates);
    } 
  }


  const handleOnload=()=>{
  }
  const handleOnChange=()=>{
  }

  const dynamic9403bRef = useRef<any>(null);
  const handleClearSearch = () => {
    dynamic9403bRef.current?.setSearchParams();
    dynamic9403bRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(dynamic9403b) && Object.keys(dynamic9403b)?.length>0)
      {
        setdynamic9403b({})
      }
    }else 
      prevRefreshRef.current= true
  }, [dynamic9403bProps?.refresh])

  return (
  <div  
      style={{
        gridColumn: '2 / 6',
        gridRow: '9 / 108',
        gridAutoRows: '4px',
        columnGap: '0px',
        rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
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
      className="border border-gray-400 shadow-sm m3 rounded-md "
      >
          {securityData[accessProfile].allowedControls.includes("namedf") ?<Textnamedf   /* 0caad */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("plandf") ?<Textplandf   /* 36f3e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("industrydf") ?<Textindustrydf   /* 5679e */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("employeedf") ?<Textemployeedf   /* b0755 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("locationdf") ?<Textlocationdf   /* 8b23d */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("revenue") ?<Textrevenue   /* 95787 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("revenuedf") ?<Textrevenuedf   /* bd405 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("viewdetails")  ?<Buttonviewdetails lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}          
    </div>  
  )
}

export default Groupdynamic
