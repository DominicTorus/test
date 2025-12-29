



'use client'
import React, {useEffect, useContext,useState } from 'react' 
import { getCookie } from '@/app/components/cookieMgment';
import { AxiosService } from "@/app/components/axiosService";
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Progress } from '@/components/Progress';

const Progressprogress = ({encryptionFlagCompData}:any) => {
  const token: string = getCookie('token')
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let customCode:any=""

  const keyset: any = i18n.keyset('language')
  const [allCode,setAllCode]=useState<any>("")
  let code:any='';
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

  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:AllComponents:AFVK:v1",
          componentId: "5909e18973e149f19bb5db9d38fc4acb",
          controlId: "b0a9705e88bf45e3b2bd48bff09d7ccf",
          isTable: false,
          accessProfile:accessProfile,
          from:"progressProgress"
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
    handleCustomCode()
  }

  const handleCustomCode=async () => {
    let customCode:any=''
    let code :any = allCode;
    if (code != '') {
      let codeStates: any = {};
      codeStates['firstgroup']  = firstgroupc4acb,
      codeStates['setfirstgroup'] = setfirstgroupc4acb,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  useEffect(()=>{
    handleMapperValue()
  },[progressd7ccf?.refresh])

  if (progressd7ccf?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `1 / 3`,gridRow: `263 / 281`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Progress 
      className="w-full "
        size = {'m'}
        theme = {'success'}
        text = {'sample_text'}
        value = {40}
    />
  </div>
  )
}

export default Progressprogress
