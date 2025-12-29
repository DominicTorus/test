

'use client'    
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { getMapperDetailsDto, te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/app/components/cookieMgment';
import { getDropdownDetailsNew } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import { Dropdown } from '@/components/Dropdown';
import { Text } from '@/components/Text';
import {Modal} from '@/components/Modal';
import { Icon } from '@/components/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import * as v from 'valibot'
import { useHandleDfdRefresh } from '@/context/dfdRefreshContext';

let getMapperDetailsBindValues:any ={} ;
const Dropdowndropdown = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagCompData}: any) => {
  const token: string = getCookie('token');
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const handleDfdRefresh = useHandleDfdRefresh();
  const [isRequredData,setIsRequredData]=useState(false)
  const [error, setError] = useState<string>('')
  const keyset:any=i18n.keyset("language");
  const [initialCount,setInitialCount]=useState(0)
  let getMapperDetails:any;
  let getMapperDetailsValues:any;
  const toast=useInfoMsg();
  const routes = useRouter();
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef(false);
  let customecode:any="";
 /////////////
   //another screen
  const {firstgroupc08a7, setfirstgroupc08a7}= useContext(TotalContext) as TotalContextProps; 
  const {firstgroupc08a7Props, setfirstgroupc08a7Props}= useContext(TotalContext) as TotalContextProps; 
  const {button6c543, setbutton6c543}= useContext(TotalContext) as TotalContextProps; 
  const {avatard99b3, setavatard99b3}= useContext(TotalContext) as TotalContextProps; 
  const {radiogroupcf04e, setradiogroupcf04e}= useContext(TotalContext) as TotalContextProps; 
  const {datepickerbe7c3, setdatepickerbe7c3}= useContext(TotalContext) as TotalContextProps; 
  const {checkbox2289f, setcheckbox2289f}= useContext(TotalContext) as TotalContextProps; 
  const {dropdown0e57d, setdropdown0e57d}= useContext(TotalContext) as TotalContextProps; 
  const {upload2cc02, setupload2cc02}= useContext(TotalContext) as TotalContextProps; 
  const {label9be35, setlabel9be35}= useContext(TotalContext) as TotalContextProps; 
  const {card498e2, setcard498e2}= useContext(TotalContext) as TotalContextProps; 
  const {imageeee6c, setimageeee6c}= useContext(TotalContext) as TotalContextProps; 
  const {textinput56a48, settextinput56a48}= useContext(TotalContext) as TotalContextProps; 
  const {icon0a30c, seticon0a30c}= useContext(TotalContext) as TotalContextProps; 
  const {liste965e, setliste965e}= useContext(TotalContext) as TotalContextProps; 
  const {pininput92978, setpininput92978}= useContext(TotalContext) as TotalContextProps; 
  const {progress53986, setprogress53986}= useContext(TotalContext) as TotalContextProps; 
  const {qrcoded45d1, setqrcoded45d1}= useContext(TotalContext) as TotalContextProps; 
  const {radiobutton92d8e, setradiobutton92d8e}= useContext(TotalContext) as TotalContextProps; 
  const {radio65f38, setradio65f38}= useContext(TotalContext) as TotalContextProps; 
  const {speechtotextf8edf, setspeechtotextf8edf}= useContext(TotalContext) as TotalContextProps; 
  const {texttospeech35a79, settexttospeech35a79}= useContext(TotalContext) as TotalContextProps; 
  const {textf0149, settextf0149}= useContext(TotalContext) as TotalContextProps; 
  const {switch4a6e4, setswitch4a6e4}= useContext(TotalContext) as TotalContextProps; 
  const {textareaa5a38, settextareaa5a38}= useContext(TotalContext) as TotalContextProps; 
  const {timepicker8a8fa, settimepicker8a8fa}= useContext(TotalContext) as TotalContextProps; 
  const {signature63e12, setsignature63e12}= useContext(TotalContext) as TotalContextProps; 
  const {sliderde96f, setsliderde96f}= useContext(TotalContext) as TotalContextProps; 
  const {secondgroup311a5, setsecondgroup311a5}= useContext(TotalContext) as TotalContextProps; 
  const {secondgroup311a5Props, setsecondgroup311a5Props}= useContext(TotalContext) as TotalContextProps; 
  //////////////
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = React.useState<string[]>([]); 
  const items = [
   'sivam',
   'parama',
   'paramasivam',
  ];
   // const options = items.map(item => ({
  //  value: item.key,
  //  content: item.text
//}));           

  useEffect(() => {
  if(firstgroupc08a7?.dropdown=="" || firstgroupc08a7?.dropdown==undefined || firstgroupc08a7?.dropdown==null ){
    setSelectedItem([]);
  }
  },[firstgroupc08a7?.dropdown])

  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      let temp:any=[]
      if(Array.isArray(value)){
        for( let val of value){
          if(Array.isArray(val)){
            // let temp2=
            temp.push(val)
          }else{
            temp.push(val)   
          }
        }
      }
      setfirstgroupc08a7((prev: any) => ({ ...prev, dropdown: temp}))
      setIsRequredData(false) 
    }else {
      setfirstgroupc08a7((prev: any) => ({ ...prev, dropdown: ''}))
      setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,dropdown:undefined}))
    if (customecode != '') {
      let codeStates: any = {}
            codeStates['firstgroup']  = firstgroupc08a7,
            codeStates['setfirstgroup'] = setfirstgroupc08a7,
            codeStates['secondgroup']  = secondgroup311a5,
            codeStates['setsecondgroup'] = setsecondgroup311a5,
    codeExecution(customecode,codeStates)
    }
  }
   
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps


  let schemaArray = [
  "v.string()",
  "v.nonEmpty('This field is required.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.nonEmpty('This field is required.'),
)
  const handleBlur = async () => {
      if(firstgroupc08a7?.dropdown == "" || firstgroupc08a7?.dropdown == undefined){
      firstgroupc08a7.dropdown = "";
      const validate:any = v.safeParse(schema, firstgroupc08a7?.dropdown);
        if(!validate.success){
          setError(validate?.issues[0]?.message);
          setValidate((pre:any)=>({...pre,dropdown:"invalid"}))
        }
    }else if(firstgroupc08a7?.dropdown !== ""){
    const validate:any = v.safeParse(schema, firstgroupc08a7?.dropdown);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,dropdown:"invalid"}))
    }
    }
  }
    useEffect(()=>{
        if(!firstgroupc08a7?.dropdown)
        { 
          setfirstgroupc08a7Props((pre:any)=>({...pre,required:true}))
          setIsRequredData(true)
        }
        if(validateRefetch.init!=0)
          handleBlur()
    },[validateRefetch.value])

  useEffect(() => {
    if(initialCount!=0)
      setfirstgroupc08a7((pre:any)=>({...pre,dropdown:""}))
    else
      setInitialCount(1)
  },[dropdown0e57d?.refresh])

  if (dropdown0e57d?.isHidden) {
    return <></>
  }
  return (
    <div 
      style={{gridColumn: `2 / 6`,gridRow: `63 / 89`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Dropdown
        className=""
        placeholder={keyset("dropdown")} 
        filterable={true}
        hasClear={true}
        static={true}
        staticProps={items}
        multiple={true}
        disabled= {dropdown0e57d?.isDisabled ? true : false}
        value={firstgroupc08a7?.dropdown ?firstgroupc08a7?.dropdown: []}
        onChange={handleClick} 
        needTooltip={true}  
        tooltipProps={{title:"Tooltip",placement:"top-start"}}
        contentAlign={"left"}
        headerPosition='top'
        headerText={
          <>
            Header
            {isRequredData && <span style={{ color: 'red' }}> *</span>}
          </>
        }
        validationState={validate?.dropdown ? "invalid" : undefined}
        errorMessage={error}
        /> 
        {validate?.dropdown && (
          <Text variant="caption-1" color="danger" className="mt-1">
            {error || 'This field is required'}
          </Text>
        )}   
    </div>
  );
};

export default Dropdowndropdown;
