'use client'
import i18n from '@/app/components/i18n';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import React, { useState,useContext,useEffect } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation';
import { RadioButton } from '@/components/RadioButton';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { eventBus } from '@/app/eventBus';
import {Modal} from '@/components/Modal';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { AxiosService } from "@/app/components/axiosService";


const RadioButtonRbtn1 = ({setCheckToAdd,encryptionFlagCompData}:any) => {
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  let readableControls :any = [];
  const [allCode,setAllCode]=useState<any>("");
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const keyset:any=i18n.keyset("language");
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
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

  const handleMapperValue=async()=>{
  try{
    const orchestrationData: any = await AxiosService.post(
      '/UF/Orchestration',
      {
        key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG3:AFK:reactComp:AFVK:v1",
        componentId: "dc0597ae1ca34218b1f97e27dd381e1f",
        controlId: "65ab4c1bed6d4ccab5f58671b89862c0",
        isTable: false,
        from:"RadioButtonRbtn1",
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
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    handleMapperValue();
    setmaingroup81e1f((pre:any)=>({...pre,rbtn1:""}));
  },[rbtn1862c0?.refresh])

  const options = [
      {value: 'testedOK' ,content:'Approved'},
      {value: 'testedFAIL' ,content:'Rejected'},
  ];
  const handleChange=(e:any)=>{
setmaingroup81e1f((prev: any) => ({ ...prev, rbtn1: e}));
  }
  const handleBlur=(e:any)=>{
    let code: any = allCode;
      if (code == "") {
        //toast(code?.data?.errorDetails?.message, 'danger');
        //return
      }  else if (code != '') {
        let codeStates: any = {};
              codeStates['maingroup']  = maingroup81e1f,
              codeStates['setmaingroup'] = setmaingroup81e1f,
      codeExecution(code,codeStates);
      }
    }

  if (rbtn1862c0?.isHidden) {
    return <></>
  }
  
  return (
    <div 
      className="" 
      style={{gridColumn: `6 / 12`,gridRow: `36 / 57`, gap:``, height: `100%`, overflow: 'auto'}} >
    <RadioButton 
      className=""
        // value={maingroup81e1f?.rbtn1||""}
        contentAlign={"left"}
        needTooltip={true}  
        tooltipProps={{title:"RBTDN",placement:"top-start"}}
        disabled= {rbtn1862c0?.isDisabled ? true : false}
        defaultValue={options.length>0?options[0].value:""}
        items={options}       
        onChange={handleChange}
        onBlur={handleBlur}
    />
  </div>
  )
}

export default RadioButtonRbtn1
