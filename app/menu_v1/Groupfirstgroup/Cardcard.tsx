'use client'

import { Icon } from '@gravity-ui/uikit';
import { CircleDollar } from '@gravity-ui/icons';
import React, { useState, useContext, useEffect, useRef } from 'react'; 
import { Text } from '@gravity-ui/uikit';
import { Card } from '@/components/Card';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { getCookie } from '@/app/components/cookieMgment';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import {Modal} from '@gravity-ui/uikit';

const Cardcard = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const token: string = getCookie('token');
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const prevRefreshRef = useRef(false);
  /////////////
   //another screen
  const {firstgroupc4acb, setfirstgroupc4acb}= useContext(TotalContext) as TotalContextProps  
  const {firstgroupc4acbProps, setfirstgroupc4acbProps}= useContext(TotalContext) as TotalContextProps  
  const {textinput2cc5d, settextinput2cc5d}= useContext(TotalContext) as TotalContextProps  
  const {uploade78d7, setuploade78d7}= useContext(TotalContext) as TotalContextProps  
  const {textarea87afb, settextarea87afb}= useContext(TotalContext) as TotalContextProps  
  const {radiof9609, setradiof9609}= useContext(TotalContext) as TotalContextProps  
  const {radiogroup5ad4f, setradiogroup5ad4f}= useContext(TotalContext) as TotalContextProps  
  const {switcha515a, setswitcha515a}= useContext(TotalContext) as TotalContextProps  
  const {pininputf6753, setpininputf6753}= useContext(TotalContext) as TotalContextProps  
  const {save67a1f, setsave67a1f}= useContext(TotalContext) as TotalContextProps  
  const {radiobutton6d7d6, setradiobutton6d7d6}= useContext(TotalContext) as TotalContextProps  
  const {checkbox1c08f, setcheckbox1c08f}= useContext(TotalContext) as TotalContextProps  
  const {signature75ba3, setsignature75ba3}= useContext(TotalContext) as TotalContextProps  
  const {viewer2e45c, setviewer2e45c}= useContext(TotalContext) as TotalContextProps  
  const {card63ac3, setcard63ac3}= useContext(TotalContext) as TotalContextProps  
  const {timepicker40a6b, settimepicker40a6b}= useContext(TotalContext) as TotalContextProps  
  const {slider6c8f7, setslider6c8f7}= useContext(TotalContext) as TotalContextProps  
  const {qrcode772a6, setqrcode772a6}= useContext(TotalContext) as TotalContextProps  
  const {image54de2, setimage54de2}= useContext(TotalContext) as TotalContextProps  
  const {dropdown7f41a, setdropdown7f41a}= useContext(TotalContext) as TotalContextProps  
  const {icon71de8, seticon71de8}= useContext(TotalContext) as TotalContextProps  
  const {text5d0f8, settext5d0f8}= useContext(TotalContext) as TotalContextProps  
  const {label9bd6f, setlabel9bd6f}= useContext(TotalContext) as TotalContextProps  
  const {listec3b4, setlistec3b4}= useContext(TotalContext) as TotalContextProps  
  const {datepickerbe904, setdatepickerbe904}= useContext(TotalContext) as TotalContextProps  
  const {jsonviewerfbb2e, setjsonviewerfbb2e}= useContext(TotalContext) as TotalContextProps  
  const {avatar24aed, setavatar24aed}= useContext(TotalContext) as TotalContextProps  
  const {companycard071eb, setcompanycard071eb}= useContext(TotalContext) as TotalContextProps  
  const {progressd7ccf, setprogressd7ccf}= useContext(TotalContext) as TotalContextProps  
  const {texttospeech63351, settexttospeech63351}= useContext(TotalContext) as TotalContextProps  
  const {speechtotext5f5c9, setspeechtotext5f5c9}= useContext(TotalContext) as TotalContextProps  
  const {tabsb7d72, settabsb7d72}= useContext(TotalContext) as TotalContextProps  
  //////////////
 
  
  const handleMapperDetails=async()=>{
    try{
    let code:any;
    const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:AllComponents:AFVK:v1",  componentId:"5909e18973e149f19bb5db9d38fc4acb",controlId:"7e6ffd149c9e41e19b91411c3ec63ac3",isTable:false,accessProfile:accessProfile,from:"cardCard"},{
      headers: {
        Authorization: `Bearer ${token}`
    }})
    code = orchestrationData?.data?.code
    if (code != '') {
          let codeStates: any = {}
          codeStates['firstgroup']  = firstgroupc4acb,
          codeStates['setfirstgroup'] = setfirstgroupc4acb,
        codeExecution(code,codeStates)
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleClick=async(value:any)=>{
    return 0
  }


useEffect(() => {
    setfirstgroupc4acb((pre:any)=>({...pre,card:""}));
  },[card63ac3?.refresh])

  const style = {
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }

  if (card63ac3?.isHidden) {
    return <></>
  }  
  return (
    <div 
    style={{gridColumn: `7 / 9`,gridRow: `94 / 121`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Card 
      // style={style}
      className="rounded-lg shadow-lg p-6 bg-white "
      
      size="m"
      // variant="normal"
      theme="normal"
      view="outlined"
          disabled= {card63ac3?.isDisabled ? true : false}
      onClick={()=>handleClick}      
      >
      
      {/* <div className="my-4 w-3/4 border-1 border-gray-300"></div> */}
      <div className=' flex justify-center space-x-2  '>
        <span className=" flex justify-center ">< CircleDollar /></span>
        <Text variant='body-1' className='truncate ' >
        Card
        </Text>
        </div>
        <br/> 
      <div className='flex justify-center'>
      <Text variant ="display-1">
      {firstgroupc4acb?.card?firstgroupc4acb?.card:"0"}
      </Text>
    </div>
      </Card>
    </div>
  )
}

export default Cardcard
