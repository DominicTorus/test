'use client'
import React, { useContext, useEffect } from 'react'
import { Text } from '@gravity-ui/uikit'
import { TotalContext, TotalContextProps } from '@/app/globalContext'
import { AxiosService } from '@/app/components/axiosService'
import { codeExecution } from '@/app/utils/codeExecution'
import { deleteAllCookies, getCookie } from '@/app/components/cookieMgment'

const Textcname = ({ encryptionFlagCompData, isDynamic, item, index }: any) => {
  const token: string = getCookie('token')
  const { accessProfile, setAccessProfile } = useContext(
    TotalContext
  ) as TotalContextProps
  const { dfd_carddoc_v1Props, setdfd_carddoc_v1Props } = useContext(
    TotalContext
  ) as TotalContextProps
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false
  let encryptionDpd: string = ''
  encryptionDpd =
    encryptionDpd !== '' ? encryptionDpd : encryptionFlagCompData.dpd
  let encryptionMethod: string = ''
  encryptionMethod =
    encryptionMethod !== '' ? encryptionMethod : encryptionFlagCompData.method
  /////////////
  //another screen
  const { group1d56d, setgroup1d56d } = useContext(
    TotalContext
  ) as TotalContextProps
  const { group1d56dProps, setgroup1d56dProps } = useContext(
    TotalContext
  ) as TotalContextProps
  const { companygroup72d6d, setcompanygroup72d6d } = useContext(
    TotalContext
  ) as TotalContextProps
  const { companygroup72d6dProps, setcompanygroup72d6dProps } = useContext(
    TotalContext
  ) as TotalContextProps
  const { cgroupf48bf, setcgroupf48bf } = useContext(
    TotalContext
  ) as TotalContextProps
  const { cgroupf48bfProps, setcgroupf48bfProps } = useContext(
    TotalContext
  ) as TotalContextProps
  const { cname1a23c, setcname1a23c } = useContext(
    TotalContext
  ) as TotalContextProps
  const { view155e3, setview155e3 } = useContext(
    TotalContext
  ) as TotalContextProps
  const { ecom231c9, setecom231c9 } = useContext(
    TotalContext
  ) as TotalContextProps
  const { ecom231c9Props, setecom231c9Props } = useContext(
    TotalContext
  ) as TotalContextProps
  //////////////

  const handleMapperValue = async () => {
    try {
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: 'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1',
          componentId: 'da45b14879804ac29be98648221f48bf',
          controlId: '1a4873d9c7b74d089765ce455961a23c',
          isTable: false,
          accessProfile: accessProfile,
          from: 'text'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(Array.isArray(dfd_carddoc_v1Props) && dfd_carddoc_v1Props){
        setcgroupf48bf((pre:any)=>({...pre,t_name:dfd_carddoc_v1Props[0]?.t_name}));
      }
    } catch (err) {
      console.log(err)
    }
  }
  // console.log(cgroupf48bf.t_name)
  useEffect(() => {
    handleMapperValue()
  }, [cname1a23c?.refresh])

  if (cname1a23c?.isHidden) {
    return <></>
  }

  return (
    <div
      className=''
      style={{
        gridColumn: `3 / 5`,
        gridRow: `4 / 10`,
        gap: ``,
        height: `100%`,
        overflow: 'auto'
      }}
    >
      <Text className='' variant='body-3' color='primary' ellipsis={true}>
        {isDynamic ? item.t_name : (cgroupf48bf?.t_name || '')}
      </Text>
    </div>
  )
}

export default Textcname
