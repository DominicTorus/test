'use client'
import React, { useState,useContext,useEffect,useRef } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import { RadioGroup, RadioGroupOption, Modal, Text } from '@gravity-ui/uikit';
import { AxiosService } from "@/app/components/axiosService";
import { getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { eventBus } from '@/app/eventBus';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import i18n from '@/app/components/i18n';

const RadioGroupradiogroup = ({encryptionFlagCompData}:any) => {
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const prevRefreshRef = useRef(false);
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const keyset:any=i18n.keyset("language");
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
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
  //////////////
  const options: RadioGroupOption[] = [
      {value: '0' ,content:'male'},
      {value: '1' ,content:'female'},
  ];

  const handleMapperValue=async()=>{
    try{
    const orchestrationData: any = await AxiosService.post(
      '/UF/Orchestration',
      {
        key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:AllComponents:AFVK:v1",
        componentId: "5909e18973e149f19bb5db9d38fc4acb",
        controlId: "7153c54a04dd457aa97e116cdcf5ad4f",
        isTable: false,
        from:"RadioRadioGroup",
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
    setAllCode( orchestrationData?.data?.code);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    handleMapperValue();
    setfirstgroupc4acb((pre:any)=>({...pre,radiogroup:""}));
  },[radiogroup5ad4f?.refresh])

  const handleChange= async(e:any)=>{
    setfirstgroupc4acb((prev: any) => ({ ...prev, radiogroup: e.target.value }));
    let code = allCode;
    if (code == "") {
      //toast(code?.data?.errorDetails?.message, 'danger')
      //return
    }  else if (code != '') {
      let codeStates: any = {}
            codeStates['firstgroup']  = firstgroupc4acb,
            codeStates['setfirstgroup'] = setfirstgroupc4acb,
    codeExecution(code,codeStates);
    }
  }


 
  if (radiogroup5ad4f?.isHidden) {
    return <></>
  }
  
return (
  <div 
    style={{gridColumn: `1 / 3`,gridRow: `33 / 53`, gap:``, height: `100%`, overflow: 'auto'}} >
      <div>{keyset("RadioGroup")}</div>
      <RadioGroup
        className=""
        value={firstgroupc4acb?.radiogroup || ""} 
        size="l"
          disabled= {radiogroup5ad4f?.isDisabled ? true : false}
        direction="vertical"
        defaultValue={options.length>0?options[0].value:""}
        options={options}
        onChange={handleChange}
      />
  </div>
  )
}

export default RadioGroupradiogroup
