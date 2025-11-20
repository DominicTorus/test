'use client'
import React, { useState,useEffect,useContext, useRef } from 'react';
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
import { Button } from '@/app/TAAIComponents/Button';
import { Icon } from '@/app/TAAIComponents/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import PageTimelinepage from '@/app/timeline_v1/timeline_v1page';



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
  const {timeline_v1Props, settimeline_v1Props}= useContext(TotalContext) as TotalContextProps;
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
  //////////////

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    let code :any = allCode;
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
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async () => {
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1",
          componentId: "55e7abcbeac94084a4a55c14763231c9",
          controlId: "bdbe5951073d4f6499f841544d6ab0b7",
          isTable: false,
          from:"Buttonview",
          accessProfile:accessProfile
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(orchestrationData?.data?.error == true){
        return;
      }
      setAllCode(orchestrationData?.data?.code);
      let code :any = orchestrationData?.data?.code;
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
        customCode = codeExecution(code,codeStates);
        return customCode;
      }
    }catch(err){
        console.log(err);
    }
  }

  useEffect(()=>{
    eventBus.on("triggerButton", (id:any) => {
      if (id === "viewab0b7") {
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
    if(ecom231c9Props?.validation==true && ecom231c9Props?.required==true || ecom231c9Props?.required==true)
    {
      if(validateRefetch.init==0)
      {
        setValidateRefetch((pre:any)=>({...pre,value:!pre.value,init:pre.init+1}));
        return;
      }
      setValidateRefetch((pre:any)=>({...pre,value:!pre.value,init:pre.init+1}));
    } 
    await handleMapper();
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
    // showArtifactAsModal
    let filterProps:any =  []; 
    let filterData = await getFilterProps(filterProps,mainData);
    settimeline_v1Props([...filterData ]);
    setShowProfileAsModalOpen(true);
    }catch (err: any) {
      toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }
  }
  async function handleConfirmOnClick(){
  } 


 if (viewab0b7?.isHidden) {
    return <></>
  }
  
  return (
    <div 
>
      <Modal open={showProfileAsModalOpen} onClose={() => setShowProfileAsModalOpen(false)} contentClassName='w-[1000px] h-[600px] bg-gray-50 mx-auto rounded-lg shadow-xl p-5 overflow-auto'>
        <div className='flex h-[30px] w-full justify-end'>
          <button
            className='flex w-[30px] justify-end'
            onClick={() => setShowProfileAsModalOpen(false)}
          >
            X
          </button>
        </div>
        <PageTimelinepage/>
      </Modal>
      <Button
        ref={buttonRef}
        className="w-full "
        onClick={handleClick}
        view='action'
        size='s'
        disabled= {viewab0b7?.isDisabled ? true : false}
        pin='circle-circle'
      >
                {keyset("view")}
      </Button>
    </div>
  )
}

export default Buttonview
