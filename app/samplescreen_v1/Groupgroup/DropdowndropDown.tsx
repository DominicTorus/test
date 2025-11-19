
'use client'
import React, { useState,useContext,useEffect,useRef } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import i18n from '@/app/components/i18n';
import { AxiosService } from "@/app/components/axiosService";
import { getMapperDetailsDto, te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from '@/app/components/infoMsgHandler';
import { useRouter } from 'next/navigation'
import { Button, DropdownMenu, Select, Modal, Icon,Text  } from '@gravity-ui/uikit'
import { getCookie } from '@/app/components/cookieMgment';
import { getDropdownDetails } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import {ChevronDown} from '@gravity-ui/icons';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import * as v from 'valibot'


const DropdowndropDown = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagCompData}: any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
  const keyset:any=i18n.keyset("language");
  const [initialCount,setInitialCount]=useState(0)
  let getMapperDetails:any;
  const toast=useInfoMsg();
  const routes = useRouter();
  const [isRequredData,setIsRequredData]=useState(false)
  const [error, setError] = useState<string>('')
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef(false);
  let customecode:any="";
  const [allCode,setAllCode]=useState<any>("");
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
  const handleStaticValue=(data:any)=>{
    setSelectedItem(data)
  }
  const [selectedItem, setSelectedItem] = useState('');
  const items = [
   'One',
   'Two',
   'Three',
  ];

  useEffect(() => {
  if(group2911c?.dropdown=="" || group2911c?.dropdown==undefined || group2911c?.dropdown==null ){
    setSelectedItem("");
  }
  },[group2911c?.dropdown])

  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:SampleScreen:AFVK:v1",
          componentId: "3ba85417fe05446aa44c2198d522911c",
          controlId: "ebfaee5046954ed2b15d04a1ba732403",
          isTable: false,
          accessProfile:accessProfile,
          from:"dropdowndropDown"
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
  },[dropdown32403?.refresh])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      setgroup2911c((prev: any) => ({ ...prev, dropdown: value[0]}))
      setIsRequredData(false)
    } else {
      setgroup2911c((prev: any) => ({ ...prev, dropdown: ''}))
      setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,dropdown:undefined}))
    selected.current=value
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}
      
        codeStates['group'] = group2911c,
        codeStates['setgroup'] = setgroup2911c,
        codeStates['selected']  = selected,
        codeStates['group2911c'] = group2911cProps,
        codeStates['setgroup2911c'] = setgroup2911cProps,
        codeStates['selected']  = selected,
        codeStates['icon'] = icone5068,
        codeStates['seticon'] = seticone5068,
        codeStates['selected']  = selected,
        codeStates['phone'] = phonedeef3,
        codeStates['setphone'] = setphonedeef3,
        codeStates['selected']  = selected,
        codeStates['radio'] = radioedaba,
        codeStates['setradio'] = setradioedaba,
        codeStates['selected']  = selected,
        codeStates['textinut'] = textinut187a8,
        codeStates['settextinut'] = settextinut187a8,
        codeStates['selected']  = selected,
        codeStates['switch'] = switch23709,
        codeStates['setswitch'] = setswitch23709,
        codeStates['selected']  = selected,
        codeStates['dropdown'] = dropdown32403,
        codeStates['setdropdown'] = setdropdown32403,
        codeStates['selected']  = selected,
        codeStates['email'] = emailda9f0,
        codeStates['setemail'] = setemailda9f0,
        codeStates['selected']  = selected,
        codeStates['table'] = table77086,
        codeStates['settable'] = settable77086,
        codeStates['selected']  = selected,
        codeStates['table77086'] = table77086Props,
        codeStates['settable77086'] = settable77086Props,
        codeStates['selected']  = selected,
        codeStates['employee'] = employee03307,
        codeStates['setemployee'] = setemployee03307,
        codeStates['selected']  = selected,
        codeStates['employee03307'] = employee03307Props,
        codeStates['setemployee03307'] = setemployee03307Props,
        codeStates['selected']  = selected,
    codeExecution(customecode,codeStates)
    }
  }
   
  const { validateRefetch, setValidateRefetch } = useContext(
    TotalContext
  ) as TotalContextProps
  let schemaArray = [] ;
  const handleBlur = async () => {
  }

    useEffect(()=>{
        handleBlur()
    },[validateRefetch.value])
  ///////////////

  useEffect(() => {
    if(initialCount!=0)
     setgroup2911c((pre:any)=>({...pre,dropdown:""}))
    else
      setInitialCount(1)
  },[dropdown32403?.refresh])

  if (dropdown32403?.isHidden) {
    return <></>
  }

  return (
    <div 
      style={{gridColumn: `5 / 7`,gridRow: `20 / 30`, gap:``, height: `100%`, overflow: 'auto'}} >
           <div className="flex flex-col w-full h-full">
      <Select
        className=""
        placeholder={keyset("dropDown")} 
        filterable={true}
        hasClear={true}
          disabled= {dropdown32403?.isDisabled ? true : false}
          width = {250}
          value={group2911c?.dropdown ?[group2911c?.dropdown] : []}
          onUpdate={handleClick}
          validationState={validate?.dropdown ? "invalid" : undefined}
          errorMessage={error}
      > 
      {items.map((option, index) => (
        <Select.Option key={index} value={option}>
          {option}
        </Select.Option>
      ))}
      </Select>
      </div>
    </div>
  );
};

export default DropdowndropDown;
