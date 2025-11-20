'use client'

import React, { useContext,useEffect,useRef,useState } from 'react' 
import { CompanyCard } from '@/app/TAAIComponents/CompanyCard';
import { Text } from '@gravity-ui/uikit';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { getCookie } from '@/app/components/cookieMgment';
import { AxiosService } from "@/app/components/axiosService";
import { codeExecution } from '@/app/utils/codeExecution';
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useRouter } from 'next/navigation';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import { te_refreshDto } from '@/app/interfaces/interfaces';
import {Modal} from '@gravity-ui/uikit';
////////////////// page import
import PageSamplescreenpage from '@/app/samplescreen_v1/samplescreen_v1page';
import jsonata from 'jsonata';
import "../../utils/styles.css";

const Cardcompany = ({checkToAdd,setCheckToAdd,encryptionFlagCompData}:any) => {
const token:string = getCookie('token');
const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {dfd_carddoc_v1Props, setdfd_carddoc_v1Props} = useContext(TotalContext) as TotalContextProps; 
  const {samplescreen_v1Props, setsamplescreen_v1Props}= useContext(TotalContext) as TotalContextProps; 
  //////////////////
  const[companiesData,setCompaniesData]=useState<any>([]);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const toast:any=useInfoMsg();
  const routes = useRouter();
  const prevRefreshRef = useRef(false);
/////////////
   //another screen
  const {group1d56d, setgroup1d56d}= useContext(TotalContext) as TotalContextProps  
  const {group1d56dProps, setgroup1d56dProps}= useContext(TotalContext) as TotalContextProps  
  const {company7395c, setcompany7395c}= useContext(TotalContext) as TotalContextProps  
  const {companygroup72d6d, setcompanygroup72d6d}= useContext(TotalContext) as TotalContextProps  
  const {companygroup72d6dProps, setcompanygroup72d6dProps}= useContext(TotalContext) as TotalContextProps  
  const {cgroupf48bf, setcgroupf48bf}= useContext(TotalContext) as TotalContextProps  
  const {cgroupf48bfProps, setcgroupf48bfProps}= useContext(TotalContext) as TotalContextProps  
  const {ecom231c9, setecom231c9}= useContext(TotalContext) as TotalContextProps  
  const {ecom231c9Props, setecom231c9Props}= useContext(TotalContext) as TotalContextProps  
  //////////////

  const handleMapperDetails=async()=>{
    try{
    let code:any;
    const orchestrationData:any = await AxiosService.post("/UF/Orchestration",{key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1",  componentId:"32cccc4278934d4cba94a6471941d56d",controlId:"e771816f440244708655a9de7f17395c",isTable:false,accessProfile:accessProfile,from:"companyCardcompany"},{
      headers: {
        Authorization: `Bearer ${token}`
    }})
    code = orchestrationData?.data?.code
    if (code != '') {
      let codeStates: any = {}
          codeStates['group']  = group1d56d,
          codeStates['setgroup'] = setgroup1d56d,
          codeStates['companygroup']  = companygroup72d6d,
          codeStates['setcompanygroup'] = setcompanygroup72d6d,
          codeStates['cgroup']  = cgroupf48bf,
          codeStates['setcgroup'] = setcgroupf48bf,
          codeStates['ecom']  = ecom231c9,
          codeStates['setecom'] = setecom231c9,
      codeExecution(code,codeStates)
    }
    if (orchestrationData?.data) {
      let mapperData = orchestrationData?.data?.mapper
      const finalMappedCompanies: any[] = []

      dfd_carddoc_v1Props.forEach((item: any) => {
        const mappedCompany: any = {}

          mapperData.forEach(async (map: any) => {
            const sourcePath = map.sourceKey[0]
            const targetPath = map.targetKey
            const raw = sourcePath.split('|').pop()
            const path = raw
              .split('.')
              .filter((part: any) => part !== 'items' && part !== 'properties')
              .join('.')
            const sourceKey = path
            const targetKey = targetPath.split('|').pop()
            const expr = jsonata(sourceKey)
            const result = await expr.evaluate(item)
            mappedCompany[targetKey] = result
          })

        finalMappedCompanies.push(mappedCompany)
      })
      setCompaniesData(finalMappedCompanies)
     }
    }catch(err){
      console.log(err)
    }
  }

const handleViewDetails = async(value:any) => {
            // showProfileAsModal
    let filterProps:any =  [];
    let filterData = await getFilterProps(filterProps,group1d56d);
    setsamplescreen_v1Props([...filterData ]);
    setShowProfileAsModalOpen(true);
};

async  function handleConfirmOnClick(){
  }

useEffect(() => {
  handleMapperDetails();
}, []);

useEffect(() => {
  if(Array.isArray(dfd_carddoc_v1Props)){
    setgroup1d56d((pre:any)=>({...pre,t_id:dfd_carddoc_v1Props[0]?.t_id}));
  }
},[dfd_carddoc_v1Props])

 if (company7395c?.isHidden) {
    return <></>
  }  

return(
<div className="" style={{gridColumn: `1 / 13`,gridRow: `2 / 79`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Modal open={showProfileAsModalOpen} onClose={() => setShowProfileAsModalOpen(false)} contentClassName='w-[] h-[] bg-gray-50 mx-auto rounded-lg shadow-xl p-5 overflow-auto'>
      <div className='flex h-[30px] w-full justify-end'>
        <button
          className='flex w-[30px] justify-end'
          onClick={() => setShowProfileAsModalOpen(false)}
        >
          X
        </button>
      </div>
      <PageSamplescreenpage/>
      </Modal>
  <div className="app-container">
    <h1>All Companies</h1>

    {/* Search bar from your image */}
    <input
        type="search"
        placeholder="Search companies..."
        className="search-bar"
    />

    {/* The list of company cards */}
    <div className="company-list-container">
        {Array.isArray(companiesData) &&
          companiesData.map((company: any, index: number) => {
            return (
              <CompanyCard
                key={company.id || `company-${index}`}
                company={company}
                onViewDetails={handleViewDetails}
              />
            )
          })}
      </div>
  </div>
</div>
)
}

export default Cardcompany
