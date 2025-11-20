'use client'




    

     
import React, { useState,useContext,useEffect } from 'react'
import { TextInput } from '@/app/TAAIComponents/TextInput';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Button,Text } from "@gravity-ui/uikit";
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { useRouter } from 'next/navigation'
import {Modal} from '@gravity-ui/uikit';
import { eventBus } from '@/app/eventBus';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import * as v from 'valibot';


const TextInputphone = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {  
  const token: string = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const actionDetails :any = {
  "action": {
    "lock": {
      "lockMode": "",
      "name": "",
      "ttl": ""
    },
    "stateTransition": {
      "sourceQueue": "",
      "sourceStatus": "",
      "targetQueue": "",
      "targetStatus": ""
    },
    "pagination": {
      "page": "1",
      "count": "10"
    },
    "encryption": {
      "isEnabled": false,
      "selectedDpd": "",
      "encryptionMethod": ""
    },
    "events": {}
  },
  "code": "",
  "rule": {},
  "events": {},
  "mapper": []
}
  const [isRequredData,setIsRequredData]=useState(false)
  const toast:any=useInfoMsg()
  const keyset:any=i18n.keyset("language"); 
  const [allCode,setAllCode]=useState<any>("");
  let schemaArray :any =[];  
  const [dynamicStateandType,setDynamicStateandType]=useState<any>({name:'phone',type:"text"})
  const routes = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData?.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData?.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData?.method;
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
  

  // Validation  
    const [error, setError] = useState<string>('');
      /// vvv
      /// vvv
      /// vvv
      /// vvv
  schemaArray = [
  "v.string()",
  "v.regex(/^\\d+$/, 'Only digits are allowed.')"
] ;
    const schema : any  = v.pipe(    v.string(),
    v.regex(/^\d+$/, 'Only digits are allowed.'),
)
  const handleChange = async(e: any) => {
    setError('')
    setValidate((pre:any)=>({...pre,phone:undefined}))
    if(dynamicStateandType.type=="number"){
    setgroup2911c((prev: any) => ({ ...prev, phone: +e.target.value }))
    }
    else{
    setgroup2911c((prev: any) => ({ ...prev, phone: e.target.value }))
    }
  }
  const handleBlur=async () => {
      if(group2911c?.phone == "" || group2911c?.phone == undefined){
          setError('')
          setValidate((pre:any)=>({...pre,phone:undefined}))
    }else if(group2911c?.phone !== ""){
    const validate:any = v.safeParse(schema, group2911c?.phone);
    if(!validate.success){
      setError(validate?.issues[0]?.message);
      setValidate((pre:any)=>({...pre,phone:"invalid"}))
    }
    }
    let code:any=allCode
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
  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:SampleScreen:AFVK:v1",
          componentId: "3ba85417fe05446aa44c2198d522911c",
          controlId: "ad965eb80f2f44f7872833a8d48deef3",
          isTable: false,
          from:"TextInputphone",
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
      
      if(orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties){
        let type:any={name:'phone',type:'text'}
        type={
          name:'phone',
          type: orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.phone.type == 'string' ? 'text' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.phone.type =='integer' ? 'number' : orchestrationData?.data?.schemaData[0].schema.responses["200"].content["application/json"].schema.items.properties.phone.type
        }
        setDynamicStateandType(type)
       
      }
      if(Array.isArray(orchestrationData?.data?.dstData))
      {
        return
      }else{
      //  if(Object.keys(orchestrationData?.data?.dstData).length>0) 
       // setgroup2911c((pre:any)=>({...pre,phone:orchestrationData?.data?.dstData}))
      }
    }
    catch(err)
    {
      console.log(err)
    }
  }

  useEffect(()=>{
      handleMapperValue()
      handleBlur()
  },[validateRefetch.value])

  if (phonedeef3?.isHidden) {
    return <></>
  }
  return (   
    <div 
      style={{gridColumn: `5 / 7`,gridRow: `5 / 15`, gap:``, height: `100%`, overflow: 'auto'}} >
        {isRequredData && <span style={{ color: 'red' }}>*</span>}
      <TextInput
        require={isRequredData}
        className=""
        label={keyset("phone")}
        onChange= {handleChange}
        onBlur={()=>handleBlur()}
        type={dynamicStateandType.type}
        value={group2911c?.phone||""}
         disabled= {phonedeef3?.isDisabled ? true : false}
        pin='brick-brick'
        placeholder='type here....'
        readOnly= {phonedeef3?.isDisabled ? true : false}
        size='m'
        view='normal'
        validationState={validate?.phone ? "invalid" : undefined}
        errorMessage={error}
      />
    </div> 
  )
}

export default TextInputphone
