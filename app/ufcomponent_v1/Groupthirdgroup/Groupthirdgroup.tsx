'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { Grid } from "@gravity-ui/page-constructor";
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Magnifier,Xmark } from '@gravity-ui/icons'
import { Modal } from '@gravity-ui/uikit'
import { Button } from '@/components/Button'
import { Icon } from '@/components/Icon'
import { eventBus } from '@/app/eventBus';
import Texttext  from "./Texttext";
import Dropdowndropdown  from "./Dropdowndropdown";
import Dropdowndropdown2  from "./Dropdowndropdown2";
import Dropdowncountry  from "./Dropdowncountry";
import Dropdownstate  from "./Dropdownstate";
import Dropdowncity  from "./Dropdowncity";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';


const Groupthirdgroup = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false}:any)=> {
  const token:string = getCookie('token'); 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let code:any = ``;
  let idx = ""
  let item = ""
  const {dfd_code_description_v1Props, setdfd_code_description_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_country_dropdown_v1Props, setdfd_country_dropdown_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_state_dropdown_v1Props, setdfd_state_dropdown_v1Props} = useContext(TotalContext) as TotalContextProps;
  const {dfd_city_dropdown_v1Props, setdfd_city_dropdown_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "text",
      "dropdown",
      "dropdown2",
      "country",
      "state",
      "city"
    ],
    "allowedGroups": [
      "canvas",
      "thirdgroup"
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
  const {thirdgroup01a8f, setthirdgroup01a8f}= useContext(TotalContext) as TotalContextProps;
  const {thirdgroup01a8fProps, setthirdgroup01a8fProps}= useContext(TotalContext) as TotalContextProps;
  const {text6135a, settext6135a}= useContext(TotalContext) as TotalContextProps;
  const {dropdownd94a5, setdropdownd94a5}= useContext(TotalContext) as TotalContextProps;
  const {dropdown22adf7, setdropdown22adf7}= useContext(TotalContext) as TotalContextProps;
  const {country2049a, setcountry2049a}= useContext(TotalContext) as TotalContextProps;
  const {statec9a9f, setstatec9a9f}= useContext(TotalContext) as TotalContextProps;
  const {city6363b, setcity6363b}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:UFcomponent:AFVK:v1",componentId:"1c858b3ff88541ecbbf912bf99201a8f",from:"GroupThirdgroup",accessProfile:accessProfile},{
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
    if(orchestrationData?.data?.readableControls.includes("text")){
      settext6135a({...text6135a,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("dropdown")){
      setdropdownd94a5({...dropdownd94a5,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("dropdown2")){
      setdropdown22adf7({...dropdown22adf7,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("country")){
      setcountry2049a({...country2049a,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("state")){
      setstatec9a9f({...statec9a9f,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("city")){
      setcity6363b({...city6363b,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['thirdgroup']  = thirdgroup01a8f,
      codeStates['setthirdgroup'] = setthirdgroup01a8f,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const thirdgroup01a8fRef = useRef<any>(null);
  const handleClearSearch = () => {
    thirdgroup01a8fRef.current?.setSearchParams();
    thirdgroup01a8fRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(thirdgroup01a8f) && Object.keys(thirdgroup01a8f)?.length>0)
      {
        setthirdgroup01a8f({})
      }
    }else 
      prevRefreshRef.current= true
  }, [thirdgroup01a8fProps?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 13',
        gridRow: '8 / 108',
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
          {allowedControls.includes("text") ?<Texttext   /* 6135a */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("dropdown") ?<Dropdowndropdown   /* d94a5 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("dropdown2") ?<Dropdowndropdown2   /* 2adf7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("country") ?<Dropdowncountry   /* 2049a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("state") ?<Dropdownstate   /* c9a9f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("city") ?<Dropdowncity   /* 6363b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
    </div>
 )
}

export default Groupthirdgroup
