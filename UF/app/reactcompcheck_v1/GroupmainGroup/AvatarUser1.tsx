

'use client'
import React, { useState,useContext,useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { Avatar } from "@/components/Avatar";
import { codeExecution } from '@/app/utils/codeExecution'
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'

const AvatarUser1 =  ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any)=> { 
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const token:string = getCookie('token');
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const [allCode,setAllCode]=useState<any>("");
 /////////////
  //another screen
  const {maingroup81e1f, setmaingroup81e1f}= useContext(TotalContext) as TotalContextProps;  
  const {maingroup81e1fProps, setmaingroup81e1fProps}= useContext(TotalContext) as TotalContextProps;  
  const {listdemod14c2, setlistdemod14c2}= useContext(TotalContext) as TotalContextProps;  
  const {rbtn1862c0, setrbtn1862c0}= useContext(TotalContext) as TotalContextProps;  
  const {user1fe47c, setuser1fe47c}= useContext(TotalContext) as TotalContextProps;  
  const {btn1899aa, setbtn1899aa}= useContext(TotalContext) as TotalContextProps;  
  const {btn55667eb, setbtn55667eb}= useContext(TotalContext) as TotalContextProps;  
  const {btn6652747, setbtn6652747}= useContext(TotalContext) as TotalContextProps;  
  const {customw7f3cd, setcustomw7f3cd}= useContext(TotalContext) as TotalContextProps;  
  const {widget2416c9, setwidget2416c9}= useContext(TotalContext) as TotalContextProps;  
  //////////////

  const handleCode=async () => {
    let code:any;
    const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG3:AFK:reactComp:AFVK:v1",  componentId:"dc0597ae1ca34218b1f97e27dd381e1f",controlId:"d992d14de17b4d9581cc5197831fe47c",isTable:false,accessProfile:accessProfile,from:"avatarUser1"},{
      headers: {
        Authorization: `Bearer ${token}`
    }})
    code=orchestrationData?.data?.code
    if (code == '') {
      //toast(code?.message, 'danger')
      //return
    }  else if (code != '') {
        let codeStates: any = {}
            codeStates['maingroup']  = maingroup81e1f,
            codeStates['setmaingroup'] = setmaingroup81e1f,
      codeExecution(code,codeStates)
    }
  }

  useEffect(() => {
    setmaingroup81e1f((pre:any)=>({...pre,user1:""}));
    handleCode()
  }, [user1fe47c?.refresh])

  if (user1fe47c?.isHidden) {
    return <></>
  } 

  return (
    <div 
      className="" 
      style={{gridColumn: `14 / 16`,gridRow: `37 / 63`, gap:``, height: `100%`, overflow: 'auto'}}>
      <Avatar
        className=""
        icon="MdSupervisedUserCircle"
        view="outlined"
        theme="brand"
        contentAlign={"center"}
      />
  </div>
  )
}

export default AvatarUser1
