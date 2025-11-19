'use client'
import React, { useEffect, useState, useContext, useRef } from 'react'
import { Grid } from '@gravity-ui/page-constructor'
import { AxiosService } from '@/app/components/axiosService'
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces'
import { codeExecution } from '@/app/utils/codeExecution'
import { useRouter } from 'next/navigation'
import { getRouteScreenDetails } from '@/app/utils/assemblerKeys'
import { Magnifier, Xmark } from '@gravity-ui/icons'
import { Button, Icon, Modal } from '@gravity-ui/uikit'
import { eventBus } from '@/app/eventBus'
import Textcname from './Textcname'
import Buttonview from './Buttonview'
import { useInfoMsg } from '@/app/components/infoMsgHandler'
import { getCookie } from '@/app/components/cookieMgment'
import '../../globals.css'
import { TotalContext, TotalContextProps } from '@/app/globalContext'

const Groupcgroup = ({
  lockedData = {},
  setLockedData,
  primaryTableData = {},
  setPrimaryTableData,
  checkToAdd,
  setCheckToAdd,
  refetch,
  setRefetch,
  dropdownData,
  setDropdownData,
  encryptionFlagPageData,
  nodeData,
  setNodeData,
  paginationDetails,
  isFormOpen = false
}: any) => {
  const token: string = getCookie('token')
  const { refresh, setRefresh } = useContext(TotalContext) as TotalContextProps
  const { memoryVariables, setMemoryVariables } = useContext(
    TotalContext
  ) as TotalContextProps
  const { globalState, setGlobalState } = useContext(
    TotalContext
  ) as TotalContextProps
  const { accessProfile, setAccessProfile } = useContext(
    TotalContext
  ) as TotalContextProps
  let code: any = ``
  const encryptionFlagComp: boolean = encryptionFlagPageData?.flag || false
  let encryptionDpd: string = ''
  encryptionDpd =
    encryptionDpd !== '' ? encryptionDpd : encryptionFlagPageData?.dpd
  let encryptionMethod: string = ''
  encryptionMethod =
    encryptionMethod !== '' ? encryptionMethod : encryptionFlagPageData?.method
  let encryptionFlagCompData: any = {
    flag: encryptionFlagComp,
    dpd: encryptionDpd,
    method: encryptionMethod
  }
  const securityData: any = {
    Employee: {
      allowedControls: ['cname', 'view'],
      allowedGroups: ['canvas', 'group', 'companygroup', 'cgroup', 'ecom'],
      blockedControls: [],
      readOnlyControls: []
    }
  }
  const prevRefreshRef = useRef(false)
  const [allowedComponent, setAllowedComponent] = useState<any>('')
  const [allowedControls, setAllowedControls] = useState<any>('')
  const toast = useInfoMsg()
  const confirmMsgFlag: boolean = false
  const [allCode, setAllCode] = useState<any>('')
  const routes = useRouter()
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] =
    React.useState(false)
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] =
    React.useState(false)
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
  const { dfd_carddoc_v1Props, setdfd_carddoc_v1Props } = useContext(
    TotalContext
  ) as TotalContextProps
  //////////////
  const [open, setOpen] = React.useState(false)
  async function securityCheck() {
    const orchestrationData: any = await AxiosService.post(
      '/UF/Orchestration',
      {
        key: 'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1',
        componentId: 'da45b14879804ac29be98648221f48bf',
        from: 'GroupCgroup',
        accessProfile: accessProfile
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    code = orchestrationData?.data?.code
    const security: any[] = orchestrationData?.data?.security
    const allowedGroups: any[] = orchestrationData?.data?.allowedGroups
    if (orchestrationData?.data?.error === true) {
      toast(orchestrationData?.data?.errorDetails?.message, 'danger')
      return
    }
    setAllowedControls(security)
    setAllowedComponent(allowedGroups)

    /////////////
    if (orchestrationData?.data?.readableControls.includes('cname')) {
      setcname1a23c({ ...cname1a23c, isDisabled: true })
    }
    if (orchestrationData?.data?.readableControls.includes('view')) {
      setview155e3({ ...view155e3, isDisabled: true })
    }
    //////////////
    if (code != '') {
      let codeStates: any = {}
      ;(codeStates['group'] = group1d56d),
        (codeStates['setgroup'] = setgroup1d56d),
        (codeStates['companygroup'] = companygroup72d6d),
        (codeStates['setcompanygroup'] = setcompanygroup72d6d),
        (codeStates['cgroup'] = cgroupf48bf),
        (codeStates['setcgroup'] = setcgroupf48bf),
        (codeStates['ecom'] = ecom231c9),
        (codeStates['setecom'] = setecom231c9),
        codeExecution(code, codeStates)
    }
  }

  const handleOnload = () => {}
  const handleOnChange = () => {}
  const cgroupf48bfRef = useRef<any>(null)
  const handleClearSearch = () => {
    cgroupf48bfRef.current?.setSearchParams()
    cgroupf48bfRef.current?.handleSearch({})
  }

  useEffect(() => {
    securityCheck()
    handleOnload()
    if (prevRefreshRef.current) {
      if (!Array.isArray(cgroupf48bf) && Object.keys(cgroupf48bf)?.length > 0) {
        setcgroupf48bf({})
      }
    } else prevRefreshRef.current = true
  }, [cgroupf48bfProps?.refresh])
  return (
    <>
      {dfd_carddoc_v1Props.map((item: any, idx: number) => {
 console.log(idx)
        return (
          <div
            key={item.t_id}
            // style={{
            //   gridAutoRows: '4px',
            //   columnGap: '0px',
            //   rowGap: '0px',
            //   display: 'grid',
            //   gridTemplateColumns: 'repeat(12, 3fr)',
            //   gridTemplateRows: 'repeat(auto-fill, minmax(5px, 2fr))',
            //   border: '1px solid #dcdcdc',
            //   // gridColumn: '2 / 6',
            //   // gridRow: '4 / 48',
            //   height: '100%',
            //   overflow: 'auto',
            // }}
            
            style={{
              background: '#ffffff',
              border: '1px solid #dcdcdc',
              borderRadius: '8px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              minHeight: '240px',
              width: '200px', // Consistent card height
              breakInside: 'avoid' // Prevent cards from breaking
            }}
          >
            {allowedControls.includes('cname') ? (
             
              <>
                <Textcname
                  isDynamic={true}
                  index={idx}
                  item={item}
                  checkToAdd={checkToAdd}
                  setCheckToAdd={setCheckToAdd}
                  refetch={refetch}
                  setRefetch={setRefetch}
                  encryptionFlagCompData={encryptionFlagCompData}
                />
              </>
            ) : null}

            {allowedControls.includes('view') ? (
              <>
                <Buttonview
                  lockedData={lockedData}
                  setLockedData={setLockedData}
                  primaryTableData={primaryTableData}
                  setPrimaryTableData={setPrimaryTableData}
                  checkToAdd={checkToAdd}
                  setCheckToAdd={setCheckToAdd}
                  refetch={refetch}
                  setRefetch={setRefetch}
                  encryptionFlagCompData={encryptionFlagCompData}
                />
              </>
            ) : null}
          </div>
        )
      })}
    </>
  )
}

export default Groupcgroup
