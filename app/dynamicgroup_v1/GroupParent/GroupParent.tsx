'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { Grid } from "@gravity-ui/page-constructor";
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Magnifier,Xmark } from '@gravity-ui/icons'
  import Groupcontainer  from "../Groupcontainer/Groupcontainer";
  import GrouptableEcom  from "../GrouptableEcom/GrouptableEcom";
import { Button, Icon, Modal } from '@gravity-ui/uikit'
import { eventBus } from '@/app/eventBus';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const GroupParent = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
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
    "allowedControls": [],
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
  const {tableecom7ef45, settableecom7ef45}= useContext(TotalContext) as TotalContextProps;
  const {tableecom7ef45Props, settableecom7ef45Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("container")){
      setcontainer72d6d({...container72d6d,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("tableecom")){
      settableecom7ef45({...tableecom7ef45,isDisabled:true});
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

  const parent1d56dRef = useRef<any>(null);
  const handleClearSearch = () => {
    parent1d56dRef.current?.setSearchParams();
    parent1d56dRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(parent1d56d) && Object.keys(parent1d56d)?.length>0)
      {
        setparent1d56d({})
      }
    }else 
      prevRefreshRef.current= true
  }, [parent1d56dProps?.refresh])

  return (
  <div  
      style={{
        gridColumn: '1 / 13',
        gridRow: '4 / 236',
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
      className=" rounded-md "
      >
        {securityData[accessProfile]?.allowedGroups?.includes("container")  &&<Groupcontainer  
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
          encryptionFlagPageData={encryptionFlagPageData}        />}
        {securityData[accessProfile]?.allowedGroups?.includes("tableecom")  &&<GrouptableEcom  
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
          encryptionFlagPageData={encryptionFlagPageData}        />}
    </div>  
  )
}

export default GroupParent
