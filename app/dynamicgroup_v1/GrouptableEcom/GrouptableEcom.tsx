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
import TabletableEcom  from './TabletableEcom';  
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const GrouptableEcom = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
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
      "t_id",
      "t_name",
      "trs_status",
      "companycode",
      "view"
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
  const {tableecom7ef45, settableecom7ef45}= useContext(TotalContext) as TotalContextProps;
  const {tableecom7ef45Props, settableecom7ef45Props}= useContext(TotalContext) as TotalContextProps;
  const {t_id8da71, sett_id8da71}= useContext(TotalContext) as TotalContextProps;
  const {t_id8da71Props, sett_id8da71Props}= useContext(TotalContext) as TotalContextProps;
  const {t_name3f53e, sett_name3f53e}= useContext(TotalContext) as TotalContextProps;
  const {t_name3f53eProps, sett_name3f53eProps}= useContext(TotalContext) as TotalContextProps;
  const {trs_statusd040b, settrs_statusd040b}= useContext(TotalContext) as TotalContextProps;
  const {trs_statusd040bProps, settrs_statusd040bProps}= useContext(TotalContext) as TotalContextProps;
  const {companycodef6591, setcompanycodef6591}= useContext(TotalContext) as TotalContextProps;
  const {companycodef6591Props, setcompanycodef6591Props}= useContext(TotalContext) as TotalContextProps;
  const {view761fb, setview761fb}= useContext(TotalContext) as TotalContextProps;
  const {view761fbProps, setview761fbProps}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("t_id")){
      sett_id8da71({...t_id8da71,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("t_name")){
      sett_name3f53e({...t_name3f53e,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("trs_status")){
      settrs_statusd040b({...trs_statusd040b,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("companycode")){
      setcompanycodef6591({...companycodef6591,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("view")){
      setview761fb({...view761fb,isDisabled:true});
    }
  //////////////
  }


  const handleOnload=()=>{
  }
  const handleOnChange=()=>{
  }

  const tableecom7ef45Ref = useRef<any>(null);
  const handleClearSearch = () => {
    tableecom7ef45Ref.current?.setSearchParams();
    tableecom7ef45Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(tableecom7ef45) && Object.keys(tableecom7ef45)?.length>0)
      {
        settableecom7ef45({})
      }
    }else 
      prevRefreshRef.current= true
  }, [tableecom7ef45Props?.refresh])

  return (
  <div  
      style={{
        gridColumn: '1 / 13',
        gridRow: '132 / 218',
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
        {<TabletableEcom lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} open={open} setOpen={setOpen} ref={tableecom7ef45Ref}/>}
        <div
          className='flex justify-end gap-2 p-2'
          style={{
            gridColumn: `1 / 13`,
            gridRow: `1 / 13`,
            gap: ``,
            height: `100%`,
            overflow: 'auto'
          }}
        >
        <div>
          <Button
            view='normal'
            size='m'
            pin= {tableecom7ef45Ref?.current?.isHaveSearch? 'circle-clear':"circle-circle"}
            onClick={() => setOpen(true)}
          >
            <Icon data={Magnifier} size={18} /> Search
          </Button>
          {tableecom7ef45Ref?.current?.isHaveSearch?
          <Button size='m' pin='clear-circle' onClick={()=>handleClearSearch()}>
            <Icon data={Xmark} size={18} />
          </Button>:<></>}
        </div>
      </div>
    </div>  
  )
}

export default GrouptableEcom
