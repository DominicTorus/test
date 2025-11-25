'use client'
import React, { useContext,useEffect } from 'react'
import { Text } from '@/components/Text';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'

const Texttext = ({encryptionFlagCompData,isDynamic,item,index}:any) => {
  const token:string = getCookie('token'); 
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const {dfd_code_description_v1Props, setdfd_code_description_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
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

  const handleMapperValue=async()=>{
    try{
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:UFcomponent:AFVK:v1",
          componentId: "1c858b3ff88541ecbbf912bf99201a8f",
          controlId: "98a24d6dc84f402f8884e6dd23a6135a",
          isTable: false,
          accessProfile:accessProfile,
          from:"textText"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(Array.isArray(dfd_code_description_v1Props) && dfd_code_description_v1Props){
        setthirdgroup01a8f((pre:any)=>({...pre,cdcategory:dfd_code_description_v1Props[0]?.cdcategory}));
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    handleMapperValue()
  },[text6135a?.refresh])

  if (text6135a?.isHidden) {
    return <></>
  }

return (
  <div className="" style={{gridColumn: `2 / 4`,gridRow: `15 / 30`,gap:``, height: `100%`, overflow: 'auto'}} >
    <Text
      className="truncate"
      variant ="body-3"
      color ="primary"
    >
    {isDynamic ? item?.cdcategory : (thirdgroup01a8f?.cdcategory || "")}
    </Text>
  </div>
  )
}

export default Texttext
