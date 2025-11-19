'use client'
import React, { useContext, useState, useEffect } from 'react'
import {  Clock,  CircleCheckFill,  OctagonXmark,}  from '@gravity-ui/icons'
import { Icon, Text, Modal, Card } from '@gravity-ui/uikit'
import { AxiosService } from "@/app/components/axiosService";
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { getCookie } from '@/app/components/cookieMgment';
import { te_refreshDto,api_paginationDto} from '@/app/interfaces/interfaces';

const TimeLinetimeline = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {  
  const token: string = getCookie('token');
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null)
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({})
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const [allCode,setAllCode]=useState<any>("");
  const [steps, setSteps] = useState<any[]>([]);
    /////////////
  //another screen
  const {time96133, settime96133}= useContext(TotalContext) as TotalContextProps  
  const {time96133Props, settime96133Props}= useContext(TotalContext) as TotalContextProps  
  const {timeline1d3f6, settimeline1d3f6}= useContext(TotalContext) as TotalContextProps  
  //////////////

  let  label= "trs_status"


  const statusMap: Record<string, { iconData: any; bg: string }> = {
    waiting:{iconData:Clock, bg:"#F3FF73"},
    approved:{iconData:CircleCheckFill, bg:"#4CBB17"},
    rejected:{iconData:OctagonXmark, bg:"#F54927"},
  }

  const getTimelineData = async(value?:any)=>{
    let orchestrationBody : any = {
      key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:TimeLine:AFVK:v1",
      componentId: "8586e0691ae94ae5befea6d7f5996133",
      controlId: "0117526407dd4f8fa343803d0a41d3f6",
      isTable: false,
      accessProfile:accessProfile,
      from:"TimeLinetimeline"
    }
    if(encryptionFlagCont) {
    orchestrationBody["dpdKey"] = encryptionDpd
    orchestrationBody["method"] = encryptionMethod
    } 
    const orchestrationData: any = await AxiosService.post(
      '/UF/Orchestration',
      orchestrationBody,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    setAllCode(orchestrationData?.data?.code)
    let te_refreshBody: te_refreshDto = {
      key: orchestrationData.data.mapper[0].sourceKey[0].split('|')[0] + ':' || '',
      upId: "",
      refreshFlag: "Y",
      count:1000,
      page:1
    }
    if(encryptionFlagCont) {
      te_refreshBody["dpdKey"] = encryptionDpd
      te_refreshBody["method"] = encryptionMethod
    }
    const te_refresh: any = await AxiosService.post(
      '/te/eventEmitter',
      te_refreshBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    let dstKey = orchestrationData.data.mapper[0].sourceKey[0].split('|')[0] + ':' || ''
    dstKey = dstKey.replace(':AFC:', ':AFCP:').replace(':AF:', ':AFP:').replace(':DF-DFD:', ':DF-DST:')

    let api_pagination: any
    const api_paginationBody: api_paginationDto = {
      key: dstKey,
      page: 1,
      count: 100,
      searchFilter: {"companycode":time96133?.companycode},
    }
    if (encryptionFlagCont) {
      api_paginationBody['dpdKey'] = encryptionDpd
      api_paginationBody['method'] = encryptionMethod
    }
    api_pagination = await AxiosService.post(
      '/UF/pagination',
      api_paginationBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    
    //const filteredData = steps.filter((item:any) => item?.companycode === time96133?.t_id);
    //setSteps(filteredData) 
    let data = api_pagination?.data?.records || []
    if(time96133?.companycode){
      setSteps(data)
    }else{
      setSteps([])
    }
  }

  useEffect(() => {
    getTimelineData(time96133?.companycode)
  },[ time96133?.companycode])

  return (
    <div className="overflow-hidden rounded-xl border bg-white p-4 shadow-lg" style={{gridColumn: `2 / 11`,gridRow: `8 / 142`, gap:``, height: `100%`, overflow: 'auto'}} >
      <div className='flex justify-center p-3'>
        <Text variant='display-1' className='text-xs sm:text-sm font-medium md:text-base'>
          timeline
        </Text>
      </div>

      <ol className='relative ml-4 border-l border-gray-200 h-[50vh] overflow-auto x scrollbar-none'>
        {steps.map((step, idx) => {
          const isLeft = idx % 2 === 0
          const statusStyles = statusMap[step.trs_status] || {
            icon: null,
            bg: 'bg-gray-100'
          };
          return (
            <li
              key={idx}
              className={`mb-12 flex w-full justify-${isLeft ? 'start' : 'end'} relative`}
            >
              {idx !== steps.length - 1 && (
                <div
                  className={`absolute left-1/2 top-10 h-full w-0.5 -translate-x-1/2 transform `}
                  style={{ backgroundColor: statusStyles.bg }}
                />
              )}

              <span
                className={`absolute left-1/2 top-2 z-10 flex h-8 w-8 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-white `}
                style={{ 
                  backgroundColor: statusStyles.bg,
                 }}>
                {statusStyles.iconData && (
                  <Icon data={statusStyles.iconData} size={20} className={`text-white`} />
                )}
              </span>

              <Card
                type='action'
                onClick={e => {
                  e.stopPropagation()
                  setActiveStepIndex(idx)
                }}
                className={`
                  w-full sm:max-w-[80%] md:max-w-[60%] lg:max-w-[45%] xl:max-w-[40%]
                  min-h-[100px] max-h-[300px] overflow-auto
                  rounded-lg p-4 transition-all duration-200
                  ${expandedSteps[idx] ? 'bg-gray-50' : 'hover:bg-gray-50'}
                  ${isLeft ? 'mx-auto sm:ml-auto sm:mr-4' : 'mx-auto sm:ml-4 sm:mr-auto'}
                `}
              >
                <time className='mb-1 block text-gray-500 text-lg sm:text-sm'>
                  {new Date(step.trs_created_date).toLocaleString()}
                </time>
                <Text  className='text-lg sm:text-sm'>
                  {step[label]}
                </Text>
              </Card>
            </li>
          )
        })}
      </ol>

      <Modal open={activeStepIndex !== null} onClose={() => setActiveStepIndex(null)}>
        {activeStepIndex !== null && (
          <div className='p-6'>
            <h3 className='mb-2 text-lg font-semibold'>
              {steps[activeStepIndex][label]}
            </h3>
            <p className='mb-4 text-sm text-gray-500'>
              {new Date(steps[activeStepIndex].trs_created_date).toLocaleString()}
            </p>
            {steps[activeStepIndex] && (
              <div className='mb-3 grid grid-cols-2 gap-2 text-sm'>
                {Object.entries(steps[activeStepIndex]).map(([key, value]) => (
                  <div key={key}>
                    <span className='font-medium text-gray-500'>{key}:</span> {String(value)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default TimeLinetimeline
