
'use client'
import { useContext, useEffect, useState, useRef } from 'react'
import { codeExecution } from '@/app/utils/codeExecution'
import { getCookie } from '@/app/components/cookieMgment'
import { TotalContext, TotalContextProps } from '@/app/globalContext'
import { AxiosService } from '@/app/components/axiosService'
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { Tooltip } from '@/components/Tooltip'
import {BarChart} from '@/components/BarChart';
import { Text } from "@/components/Text";
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { Card } from '@/components/Card';

type ContentAlign = "left" | "center" | "right";

interface BarChartsbarChartCompProps {
  encryptionFlagCompData: any;
}

export default function BarChartsbartchart({ 
  encryptionFlagCompData,
}: BarChartsbarChartCompProps) {
  const token: string = getCookie('token'); 
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps;
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps;
  const [data,setData] = useState<any>([])
  const {dfd_mydfddata_v1Props, setdfd_mydfddata_v1Props} = useContext(TotalContext) as TotalContextProps;
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef(false);
  const toast:any=useInfoMsg();
  /////////////
   //another screen
  const {firstgroupc08a7, setfirstgroupc08a7}= useContext(TotalContext) as TotalContextProps;  
  const {firstgroupc08a7Props, setfirstgroupc08a7Props}= useContext(TotalContext) as TotalContextProps;  
  const {secondgroup311a5, setsecondgroup311a5}= useContext(TotalContext) as TotalContextProps;  
  const {secondgroup311a5Props, setsecondgroup311a5Props}= useContext(TotalContext) as TotalContextProps;  
  const {linechart0ad1b, setlinechart0ad1b}= useContext(TotalContext) as TotalContextProps;  
  const {piechart4e57f, setpiechart4e57f}= useContext(TotalContext) as TotalContextProps;  
  const {bartchart015eb, setbartchart015eb}= useContext(TotalContext) as TotalContextProps;  
  //////////////
  const handleMapperDetails=async()=>{
    try{
    const orchestrationData: any = await AxiosService.post(
    '/UF/Orchestration',
      {
        key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:propsCheck:AFVK:v1",
        componentId: "f4555848ac0a4de59dcbd10b142311a5",
        controlId: "41c1bfe0f1754439ab9375034dd015eb",
        isTable: false,
        accessProfile:accessProfile,
        from:"checkboxbarchart"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    let code:any= orchestrationData?.data?.code;
      if (code != '') {
        let codeStates: any = {}
          codeStates['firstgroup']  = firstgroupc08a7,
          codeStates['setfirstgroup'] = setfirstgroupc08a7,
          codeStates['secondgroup']  = secondgroup311a5,
          codeStates['setsecondgroup'] = setsecondgroup311a5,
        codeExecution(code,codeStates)
      }
      if(Array.isArray(dfd_mydfddata_v1Props) && dfd_mydfddata_v1Props?.length > 0){
        setData(dfd_mydfddata_v1Props)
        setsecondgroup311a5((pre:any)=>({...pre,description:dfd_mydfddata_v1Props[0]?.description}))
      }
      if(Array.isArray(dfd_mydfddata_v1Props)){
        return
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    if (prevRefreshRef.current) {
       handleMapperDetails()
    }else 
     prevRefreshRef.current= true
   },[bartchart015eb?.refresh])

  useEffect(() => {
    if(Array.isArray(dfd_mydfddata_v1Props) && dfd_mydfddata_v1Props?.length > 0){
      setData(dfd_mydfddata_v1Props)
      setsecondgroup311a5((pre:any)=>({...pre,description:dfd_mydfddata_v1Props[0]?.description}))
    }
  },[dfd_mydfddata_v1Props])

 
  if (bartchart015eb?.isHidden) {
    return <></>
  }
  return (
    <div
      className="w-full h-full"
      style={{gridColumn: `2 / 8`,gridRow: `83 / 129`, gap:``, height: `100%`}}
    >
      <BarChart
        data={data}
        showCurrencySign = "₹"
        title  = "Bar Chart"
        fillContainer={true}
        contentAlign="center"
        needTooltip={true}  
        tooltipProps={{title:"Tooltip",placement:"top-start"}}
        headerPosition='top'
        headerText="Header"
      />
    </div>
  );
}
