'use client'
import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import {Button,Container,Text } from '@gravity-ui/uikit';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto } from '@/app/interfaces/interfaces';
import decodeToken from '@/app/components/decodeToken';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventFunction } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import {Modal} from '@gravity-ui/uikit';
import { eventBus } from '@/app/eventBus';
import TorusButton from '@/app/TorusComponents/Button';
import TorusIcon from '@/app/TorusComponents/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';


    

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
} 

const Buttonview = ({mainData,setRefetch,encryptionFlagCompData}:any) => {
  const token:string = getCookie('token');
  const decodedTokenObj:any = decodeToken(token);
  const createdBy:string =decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {samplescreen_v1Props, setsamplescreen_v1Props}= useContext(TotalContext) as TotalContextProps;
  let code:any="";
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false;
  const toast:any=useInfoMsg();
  const [allCode,setAllCode]=useState<any>("");
  let dfKey: string | any;
  const [loading, setLoading] = useState(false);
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
  const {t_name3f53e, sett_name3f53e}= useContext(TotalContext) as TotalContextProps;
  const {trs_statusd040b, settrs_statusd040b}= useContext(TotalContext) as TotalContextProps;
  const {companycodef6591, setcompanycodef6591}= useContext(TotalContext) as TotalContextProps;
  const {view761fb, setview761fb}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
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
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }

  useEffect(()=>{
    eventBus.on("triggerButton", (id:any) => {
      if (id === "view761fb") {
        buttonRef.current?.click();
      }
    });
  },[])


  async function eventEmitter(){
    if (Array.isArray(eventEmitterData) || eventEmitterData.length > 0) {
      // Execute all requests in parallel using forEach
    eventEmitterData.forEach(async (element:any) => {
      try {
        if (encryptionFlagCont) {
            element["dpdKey"] = encryptionDpd;
            element["method"] = encryptionMethod;
          } 
        const te_refresh = await AxiosService.post("/te/eventEmitter", element, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (te_refresh?.data?.error === true) {
          toast(te_refresh?.data?.errorDetails?.message, 'danger');
        }
      } catch (error) {
        console.error("Error in eventEmitter:", error);
      }
    });
    }
  }
  const handleClick=async()=>{
    if(tableecom7ef45Props?.validation==true && tableecom7ef45Props?.required==true || tableecom7ef45Props?.required==true)
    {
      if(validateRefetch.init==0)
      {
        setValidateRefetch((pre:any)=>({...pre,value:!pre.value,init:pre.init+1}));
        return;
      }
      setValidateRefetch((pre:any)=>({...pre,value:!pre.value,init:pre.init+1}));
    } 
    await handleCustomCode();
    let saveCheck=false;
    Object.keys(validate).map((item)=>{
      if(validate[item] == 'invalid'){
        saveCheck=true;
    }});
    if (saveCheck) {   
      toast('Please verify the data', 'danger');
      return;
    }
    try{  
    // show as profile 
    let filterProps:any =  [
  {
    "key": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:CG:AFGK:TG1:AFK:cardDoc:AFVK:v1",
    "nodeBasedData": [
      {
        "nodeId": "2719e448cf68401f84f1440401b49235",
        "object": {
          "properties.companycode": "companycode"
        }
      }
    ]
  }
]; 
    let filterData = await getFilterProps(filterProps,mainData);
    setsamplescreen_v1Props([...filterData ]);
    routes.push(getRouteScreenDetails('CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:SampleScreen:AFVK:v1', 'samplescreen_v1'));
    }catch (err: any) {
      toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }
  }
  async function handleConfirmOnClick(){
  } 


 if (view761fb?.isHidden) {
    return <></>
  }
  
  return (
    <div 
>
      <TorusButton 
        ref={buttonRef}
        className="w-full "
        onClick={handleClick}
        view='action'
        size='s'           
        disabled= {view761fb?.isDisabled ? true : false}
        pin='circle-circle'
      >
        {keyset("view")}
      </TorusButton>
    </div>
  )
}

export default Buttonview
