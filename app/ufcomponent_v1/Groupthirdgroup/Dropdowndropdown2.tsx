
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
import { getDropdownDetailsNew } from '@/app/utils/getMapperDetails';
import { codeExecution } from '@/app/utils/codeExecution';
import { eventBus } from '@/app/eventBus';
import {ChevronDown} from '@gravity-ui/icons';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import * as v from 'valibot'



let getMapperDetailsBindValues:any ={} ;
const Dropdowndropdown2 = ({lockedData,setLockedData,checkToAdd,setCheckToAdd,refetch,setRefetch,dropdownData,setDropdownData,encryptionFlagCompData}: any) => {
  const token: string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {dfd_code_description_v1Props, setdfd_code_description_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const { validate, setValidate } = useContext(
    TotalContext
  ) as TotalContextProps
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
  const [allCode,setAllCode]=useState<any>("");
 /////////////
   //another screen
  const {thirdgroup01a8f, setthirdgroup01a8f}= useContext(TotalContext) as TotalContextProps;
  const {thirdgroup01a8fProps, setthirdgroup01a8fProps}= useContext(TotalContext) as TotalContextProps;
  const {text6135a, settext6135a}= useContext(TotalContext) as TotalContextProps;
  const {dropdownd94a5, setdropdownd94a5}= useContext(TotalContext) as TotalContextProps;
  const {dropdown22adf7, setdropdown22adf7}= useContext(TotalContext) as TotalContextProps;
  const {country2049a, setcountry2049a}= useContext(TotalContext) as TotalContextProps;
  const {statec9a9f, setstatec9a9f}= useContext(TotalContext) as TotalContextProps;
  const {city6363b, setcity6363b}= useContext(TotalContext) as TotalContextProps;
  //////////////
  let getMapperDetailsBody: getMapperDetailsDto;
  const [dropdown2Options, setdropdown2Options] = useState<string[]>([]);
  let category : string
  let bindtranValue:any;
  let code:any
  category = "";

  const handleMapperValue = async()=>{
    const orchestrationData: any = await AxiosService.post(
      '/UF/Orchestration',
      {
        key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:UFcomponent:AFVK:v1",
        componentId: "1c858b3ff88541ecbbf912bf99201a8f",
        controlId: "e12430534add4e418760d8b15082adf7",
        isTable: false,
        accessProfile:accessProfile,
        from:"dropdowndropdown2"
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
  }
  const getDropdownData = async(value?:any)=>{
    let te_refreshBody:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:CG:AFGK:TG2:AFK:code_description:AFVK:v1"+":",
          refreshFlag: "Y",                
          count:1000,
          page:1
        }
        if (encryptionFlagCont) {
          te_refreshBody["dpdKey"] = encryptionDpd;
          te_refreshBody["method"] = encryptionMethod;
        }
        const te_refreshData:any=await AxiosService.post("/te/eventEmitter",te_refreshBody,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        if(te_refreshData?.data?.error == true){
          toast(te_refreshData?.data?.errorDetails?.message, 'danger')
        }else{
          //setdfd_code_description_v1Props(te_refreshData?.data?.dataset?.data || [])
        }
    let dfData = te_refreshData?.data?.dataset?.data
    let mapperColumn: string =  `description`
    let mapperText: string =  `description`

  try{
    getMapperDetails = await getDropdownDetailsNew(dfData,mapperColumn,mapperText,category, bindtranValue, code)
    getMapperDetailsValues = await getDropdownDetailsNew(dfData,mapperText,mapperColumn,category, bindtranValue, code)
    if(!bindtranValue){
      getMapperDetails.map((item: any) => {
        getMapperDetailsBindValues[item] = getMapperDetailsValues[getMapperDetails.indexOf(item)];
      })
    }
    if(!value){
    let temp:any[] = getMapperDetails.filter((item:any, index:any) => getMapperDetails.indexOf(item) === index)
    temp = temp.filter((ele:any)=>ele)
    setdropdown2Options(temp);
    }
    } catch (error) {
      console.error("Error fetching mapper details for dropdown:", error);
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[dropdown22adf7?.refresh])

  useEffect(() => {
    getDropdownData()
  },[dropdown22adf7?.refresh])

  const handlechange = async(value: any) => {
    if(value.length>0){
      setthirdgroup01a8f((prev: any) => ({ ...prev, statecode: getMapperDetailsBindValues[value[0]],description: value[0] }))
        setIsRequredData(false)
    }else{
      let temp:any = thirdgroup01a8f
      delete temp.statecode
      delete temp.description
      setthirdgroup01a8f(temp)
      getDropdownData()
       setIsRequredData(true)
    }
     setError('')
    setValidate((pre:any)=>({...pre,statecode:undefined}))
  };

  useEffect(() => {
    if(Array.isArray(dfd_code_description_v1Props) && dfd_code_description_v1Props?.length == 1){
    // setthirdgroup01a8f((pre:any)=>({...pre,statecode:dfd_code_description_v1Props[0]?.statecode}))
    }
  },[dfd_code_description_v1Props])

  const selected=useRef({})
  const handleClick=async(value?:any)=>{
    if (value.length > 0) {
      setthirdgroup01a8f((prev: any) => ({ ...prev, statecode: getMapperDetailsBindValues[value[0]]}))
         setIsRequredData(false)
    } else {
       setthirdgroup01a8f((prev: any) => ({ ...prev, statecode: ''}))
        setIsRequredData(true)
    }
    setError('')
    setValidate((pre:any)=>({...pre,statecode:undefined}))
   
    selected.current=value
    customecode = allCode
    if (customecode != '') {
      let codeStates: any = {}
      
        codeStates['thirdgroup'] = thirdgroup01a8f,
        codeStates['setthirdgroup'] = setthirdgroup01a8f,
        codeStates['selected']  = selected,
        codeStates['thirdgroup01a8f'] = thirdgroup01a8fProps,
        codeStates['setthirdgroup01a8f'] = setthirdgroup01a8fProps,
        codeStates['selected']  = selected,
        codeStates['text'] = text6135a,
        codeStates['settext'] = settext6135a,
        codeStates['selected']  = selected,
        codeStates['dropdown'] = dropdownd94a5,
        codeStates['setdropdown'] = setdropdownd94a5,
        codeStates['selected']  = selected,
        codeStates['dropdown2'] = dropdown22adf7,
        codeStates['setdropdown2'] = setdropdown22adf7,
        codeStates['selected']  = selected,
        codeStates['country'] = country2049a,
        codeStates['setcountry'] = setcountry2049a,
        codeStates['selected']  = selected,
        codeStates['state'] = statec9a9f,
        codeStates['setstate'] = setstatec9a9f,
        codeStates['selected']  = selected,
        codeStates['city'] = city6363b,
        codeStates['setcity'] = setcity6363b,
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

  useEffect(() => {
    if(initialCount!=0)
     setthirdgroup01a8f((pre:any)=>({...pre,statecode:""}))
    else
      setInitialCount(1)
  },[dropdown22adf7?.refresh])

  if (dropdown22adf7?.isHidden) {
    return <></>
  }

  return (
    <div 
      style={{gridColumn: `10 / 12`,gridRow: `18 / 33`, gap:``, height: `100%`, overflow: 'auto'}} >
      <div>
      </div>
      <Select   
        className=""    
        disabled= {dropdown22adf7?.isDisabled ? true : false}
        width = {250}
        placeholder={keyset("dropdown2")} filterable={true} hasClear={true} onUpdate={handlechange} value={thirdgroup01a8f?.description ? [thirdgroup01a8f?.description] : []}
        >
        {dropdown2Options.map((option, index) => (
          <Select.Option key={index} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default Dropdowndropdown2;
