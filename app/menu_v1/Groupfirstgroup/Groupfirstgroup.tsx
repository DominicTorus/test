'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { Icon } from '@/components/Icon';
import { Modal } from '@/components/Modal';
import { eventBus } from '@/app/eventBus';
import clsx from "clsx";
import Buttonbutton  from "./Buttonbutton";
import Avataravatar  from "./Avataravatar";
import RadioGroupradiogroup  from "./RadioGroupradiogroup";
import DatePickerdatepicker  from "./DatePickerdatepicker";
import Checkboxcheckbox  from "./Checkboxcheckbox";
import Dropdowndropdown  from "./Dropdowndropdown";
import Documentuploaderupload  from "./Documentuploaderupload";
import Labellabel  from "./Labellabel";
import Cardcard  from "./Cardcard";
import Imageimage  from "./Imageimage";
import TextInputtextinput  from "./TextInputtextinput";
import Iconicon  from "./Iconicon";
import Listlist  from "./Listlist";
import PinInputpinInput  from "./PinInputpinInput";
import Progressprogress  from "./Progressprogress";
import QrCodeqrcode  from "./QrCodeqrcode";
import RadioButtonradioButton  from "./RadioButtonradioButton";
import Radioradio  from "./Radioradio";
import SpeechToTextInputspeechtotext  from "./SpeechToTextInputspeechtotext";
import TextToSpeechOutputtexttospeech  from "./TextToSpeechOutputtexttospeech";
import Texttext  from "./Texttext";
import Switchswitch  from "./Switchswitch";
import TextAreatextarea  from "./TextAreatextarea";
import TimePickertimepicker  from "./TimePickertimepicker";
import Signaturesignature  from "./Signaturesignature";
import Sliderslider  from "./Sliderslider";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupfirstgroup = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,isFormOpen=false}:any) => {
  const token:string = getCookie('token'); 
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const handleDfdRefresh = useHandleDfdRefresh();
  const code:any = ``;
  let idx = "";
  let item = "";
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
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
      "button",
      "avatar",
      "radiogroup",
      "datepicker",
      "checkbox",
      "dropdown",
      "upload",
      "label",
      "card",
      "image",
      "textinput",
      "icon",
      "list",
      "pininput",
      "progress",
      "qrcode",
      "radiobutton",
      "radio",
      "speechtotext",
      "texttospeech",
      "text",
      "switch",
      "textarea",
      "timepicker",
      "signature",
      "slider"
    ],
    "allowedGroups": [
      "canvas",
      "firstgroup",
      "secondgroup"
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
  const {firstgroupc08a7, setfirstgroupc08a7}= useContext(TotalContext) as TotalContextProps;
  const {firstgroupc08a7Props, setfirstgroupc08a7Props}= useContext(TotalContext) as TotalContextProps;
  const {button6c543, setbutton6c543}= useContext(TotalContext) as TotalContextProps;
  const {button6c543Props, setbutton6c543Props}= useContext(TotalContext) as TotalContextProps;
  const {avatard99b3, setavatard99b3}= useContext(TotalContext) as TotalContextProps;
  const {avatard99b3Props, setavatard99b3Props}= useContext(TotalContext) as TotalContextProps;
  const {radiogroupcf04e, setradiogroupcf04e}= useContext(TotalContext) as TotalContextProps;
  const {radiogroupcf04eProps, setradiogroupcf04eProps}= useContext(TotalContext) as TotalContextProps;
  const {datepickerbe7c3, setdatepickerbe7c3}= useContext(TotalContext) as TotalContextProps;
  const {datepickerbe7c3Props, setdatepickerbe7c3Props}= useContext(TotalContext) as TotalContextProps;
  const {checkbox2289f, setcheckbox2289f}= useContext(TotalContext) as TotalContextProps;
  const {checkbox2289fProps, setcheckbox2289fProps}= useContext(TotalContext) as TotalContextProps;
  const {dropdown0e57d, setdropdown0e57d}= useContext(TotalContext) as TotalContextProps;
  const {dropdown0e57dProps, setdropdown0e57dProps}= useContext(TotalContext) as TotalContextProps;
  const {upload2cc02, setupload2cc02}= useContext(TotalContext) as TotalContextProps;
  const {upload2cc02Props, setupload2cc02Props}= useContext(TotalContext) as TotalContextProps;
  const {label9be35, setlabel9be35}= useContext(TotalContext) as TotalContextProps;
  const {label9be35Props, setlabel9be35Props}= useContext(TotalContext) as TotalContextProps;
  const {card498e2, setcard498e2}= useContext(TotalContext) as TotalContextProps;
  const {card498e2Props, setcard498e2Props}= useContext(TotalContext) as TotalContextProps;
  const {imageeee6c, setimageeee6c}= useContext(TotalContext) as TotalContextProps;
  const {imageeee6cProps, setimageeee6cProps}= useContext(TotalContext) as TotalContextProps;
  const {textinput56a48, settextinput56a48}= useContext(TotalContext) as TotalContextProps;
  const {textinput56a48Props, settextinput56a48Props}= useContext(TotalContext) as TotalContextProps;
  const {icon0a30c, seticon0a30c}= useContext(TotalContext) as TotalContextProps;
  const {icon0a30cProps, seticon0a30cProps}= useContext(TotalContext) as TotalContextProps;
  const {liste965e, setliste965e}= useContext(TotalContext) as TotalContextProps;
  const {liste965eProps, setliste965eProps}= useContext(TotalContext) as TotalContextProps;
  const {pininput92978, setpininput92978}= useContext(TotalContext) as TotalContextProps;
  const {pininput92978Props, setpininput92978Props}= useContext(TotalContext) as TotalContextProps;
  const {progress53986, setprogress53986}= useContext(TotalContext) as TotalContextProps;
  const {progress53986Props, setprogress53986Props}= useContext(TotalContext) as TotalContextProps;
  const {qrcoded45d1, setqrcoded45d1}= useContext(TotalContext) as TotalContextProps;
  const {qrcoded45d1Props, setqrcoded45d1Props}= useContext(TotalContext) as TotalContextProps;
  const {radiobutton92d8e, setradiobutton92d8e}= useContext(TotalContext) as TotalContextProps;
  const {radiobutton92d8eProps, setradiobutton92d8eProps}= useContext(TotalContext) as TotalContextProps;
  const {radio65f38, setradio65f38}= useContext(TotalContext) as TotalContextProps;
  const {radio65f38Props, setradio65f38Props}= useContext(TotalContext) as TotalContextProps;
  const {speechtotextf8edf, setspeechtotextf8edf}= useContext(TotalContext) as TotalContextProps;
  const {speechtotextf8edfProps, setspeechtotextf8edfProps}= useContext(TotalContext) as TotalContextProps;
  const {texttospeech35a79, settexttospeech35a79}= useContext(TotalContext) as TotalContextProps;
  const {texttospeech35a79Props, settexttospeech35a79Props}= useContext(TotalContext) as TotalContextProps;
  const {textf0149, settextf0149}= useContext(TotalContext) as TotalContextProps;
  const {textf0149Props, settextf0149Props}= useContext(TotalContext) as TotalContextProps;
  const {switch4a6e4, setswitch4a6e4}= useContext(TotalContext) as TotalContextProps;
  const {switch4a6e4Props, setswitch4a6e4Props}= useContext(TotalContext) as TotalContextProps;
  const {textareaa5a38, settextareaa5a38}= useContext(TotalContext) as TotalContextProps;
  const {textareaa5a38Props, settextareaa5a38Props}= useContext(TotalContext) as TotalContextProps;
  const {timepicker8a8fa, settimepicker8a8fa}= useContext(TotalContext) as TotalContextProps;
  const {timepicker8a8faProps, settimepicker8a8faProps}= useContext(TotalContext) as TotalContextProps;
  const {signature63e12, setsignature63e12}= useContext(TotalContext) as TotalContextProps;
  const {signature63e12Props, setsignature63e12Props}= useContext(TotalContext) as TotalContextProps;
  const {sliderde96f, setsliderde96f}= useContext(TotalContext) as TotalContextProps;
  const {sliderde96fProps, setsliderde96fProps}= useContext(TotalContext) as TotalContextProps;
  const {secondgroup311a5, setsecondgroup311a5}= useContext(TotalContext) as TotalContextProps;
  const {secondgroup311a5Props, setsecondgroup311a5Props}= useContext(TotalContext) as TotalContextProps;
  //////////////
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  /////////////
    if(securityData[accessProfile]?.['readOnlyControls'].includes("button")){
      setbutton6c543({...button6c543,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("avatar")){
      setavatard99b3({...avatard99b3,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("radiogroup")){
      setradiogroupcf04e({...radiogroupcf04e,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("datepicker")){
      setdatepickerbe7c3({...datepickerbe7c3,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("checkbox")){
      setcheckbox2289f({...checkbox2289f,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("dropdown")){
      setdropdown0e57d({...dropdown0e57d,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("upload")){
      setupload2cc02({...upload2cc02,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("label")){
      setlabel9be35({...label9be35,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("card")){
      setcard498e2({...card498e2,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("image")){
      setimageeee6c({...imageeee6c,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("textinput")){
      settextinput56a48({...textinput56a48,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("icon")){
      seticon0a30c({...icon0a30c,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("list")){
      setliste965e({...liste965e,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("pininput")){
      setpininput92978({...pininput92978,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("progress")){
      setprogress53986({...progress53986,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("qrcode")){
      setqrcoded45d1({...qrcoded45d1,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("radiobutton")){
      setradiobutton92d8e({...radiobutton92d8e,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("radio")){
      setradio65f38({...radio65f38,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("speechtotext")){
      setspeechtotextf8edf({...speechtotextf8edf,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("texttospeech")){
      settexttospeech35a79({...texttospeech35a79,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("text")){
      settextf0149({...textf0149,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("switch")){
      setswitch4a6e4({...switch4a6e4,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("textarea")){
      settextareaa5a38({...textareaa5a38,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("timepicker")){
      settimepicker8a8fa({...timepicker8a8fa,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("signature")){
      setsignature63e12({...signature63e12,isDisabled:true});
    }
    if(securityData[accessProfile]?.['readOnlyControls'].includes("slider")){
      setsliderde96f({...sliderde96f,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['firstgroup']  = firstgroupc08a7,
      codeStates['setfirstgroup'] = setfirstgroupc08a7,
      codeStates['secondgroup']  = secondgroup311a5,
      codeStates['setsecondgroup'] = setsecondgroup311a5,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{
  }

  const firstgroupc08a7Ref = useRef<any>(null);
  const handleClearSearch = () => {
    firstgroupc08a7Ref.current?.setSearchParams();
    firstgroupc08a7Ref.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(firstgroupc08a7) && Object.keys(firstgroupc08a7)?.length>0)
      {
        setfirstgroupc08a7({})
      }
    }else 
      prevRefreshRef.current= true
  }, [firstgroupc08a7Props?.refresh])

  return (
  <div  
      style={{          
        gridColumn: '2 / 24',
        gridRow: '14 / 390',
        height: '100%',
        gridAutoRows: '4px',
        columnGap: '0px',
        //rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(24, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
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
      className={clsx("",
        "rounded-md",
        isDark ? "bg-gray-800 text-white" : "bg-white text-black"
      )}
    >
        {securityData[accessProfile].allowedControls.includes("button")  ?<Buttonbutton lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}          
        {securityData[accessProfile].allowedControls.includes("avatar")?<Avataravatar /* d99b3 */ encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("radiogroup")?<RadioGroupradiogroup   /* cf04e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("datepicker") ?<DatePickerdatepicker   /* be7c3 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("checkbox") ?<Checkboxcheckbox   /* 2289f */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("dropdown") ?<Dropdowndropdown   /* 0e57d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("upload") ?<Documentuploaderupload   /* 2cc02 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("label")?<Labellabel   /* 9be35 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("card") ?<Cardcard  /* 498e2 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("image")?<Imageimage /* eee6c */ encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("textinput") ?<TextInputtextinput   /* 56a48 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("icon")?<Iconicon /* 0a30c */ encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("list") ?<Listlist   /* e965e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("pininput") ?<PinInputpinInput   /* 92978 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("progress")?<Progressprogress  /* 53986 */ isDynamic={false } index={idx} item={item} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("qrcode") ?<QrCodeqrcode   /* d45d1 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("radiobutton")?<RadioButtonradioButton  /* 92d8e */  checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("radio")?<Radioradio  /* 65f38 */  checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("speechtotext") ?<SpeechToTextInputspeechtotext   /* f8edf */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("texttospeech") ?<TextToSpeechOutputtexttospeech   /* 35a79 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("text") ?<Texttext   /* f0149 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("switch")?<Switchswitch  /* 4a6e4 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("textarea") ?<TextAreatextarea   /* a5a38 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}
        {securityData[accessProfile].allowedControls.includes("timepicker") ?<TimePickertimepicker   /* 8a8fa */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("signature") ?<Signaturesignature   /* 63e12 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {securityData[accessProfile].allowedControls.includes("slider") ?<Sliderslider   /* de96f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
    </div>
 )
}

export default Groupfirstgroup
