'use client'


import i18n from '@/app/components/i18n';
import React, { useState,useEffect,useContext,useRef } from 'react' ;
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import {Radio,Text } from '@gravity-ui/uikit';
import { useRouter } from 'next/navigation';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { AxiosService } from "@/app/components/axiosService";
import {Modal} from '@gravity-ui/uikit';
import { eventBus } from '@/app/eventBus';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';


const Radioradio = ({setCheckToAdd,encryptionFlagComp,encryptionFlagCompData}:any) =>{
  const token:string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const prevRefreshRef = useRef(false);
  let readableControls :any=[];
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const toast:any=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("")
  const routes = useRouter();
  const keyset:any=i18n.keyset("language");
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
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
          controlId: "a7aec5a0a58e421f9d603ac991bedaba",
          isTable: false,
          from:"Radioradio",
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
      return
    }catch(err)
      {
        console.log(err)
    }
  }
  
  useEffect(()=>{
    handleMapperValue()
    setgroup2911c((pre:any)=>({...pre,radio:""}));
  },[radioedaba?.refresh])
    
  const handleChange =async (e:any)=>{
    setgroup2911c((prev: any) => ({ ...prev, radio: !e}));
  }
    const handleBlur = async (e:any)=>{
      let code:any = allCode;
      if (code == "") {
        //toast(code?.data?.errorDetails?.message, 'danger');
        //return;
      }  else if (code != '') {
        let codeStates: any = {};
      codeStates['group']  = group2911c,
      codeStates['setgroup'] = setgroup2911c,
      codeStates['table']  = table77086,
      codeStates['settable'] = settable77086,
      codeStates['employee']  = employee03307,
      codeStates['setemployee'] = setemployee03307,
      codeExecution(code,codeStates);
      }
    }

  if (radioedaba?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `8 / 10`,gridRow: `5 / 15`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Radio
      className=""
      onBlur={handleBlur}
      size="m"
      disabled= {radioedaba?.isDisabled ? true : false}
      content={<p onClick={()=>{handleChange(group2911c.radio||false)}}>radio</p>}
      value={"radio"}
      checked={group2911c.radio||false}
    >
    </Radio>
  </div>
  )
}

export default Radioradio
