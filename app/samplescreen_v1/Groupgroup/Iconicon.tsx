'use client'

import { AbbrApi } from '@gravity-ui/icons';
import React, { useContext,useEffect } from 'react' 
import { Icon } from '@gravity-ui/uikit';
import {Text} from "@gravity-ui/uikit";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment'

const Iconicon = ({encryptionFlagCompData}:any) => {
  const token:string = getCookie('token'); 
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  /////////////
  //another screen
  const {group2911c, setgroup2911c}= useContext(TotalContext) as TotalContextProps
  const {group2911cProps, setgroup2911cProps}= useContext(TotalContext) as TotalContextProps
  const {icone5068, seticone5068}= useContext(TotalContext) as TotalContextProps
  const {phonedeef3, setphonedeef3}= useContext(TotalContext) as TotalContextProps
  const {radioedaba, setradioedaba}= useContext(TotalContext) as TotalContextProps
  const {textinut187a8, settextinut187a8}= useContext(TotalContext) as TotalContextProps
  const {switch23709, setswitch23709}= useContext(TotalContext) as TotalContextProps
  const {dropdown32403, setdropdown32403}= useContext(TotalContext) as TotalContextProps
  const {emailda9f0, setemailda9f0}= useContext(TotalContext) as TotalContextProps
  const {table77086, settable77086}= useContext(TotalContext) as TotalContextProps
  const {table77086Props, settable77086Props}= useContext(TotalContext) as TotalContextProps
  const {employee03307, setemployee03307}= useContext(TotalContext) as TotalContextProps
  const {employee03307Props, setemployee03307Props}= useContext(TotalContext) as TotalContextProps
  //////////////
  const handleCode=async () => {
    let code:any;
    const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:SampleScreen:AFVK:v1",  componentId:"3ba85417fe05446aa44c2198d522911c",controlId:"b1bb4e246d844e969a7e1e07159e5068",isTable:false,accessProfile:accessProfile,from:"Iconicon"},{
      headers: {
        Authorization: `Bearer ${token}`
    }})
    code=orchestrationData?.data?.code
    if (code == '') {
      //toast(code?.data?.errorDetails?.message, 'danger')
      //return
    }  else if (code != '') {
      let codeStates: any = {}
      codeExecution(code,codeStates)
    }
  }

  useEffect(() => {
    handleCode()
  }, [])

  if (icone5068?.isHidden) {
    return <></>
  }

return (
  <div 
    style={{gridColumn: `11 / 12`,gridRow: `4 / 14`, gap:``, height: `100%`, overflow: 'auto'
 }} >
    <Icon 
      className=""
      size={20}
      data={AbbrApi}
    />
  </div>
  )
}

export default Iconicon
