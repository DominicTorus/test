

'use client'
import React, { useState, useContext, useEffect, useRef } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'
import { Switch, Text } from '@gravity-ui/uikit'
import { AxiosService } from "@/app/components/axiosService";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation'
import { eventBus } from '@/app/eventBus';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import {Modal} from '@gravity-ui/uikit';

const Switchswitch = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
  const token:string = getCookie('token');
    const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
    const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
    const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
    const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [allCode,setAllCode]=useState<any>("");
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const prevRefreshRef = useRef(false);
 /////////////
   //another screen
  const {group2911c, setgroup2911c}= useContext(TotalContext) as TotalContextProps;
  const {group2911cProps, setgroup2911cProps}= useContext(TotalContext) as TotalContextProps;
  const {icone5068, seticone5068}= useContext(TotalContext) as TotalContextProps;
  const {phonedeef3, setphonedeef3}= useContext(TotalContext) as TotalContextProps;
  const {radioedaba, setradioedaba}= useContext(TotalContext) as TotalContextProps;
  const {textinut187a8, settextinut187a8}= useContext(TotalContext) as TotalContextProps;
  const {switch23709, setswitch23709}= useContext(TotalContext) as TotalContextProps;
  const {dropdown32403, setdropdown32403}= useContext(TotalContext) as TotalContextProps;
  const {emailda9f0, setemailda9f0}= useContext(TotalContext) as TotalContextProps;
  const {table77086, settable77086}= useContext(TotalContext) as TotalContextProps;
  const {table77086Props, settable77086Props}= useContext(TotalContext) as TotalContextProps;
  const {employee03307, setemployee03307}= useContext(TotalContext) as TotalContextProps;
  const {employee03307Props, setemployee03307Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:SampleScreen:AFVK:v1",
          componentId: "3ba85417fe05446aa44c2198d522911c",
          controlId: "2825b5fc0e3a48538b1e05efa1923709",
          isTable: false,
          from:"Switchswitch",
          accessProfile:accessProfile
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code)
    }catch(err)
    {
      console.log(err)
    }
  }

  useEffect(() => {
    handleMapperValue()
    setgroup2911c((pre:any)=>({...pre,switch:null}))
  },[switch23709?.refresh])


  const handleChange = async (e:any) => {
    setgroup2911c((prev: any) => ({ ...prev, switch: e.target.checked }))
    let code:any= allCode
    if (code != '') {
      let codeStates: any = {}
            codeStates['group']  = group2911c,
            codeStates['setgroup'] = setgroup2911c,
            codeStates['table']  = table77086,
            codeStates['settable'] = settable77086,
            codeStates['employee']  = employee03307,
            codeStates['setemployee'] = setemployee03307,
    codeExecution(code,codeStates)
    }
  }

  if (switch23709?.isHidden) {
    return <></>
  }
  return (
    <div 
      style={{gridColumn: `2 / 4`,gridRow: `19 / 25`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Switch
        className=""
        size='m'
        disabled= {switch23709?.isDisabled ? true : false}
        content="content"
        checked={group2911c?.switch || false} 
        onChange={handleChange}
      />
  </div>
  )
}

export default Switchswitch



