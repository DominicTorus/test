'use client'
import { Grid } from "@gravity-ui/page-constructor";
import { useLanguage } from "../components/languageContext";
import React,{ useContext,useEffect,useState } from "react";
import { AxiosService } from '@/app/components/axiosService';
import { uf_authorizationCheckDto,te_refreshDto,te_dfDto } from '@/app/interfaces/interfaces';
import { codeExecution } from "../utils/codeExecution";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from "../globalContext";
import decodeToken from "../components/decodeToken";
import { useRouter } from 'next/navigation';
import { useTheme } from '@/hooks/useTheme';
import GroupParent  from "./GroupParent/GroupParent";


export default function PageDynamicgroupV1() {
  const { isDark, isHighContrast, bgStyle, textStyle } = useTheme();
  const token:string = getCookie('token'); 
  const decodedTokenObj: any = decodeToken(token);
  const user = decodedTokenObj?.selectedAccessProfile;
  const { encAppFalg,setEncAppFalg}= useContext(TotalContext) as TotalContextProps;
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps;
  const {lockedData, setLockedData} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps;
  const { eventEmitterData,setEventEmitterData}= useContext(TotalContext) as TotalContextProps;
  const {company_v1Props, setcompany_v1Props} = useContext(TotalContext) as TotalContextProps;
  const [initialLoad, setInitialLoad] = useState(false);
  const securityData:any={
  "Employee": {
    "allowedGroups": [
      "canvas",
      "parent",
      "container",
      "dynamic",
      "tableecom"
    ]
  }
};
  const code:any="";
  //const language=useLanguage();
  const routes = useRouter();
  const toast=useInfoMsg();
  const [primaryTableData, setPrimaryTableData] = useState<any>({primaryKey:"",value:"",compName:""});
  const [checkToAdd, setCheckToAdd] = useState<any>({});
  const [dropdownData, setDropdownData] = useState<any>({});
  const encryptionFlagPage: boolean = false|| encAppFalg.flag;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encAppFalg.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encAppFalg.method;
  let encryptionFlagPageData :any ={
    "flag":encryptionFlagPage,
    "dpd":encryptionDpd,
    "method":encryptionMethod
  }
  const [checkparent,setCheckparent,]=useState(false);
  const [checkcontainer,setCheckcontainer,]=useState(false);
  const [checkdynamic,setCheckdynamic,]=useState(false);
  const [checktableecom,setChecktableecom,]=useState(false);
  const {parent1d56d, setparent1d56d} = useContext(TotalContext) as TotalContextProps;
  const {container72d6d, setcontainer72d6d} = useContext(TotalContext) as TotalContextProps;
  const {dynamic9403b, setdynamic9403b} = useContext(TotalContext) as TotalContextProps;
  const {tableecom7ef45, settableecom7ef45} = useContext(TotalContext) as TotalContextProps;
  const {dfd_carddoc_v1Props, setdfd_carddoc_v1Props} = useContext(TotalContext) as TotalContextProps;

  async function securityCheck() {
    let encryptionData:any = {};
    if (token) {
      try {
        let introspect:any;
        if(encryptionFlagPage){
           introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1"
            }
          }) 
        }else{
          introspect = await AxiosService.get("/UF/introspect",{
            headers: {
              Authorization: `Bearer ${token}`
             },
            params: {
              key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1"  
            }
          })          
        }
        if(introspect?.data?.authenticated === false){
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct003/cg/tg1/v8';
        }
      }catch (err: any) {
        toast("The token is no longer active.", 'danger');
        localStorage.clear();
        deleteAllCookies();
        window.location.href = '/ct003/cg/tg1/v8';
      }
      try {
        let myAccount:any;
        if(encryptionFlagPage){
         myAccount = await AxiosService.get("/UF/myAccount-for-client",{
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
              dpdKey: encryptionDpd,
              method: encryptionMethod,
              key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1"
            }
        }) 
        }else{
          myAccount = await AxiosService.get("/UF/myAccount-for-client",{
           headers: {
             Authorization: `Bearer ${token}`
           },
            params: {
              key:"CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1"
            }
         })          
        }
        if( user != "" && user != null){
          setAccessProfile([user]);
        }
        let actionDetails:any = {
  "lock": {
    "lockMode": "Single",
    "name": "",
    "ttl": 30000
  },
  "stateTransition": {
    "sourceQueue": "",
    "sourceStatus": "",
    "targetQueue": "",
    "targetStatus": ""
  },
  "pagination": {
    "page": "1",
    "count": 11
  },
  "encryption": {
    "isEnabled": false,
    "selectedDpd": "",
    "encryptionMethod": ""
  },
  "events": {}
};
        try{
        let carddoc_v1Body:te_refreshDto={
          key: "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:CG:AFGK:TG1:AFK:cardDoc:AFVK:v1"+":",
          refreshFlag: "Y",
          count:parseInt(actionDetails?.pagination?.count) || 10,
          page:parseInt(actionDetails?.pagination?.page) || 1
        }
        if (encryptionFlagPage) {          
          carddoc_v1Body["dpdKey"] = encryptionDpd;
          carddoc_v1Body["method"] = encryptionMethod;
        }
        if(company_v1Props.length > 0){
          let filterData :any[] =[];
          for(let i=0;i< company_v1Props.length;i++){
            if(company_v1Props[i].DFDkey == "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:CG:AFGK:TG1:AFK:cardDoc:AFVK:v1"){
              delete company_v1Props[i].DFDkey;
              filterData.push(company_v1Props[i])
            }           
          }
          carddoc_v1Body['filterData'] = filterData;
        }
        const carddoc_v1Data:any=await AxiosService.post("/te/eventEmitter",carddoc_v1Body,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

          setdfd_carddoc_v1Props(carddoc_v1Data?.data?.dataset?.data || []);
          }catch(err:any)
          {
            if( typeof err =='string')
              toast(err, 'danger');
            else
              toast(err?.response?.data?.message, 'danger');
          }
        /////////
        //Code Execution
        if (code !="" ) {
          let codeStates: any = {}
          codeStates['parent'] = parent1d56d;
          codeStates['setparent'] = setparent1d56d;
          codeStates['container'] = container72d6d;
          codeStates['setcontainer'] = setcontainer72d6d;
          codeStates['dynamic'] = dynamic9403b;
          codeStates['setdynamic'] = setdynamic9403b;
          codeStates['tableecom'] = tableecom7ef45;
          codeStates['settableecom'] = settableecom7ef45;
          codeExecution(code,codeStates);
        }   
        setInitialLoad(true);        
      } catch (err: any) {
        toast(err?.message, 'danger');
      }
    
    }else{
      toast('token not found','danger');
    }    
  }
  const handleClick = () => {
    routes.push("/");
  }

  useEffect(() => {    
    securityCheck();
  }, [])
  return (
    <>
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-black'} `}
     style={{
        gridColumn: '',
        gridRow: '',
        gridAutoRows: '',
        columnGap: '',
        rowGap: '',
        display: '',
        gridTemplateColumns: '',
        gridTemplateRows: '',
        height: '',
        overflow: '',
        backgroundColor:bgStyle,
        backgroundImage:'',
        backgroundPosition: '',
        backgroundSize: '',
        backgroundRepeat: '',
        backgroundAttachment: '',
        backgroundClip: '',
        backgroundBlendMode: '',
        color: textStyle,
        minHeight: '100vh',
        ...(isHighContrast && {
          fontWeight: '500',
          borderWidth: '2px'
      })
      }}>
    {securityData[accessProfile]?.allowedGroups?.includes("parent") && initialLoad &&<GroupParent  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}
          encryptionFlagPageData={encryptionFlagPageData}        />}
          </div> 
    </>
  )
}
    