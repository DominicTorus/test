'use client'
import {Eye} from '@gravity-ui/icons';
import React, { useState,useEffect,useContext, useRef } from 'react';
import axios from 'axios';
import {Button,Container,Text,Icon } from '@gravity-ui/uikit';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto } from '@/app/interfaces/interfaces';
import decodeToken from '@/app/components/decodeToken';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { nullFilter } from '@/app/utils/nullDataFilter';
import { eventFunction } from '@/app/utils/eventFunction';
import { useRouter } from 'next/navigation';
import {Modal} from '@gravity-ui/uikit';
import { eventBus } from '@/app/eventBus';
import TorusButton from '@/app/TorusComponents/Button';
import TorusIcon from '@/app/TorusComponents/Icon';
import { getFilterProps,getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { XMLParser } from 'fast-xml-parser'


    

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}
 

const Buttonviewdetails =  ({ lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}: { lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,encryptionFlagCompData:any,}) => {
  const token:string = getCookie('token');
  const decodedTokenObj:any = decodeToken(token);
  const createdBy:string =decodedTokenObj.users;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {validate , setValidate} = useContext(TotalContext) as TotalContextProps;
  const {validateRefetch , setValidateRefetch} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  let code:any = "";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const savedData=useRef({})
  const keyset:any=i18n.keyset("language");
  const confirmMsgFlag: boolean = false; 
  const toast:any=useInfoMsg();
  let dfKey: string | any;
  const lockMode:any = lockedData.lockMode;
  const [loading, setLoading] = useState(false);
  const routes = useRouter();
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  let actionLockData = {"lockMode":"","name":"","ttl":""}
    
 /////////////
   //another screen
  const {parent1d56d, setparent1d56d}= useContext(TotalContext) as TotalContextProps;
  const {parent1d56dProps, setparent1d56dProps}= useContext(TotalContext) as TotalContextProps;
  const {container72d6d, setcontainer72d6d}= useContext(TotalContext) as TotalContextProps;
  const {container72d6dProps, setcontainer72d6dProps}= useContext(TotalContext) as TotalContextProps;
  const {dynamic9403b, setdynamic9403b}= useContext(TotalContext) as TotalContextProps;
  const {dynamic9403bProps, setdynamic9403bProps}= useContext(TotalContext) as TotalContextProps;
  const {namedf0caad, setnamedf0caad}= useContext(TotalContext) as TotalContextProps;
  const {plandf36f3e, setplandf36f3e}= useContext(TotalContext) as TotalContextProps;
  const {industrydf5679e, setindustrydf5679e}= useContext(TotalContext) as TotalContextProps;
  const {employeedfb0755, setemployeedfb0755}= useContext(TotalContext) as TotalContextProps;
  const {locationdf8b23d, setlocationdf8b23d}= useContext(TotalContext) as TotalContextProps;
  const {revenue95787, setrevenue95787}= useContext(TotalContext) as TotalContextProps;
  const {revenuedfbd405, setrevenuedfbd405}= useContext(TotalContext) as TotalContextProps;
  const {viewdetails50348, setviewdetails50348}= useContext(TotalContext) as TotalContextProps;
  const {tableecom7ef45, settableecom7ef45}= useContext(TotalContext) as TotalContextProps;
  const {tableecom7ef45Props, settableecom7ef45Props}= useContext(TotalContext) as TotalContextProps;
  //////////////


  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  let customCode:any;
  const handleCustomCode=async () => {
    if (code != '') {
      let codeStates: any = {};
      codeStates['parent']  = parent1d56d,
      codeStates['setparent'] = setparent1d56d,
      codeStates['container']  = container72d6d,
      codeStates['setcontainer'] = setcontainer72d6d,
      codeStates['dynamic']  = dynamic9403b,
      codeStates['setdynamic'] = setdynamic9403b,
      codeStates['tableecom']  = tableecom7ef45,
      codeStates['settableecom'] = settableecom7ef45,
      codeStates['response']  = savedData.current,
      customCode = codeExecution(code,codeStates);
      return customCode;
    }
  }
  const handleMapper=async () => {
    try{     
    }catch(err)
    {
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapper();
    eventBus.on("triggerButton", (id:any) => {
      if (id === "viewdetails50348") {
        buttonRef.current?.click();
      }
    });
  },[viewdetails50348?.refresh])

  function SourceIdFilter(eventProperty:any,matchingSequence?:string){
    let ans=[]
    let id=""
    if(eventProperty.name=='saveHandler' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    if(eventProperty.name=='eventEmitter' && eventProperty.sequence == matchingSequence)
    {
      return [eventProperty.id]
    }
    for(let i=0;i<eventProperty?.children?.length;i++)
    {
      let temp:any=SourceIdFilter(eventProperty?.children[i],matchingSequence)
      if(temp.length)
      {
        ans.push(eventProperty?.children[i].id)
        id=id+"|"+eventProperty?.children[i].id
        ans.push(...temp)
      }
    }
    return ans
  }

  const handleClick=async()=>{
    if(dynamic9403bProps?.validation==true && dynamic9403bProps?.required==true || dynamic9403bProps?.required==true)
    {
      if(validateRefetch.init==0)
      {
        setValidateRefetch((pre:any)=>({...pre,value:!pre.value,init:pre.init+1}));
        return
      }
      setValidateRefetch((pre:any)=>({...pre,value:!pre.value,init:pre.init+1}));
    } 
    let saveCheck=false;
    Object.keys(validate).map((item)=>{
      if(validate[item] == 'invalid'){
        saveCheck=true;
    }})
    if (saveCheck) {   
      toast('Please verify the data', 'danger');
      return
    }
    try{  
    await delay(1000);
    await handleCustomCode();
    }catch (err: any) {
      if(typeof err == 'string')
        toast(err, 'danger');
      else
        toast(err?.response?.data?.errorDetails?.message, 'danger');
      setLoading(false);
    }
  }


 if (viewdetails50348?.isHidden) {
    return <></>
  }
 
  return (
    <div 
      style={{gridColumn: `2 / 12`,gridRow: `84 / 97`, gap:``, height: `100%`, overflow: 'auto'}} >
        <TorusButton 
          ref={buttonRef}
          className="w-full "
          onClick={handleClick}
          view='action'
          size='l'           
          disabled= {viewdetails50348?.isDisabled ? true : false}
          pin='circle-circle'
          startContent={
            <span className="h-full flex justify-center items-center" >
                <TorusIcon className="bg-transparent flex justify-center items-center px-[0.15vw] py-[0.25vh]" >
                    <Icon size="s" data={Eye} className="bg-transparent flex justify-center items-center px-[0.15vw] py-[0.25vh]" />
                </TorusIcon>
            </span>
          }   
        >
              {keyset("View Details")}
        </TorusButton>
      </div>
    
  )
}

export default Buttonviewdetails


