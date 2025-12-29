'use client'
import React, { useContext,useEffect } from 'react' 
import { Text } from '@gravity-ui/uikit';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'

const Textindustrydf = ({encryptionFlagCompData,isDynamic,item,index}:any) => {
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_carddoc_v1Props, setdfd_carddoc_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
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

  const handleMapperValue=async()=>{
    try{
      if(Array.isArray(dfd_carddoc_v1Props) && dfd_carddoc_v1Props){
        setdynamic9403b((pre:any)=>({...pre,t_industry:dfd_carddoc_v1Props[0]?.t_industry}));
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[industrydf5679e?.refresh])

  if (industrydf5679e?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 9`,gridRow: `17 / 27`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Text 
      className=""
      variant ="body-3"
      color ="primary"
       ellipsis={true}
    >
    {isDynamic ? item?.t_industry : (dynamic9403b?.t_industry || "")}
    </Text> 
  </div>
  )
}

export default Textindustrydf
