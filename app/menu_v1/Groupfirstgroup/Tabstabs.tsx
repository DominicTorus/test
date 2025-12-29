
'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
import axios from 'axios';
import {Button,Container,Tabs,Text } from '@gravity-ui/uikit';
import i18n from '@/app/components/i18n';
import { AxiosService } from '@/app/components/axiosService';
import { codeExecution } from '@/app/utils/codeExecution';
import { getCookie } from '@/app/components/cookieMgment';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useRouter } from 'next/navigation';
import {Modal} from '@gravity-ui/uikit';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { te_refreshDto } from "@/app/interfaces/interfaces";

import Pageufcomponent_v1 from '@/app/ufcomponent_v1/ufcomponent_v1page';

const Tabstabs = ({encryptionFlagCompData}:any) => {
  const token:string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const prevRefreshRef = useRef(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const [open, setOpen] = React.useState(false);
  const [allCode,setAllCode]=useState<any>("");
  const [selected,setSelected]=useState<any>("first");
  const routes = useRouter();
  let code:any= "";
 /////////////
   //another screen
  const {firstgroupc4acb, setfirstgroupc4acb}= useContext(TotalContext) as TotalContextProps;
  const {firstgroupc4acbProps, setfirstgroupc4acbProps}= useContext(TotalContext) as TotalContextProps;
  const {textinput2cc5d, settextinput2cc5d}= useContext(TotalContext) as TotalContextProps;
  const {uploade78d7, setuploade78d7}= useContext(TotalContext) as TotalContextProps;
  const {textarea87afb, settextarea87afb}= useContext(TotalContext) as TotalContextProps;
  const {radiof9609, setradiof9609}= useContext(TotalContext) as TotalContextProps;
  const {radiogroup5ad4f, setradiogroup5ad4f}= useContext(TotalContext) as TotalContextProps;
  const {switcha515a, setswitcha515a}= useContext(TotalContext) as TotalContextProps;
  const {pininputf6753, setpininputf6753}= useContext(TotalContext) as TotalContextProps;
  const {save67a1f, setsave67a1f}= useContext(TotalContext) as TotalContextProps;
  const {radiobutton6d7d6, setradiobutton6d7d6}= useContext(TotalContext) as TotalContextProps;
  const {checkbox1c08f, setcheckbox1c08f}= useContext(TotalContext) as TotalContextProps;
  const {signature75ba3, setsignature75ba3}= useContext(TotalContext) as TotalContextProps;
  const {viewer2e45c, setviewer2e45c}= useContext(TotalContext) as TotalContextProps;
  const {card63ac3, setcard63ac3}= useContext(TotalContext) as TotalContextProps;
  const {timepicker40a6b, settimepicker40a6b}= useContext(TotalContext) as TotalContextProps;
  const {slider6c8f7, setslider6c8f7}= useContext(TotalContext) as TotalContextProps;
  const {qrcode772a6, setqrcode772a6}= useContext(TotalContext) as TotalContextProps;
  const {image54de2, setimage54de2}= useContext(TotalContext) as TotalContextProps;
  const {dropdown7f41a, setdropdown7f41a}= useContext(TotalContext) as TotalContextProps;
  const {icon71de8, seticon71de8}= useContext(TotalContext) as TotalContextProps;
  const {text5d0f8, settext5d0f8}= useContext(TotalContext) as TotalContextProps;
  const {label9bd6f, setlabel9bd6f}= useContext(TotalContext) as TotalContextProps;
  const {listec3b4, setlistec3b4}= useContext(TotalContext) as TotalContextProps;
  const {datepickerbe904, setdatepickerbe904}= useContext(TotalContext) as TotalContextProps;
  const {jsonviewerfbb2e, setjsonviewerfbb2e}= useContext(TotalContext) as TotalContextProps;
  const {avatar24aed, setavatar24aed}= useContext(TotalContext) as TotalContextProps;
  const {companycard071eb, setcompanycard071eb}= useContext(TotalContext) as TotalContextProps;
  const {progressd7ccf, setprogressd7ccf}= useContext(TotalContext) as TotalContextProps;
  const {texttospeech63351, settexttospeech63351}= useContext(TotalContext) as TotalContextProps;
  const {speechtotext5f5c9, setspeechtotext5f5c9}= useContext(TotalContext) as TotalContextProps;
  const {tabsb7d72, settabsb7d72}= useContext(TotalContext) as TotalContextProps;
  const {ufcomponent_v1Props, setufcomponent_v1Props}= useContext(TotalContext) as TotalContextProps;
  //////////////

  let ScreenItems:any=[
    {
      id: "ufcomponent_v1",
      title: "tab1",
      disabled: false,
      className: "!justify-center"
    },
  ]
  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:AllComponents:AFVK:v1",
          componentId: "5909e18973e149f19bb5db9d38fc4acb",
          controlId: "b0345b4aea1d4fcf871aad7b716b7d72",
          isTable: false,
          accessProfile:accessProfile,
          from:"tabstabs"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(orchestrationData?.data?.code)
      {
        setAllCode(orchestrationData?.data?.code)
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[tabsb7d72?.refresh])

  useEffect(()=>{
    setfirstgroupc4acb((pre:any)=>({...pre,tabs:""}));
  },[tabsb7d72?.refresh])

  const handleCode=async () => {
    code = allCode
    if (code == "") {
      //toast(code?.data?.errorDetails?.message, 'danger');
      //return;
    }  else if (code != '') {
      let codeStates: any = {};
    codeStates['firstgroup']  = firstgroupc4acb,
    codeStates['setfirstgroup'] = setfirstgroupc4acb,
    codeExecution(code,codeStates);
    }
  }


  const handleSelect=async(e:any)=>{
    // show as profile code
        if(e?.toLowerCase()=='ufcomponent_v1'){
          let filterProps2:any =  [];
          let filterData2 = await getFilterProps(filterProps2,firstgroupc4acb);
          setufcomponent_v1Props([...filterData2 ]);
        }
    setSelected(e);
    }
    function handleConfirmSelect(e:any){
    }

    if (tabsb7d72?.isHidden) {
      return <></>
    }

  return (
    <div 
       style={{gridColumn: `2 / 6`,gridRow: `331 / 371`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Tabs
      className=""
        activeTab={selected}
        onSelectTab={(e)=>handleSelect(e)}
        items={ScreenItems}
      />
      {selected=="ufcomponent_v1"? <Pageufcomponent_v1/> :null}
    </div>
  )
}

export default  Tabstabs
