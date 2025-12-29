'use client'
import React,{ useEffect, useState,useContext, useRef } from 'react';
import { Grid } from "@gravity-ui/page-constructor";
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import { useRouter } from 'next/navigation';
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { Magnifier,Xmark } from '@gravity-ui/icons'
import { Button, Icon, Modal } from '@gravity-ui/uikit'
import { eventBus } from '@/app/eventBus';
import TextInputtextinput  from "./TextInputtextinput";
import Documentuploaderupload  from "./Documentuploaderupload";
import TextAreatextarea  from "./TextAreatextarea";
import Radioradio  from "./Radioradio";
import RadioGroupradiogroup  from "./RadioGroupradiogroup";
import Switchswitch  from "./Switchswitch";
import PinInputpininput  from "./PinInputpininput";
import Buttonsave  from "./Buttonsave";
import RadioButtonradiobutton  from "./RadioButtonradiobutton";
import CheckBoxcheckbox  from "./Checkboxcheckbox";
import Signaturesignature  from "./Signaturesignature";
import DocumentViewerviewer  from "./DocumentViewerviewer";
import Cardcard  from "./Cardcard";
import TimePickertimePicker  from "./TimePickertimePicker";
import Sliderslider  from "./Sliderslider";
import QrCodeqrcode  from "./QrCodeqrcode";
import Imageimage  from "./Imageimage";
import Dropdowndropdown  from "./Dropdowndropdown";
import Iconicon  from "./Iconicon";
import Texttext  from "./Texttext";
import Labellabel  from "./Labellabel";
import Listlist  from "./Listlist";
import DatePickerdatepicker  from "./DatePickerdatepicker";
import TreeViewerjsonviewer  from "./TreeViewerjsonviewer";
import Avataravatar  from "./Avataravatar";
import CompanyCardcompanycard  from "./CompanyCardcompanycard";
import Progressprogress  from "./Progressprogress";
import TextToSpeechOutputtexttospeech  from "./TextToSpeechOutputtexttospeech";
import SpeechToTextInputspeechtotext  from "./SpeechToTextInputspeechtotext";
import Tabstabs  from "./Tabstabs";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { getCookie } from "@/app/components/cookieMgment";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { useTheme } from '@/hooks/useTheme';


const Groupfirstgroup = ({lockedData={},setLockedData,primaryTableData={}, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagPageData, nodeData, setNodeData,paginationDetails,isFormOpen=false}:any)=> {
  const token:string = getCookie('token'); 
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  let code:any = ``;
  let idx = ""
  let item = ""
  const {dfd_code_description_v1Props, setdfd_code_description_v1Props} = useContext(TotalContext) as TotalContextProps;
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
      "textinput",
      "upload",
      "textarea",
      "radio",
      "radiogroup",
      "switch",
      "pininput",
      "save",
      "radiobutton",
      "checkbox",
      "signature",
      "viewer",
      "card",
      "timepicker",
      "slider",
      "qrcode",
      "image",
      "dropdown",
      "icon",
      "text",
      "label",
      "list",
      "datepicker",
      "jsonviewer",
      "avatar",
      "companycard",
      "progress",
      "texttospeech",
      "speechtotext",
      "tabs"
    ],
    "allowedGroups": [
      "canvas",
      "firstgroup"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
};
  const prevRefreshRef = useRef(false);
  const [allowedComponent,setAllowedComponent]=useState<any>("");
  const [allowedControls,setAllowedControls]=useState<any>("");
  const toast=useInfoMsg();
  const confirmMsgFlag: boolean = false;
  const [allCode,setAllCode]=useState<any>("");
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
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
  const [open, setOpen] = React.useState(false);
  async function securityCheck() {
  const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:AllComponents:AFVK:v1",componentId:"5909e18973e149f19bb5db9d38fc4acb",from:"GroupFirstgroup",accessProfile:accessProfile},{
    headers: {
      Authorization: `Bearer ${token}`
    }})
  code = orchestrationData?.data?.code;
  const security:any[] = orchestrationData?.data?.security;
  const allowedGroups:any[] = orchestrationData?.data?.allowedGroups;
  if(orchestrationData?.data?.error === true){
    toast(orchestrationData?.data?.errorDetails?.message, 'danger')
    return
  }
  setAllowedControls(security) 
  setAllowedComponent(allowedGroups) 
    
  /////////////
    if(orchestrationData?.data?.readableControls.includes("textinput")){
      settextinput2cc5d({...textinput2cc5d,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("upload")){
      setuploade78d7({...uploade78d7,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("textarea")){
      settextarea87afb({...textarea87afb,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("radio")){
      setradiof9609({...radiof9609,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("radiogroup")){
      setradiogroup5ad4f({...radiogroup5ad4f,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("switch")){
      setswitcha515a({...switcha515a,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("pininput")){
      setpininputf6753({...pininputf6753,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("save")){
      setsave67a1f({...save67a1f,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("radiobutton")){
      setradiobutton6d7d6({...radiobutton6d7d6,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("checkbox")){
      setcheckbox1c08f({...checkbox1c08f,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("signature")){
      setsignature75ba3({...signature75ba3,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("viewer")){
      setviewer2e45c({...viewer2e45c,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("card")){
      setcard63ac3({...card63ac3,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("timepicker")){
      settimepicker40a6b({...timepicker40a6b,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("slider")){
      setslider6c8f7({...slider6c8f7,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("qrcode")){
      setqrcode772a6({...qrcode772a6,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("image")){
      setimage54de2({...image54de2,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("dropdown")){
      setdropdown7f41a({...dropdown7f41a,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("icon")){
      seticon71de8({...icon71de8,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("text")){
      settext5d0f8({...text5d0f8,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("label")){
      setlabel9bd6f({...label9bd6f,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("list")){
      setlistec3b4({...listec3b4,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("datepicker")){
      setdatepickerbe904({...datepickerbe904,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("jsonviewer")){
      setjsonviewerfbb2e({...jsonviewerfbb2e,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("avatar")){
      setavatar24aed({...avatar24aed,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("companycard")){
      setcompanycard071eb({...companycard071eb,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("progress")){
      setprogressd7ccf({...progressd7ccf,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("texttospeech")){
      settexttospeech63351({...texttospeech63351,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("speechtotext")){
      setspeechtotext5f5c9({...speechtotext5f5c9,isDisabled:true});
    }
    if(orchestrationData?.data?.readableControls.includes("tabs")){
      settabsb7d72({...tabsb7d72,isDisabled:true});
    }
  //////////////
    if (code != '') {
      let codeStates: any = {};
      codeStates['firstgroup']  = firstgroupc4acb,
      codeStates['setfirstgroup'] = setfirstgroupc4acb,

    codeExecution(code,codeStates);
    } 
  }


    const handleOnload=()=>{
  }
  const handleOnChange=()=>{

  }
  const firstgroupc4acbRef = useRef<any>(null);
  const handleClearSearch = () => {
    firstgroupc4acbRef.current?.setSearchParams();
    firstgroupc4acbRef.current?.handleSearch({});
  };

  useEffect(() => {    
    securityCheck()   
    handleOnload()
    if (prevRefreshRef.current) {
      if(!Array.isArray(firstgroupc4acb) && Object.keys(firstgroupc4acb)?.length>0)
      {
        setfirstgroupc4acb({})
      }
    }else 
      prevRefreshRef.current= true
  }, [firstgroupc4acbProps?.refresh])

  return (
    <div 
      style={{          
        gridColumn: '1 / 13',
        gridRow: '6 / 390',
        gridAutoRows: '4px',
        columnGap: '0px',
        rowGap: '0px',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, minmax(4px, 1fr))',
        height: '100%',
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
      className={`rounded-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}  
    >
        {allowedControls.includes("textinput") ?<TextInputtextinput   /* 2cc5d */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("upload") ?<Documentuploaderupload   /* e78d7 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("textarea") ?<TextAreatextarea   /* 87afb */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}
        {allowedControls.includes("radio")?<Radioradio  /* f9609 */  checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {allowedControls.includes("radiogroup")?<RadioGroupradiogroup   /* 5ad4f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("switch")?<Switchswitch  /* a515a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("pininput") ?<PinInputpininput   /* f6753 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("save")  ?<Buttonsave lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>: <div></div>}          
        {allowedControls.includes("radiobutton")?<RadioButtonradiobutton  /* 6d7d6 */  checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {allowedControls.includes("checkbox") ?<CheckBoxcheckbox   /* 1c08f */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {allowedControls.includes("signature") ?<Signaturesignature   /* 75ba3 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("viewer") ?<DocumentViewerviewer   /* 2e45c */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("card") ?<Cardcard  /* 63ac3 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {allowedControls.includes("timepicker") ?<TimePickertimePicker   /* 40a6b */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
          {allowedControls.includes("slider") ?<Sliderslider   /* 6c8f7 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("qrcode") ?<QrCodeqrcode   /* 772a6 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("image")?<Imageimage /* 54de2 */ encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {allowedControls.includes("dropdown") ?<Dropdowndropdown   /* 7f41a */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} lockedData ={lockedData} setLockedData={setLockedData} dropdownData={dropdownData} setDropdownData={setDropdownData} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("icon")?<Iconicon /* 71de8 */ encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
          {allowedControls.includes("text") ?<Texttext   /* 5d0f8 */ isDynamic={false } index={idx} item={item} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("label")?<Labellabel   /* 9bd6f */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("list") ?<Listlist   /* ec3b4 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("datepicker") ?<DatePickerdatepicker   /* be904 */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("jsonviewer")?<TreeViewerjsonviewer /* fbb2e */ encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {allowedControls.includes("avatar")?<Avataravatar /* 24aed */ encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {securityData[accessProfile].allowedControls.includes("companycard") ?<CompanyCardcompanycard  /* 071eb */checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
        {allowedControls.includes("progress")?<Progressprogress  /* d7ccf */ encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("texttospeech") ?<TextToSpeechOutputtexttospeech   /* 63351 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("speechtotext") ?<SpeechToTextInputspeechtotext   /* 5f5c9 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData} />: <div></div>}
        {allowedControls.includes("tabs") ?<Tabstabs /* b7d72 */ encryptionFlagCompData={encryptionFlagCompData}  />: <div></div>}
    </div>
 )
}

export default Groupfirstgroup
