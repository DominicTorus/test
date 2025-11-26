'use client'
import { TotalContext, TotalContextProps } from '@/app/globalContext'
import JsonView from "react18-json-view";
import 'react18-json-view/src/style.css'
import {
  Col,
  Flex,
  Row,
  Table,
  TableDataItem,
  TableProps,
  withTableSettings,
  WithTableSettingsProps,
  withTableSorting,
  withTableSelection,
  WithTableSelectionProps,
  RenderRowActionsProps,
  withTableActions,
  WithTableActionsProps
} from '@gravity-ui/uikit'
import { DatePicker } from '@gravity-ui/date-components'
import React, { useEffect, useState,useContext, useRef, useImperativeHandle} from 'react'
import { AxiosService } from '@/app/components/axiosService'
import { useInfoMsg } from "@/app/components/infoMsgHandler"
import { getCookie } from "@/app/components/cookieMgment"
import { nullFilter } from '@/app/utils/nullDataFilter';
import { codeExecution } from '@/app/utils/codeExecution'
import { uf_fetchActionDetailsDto,uf_fetchRuleDetailsDto,te_refreshDto,api_paginationDto,uf_paginationDataFilterDto } from '@/app/interfaces/interfaces';
import { useRouter } from 'next/navigation'
import {Modal} from '@gravity-ui/uikit';
import { eventBus } from '@/app/eventBus';
import { getFilterProps, getRouteScreenDetails } from '@/app/utils/assemblerKeys';
import i18n from '@/app/components/i18n';
import { Pagination, PaginationProps} from '@gravity-ui/uikit'
import { Button, Icon,TextInput } from '@gravity-ui/uikit'
import {Magnifier} from '@gravity-ui/icons';
import Buttonview  from './Buttonview'

const MyTable: React.ComponentType<
  TableProps<TableDataItem> &
      WithTableSettingsProps &
    WithTableSelectionProps<TableDataItem> &
    WithTableActionsProps<TableDataItem>|any
> =
  withTableSettings
(
  withTableSorting(
      withTableSelection
  (withTableActions(Table)))
)
let colourIndicatorCols:any= [] ;
let defaultColumns = [
  {
    "id": "t_name",
    "name": "Name",
    "meta": {
      "sort": true
    },
    "isSearch": false,
    "colourIndicator": []
  },
  {
    "id": "trs_status",
    "name": "Status",
    "meta": {
      "sort": true
    },
    "isSearch": false,
    "colourIndicator": []
  },
  {
    "id": "companycode",
    "name": "Company Code",
    "meta": {
      "sort": true
    },
    "isSearch": true,
    "colourIndicator": []
  },
  {
    "type": "__ActionDetails__",
    "id": "view",
    "name": "view",
    "controlType": "Button"
  }
] ;
for (let i = 0; i < defaultColumns.length; i++) {
  defaultColumns[i].id = defaultColumns[i].id.toLowerCase();
}
let mapperData:any;
let schemaDataDFO:any;
let mappperNodeId:any;


const TabletableEcom=({ lockedData,setLockedData,primaryTableData, setPrimaryTableData,refetch, setRefetch,setData,encryptionFlagCompData,open, setOpen, ref }: any)=>{
  const token: string | any = getCookie('token');
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
  const {refresh, setRefresh} = useContext(TotalContext) as TotalContextProps;
  const {memoryVariables, setMemoryVariables} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [translatedColumns,setTranslatedColumns]= useState<any>([])
  const securityData:any={
  "Employee": {
    "allowedControls": [
      "t_id",
      "t_name",
      "trs_status",
      "companycode",
      "view"
    ],
    "blockedControls": [],
    "readOnlyControls": []
  }
}
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method
  const upId: string | any = getCookie('upId')
  let dfKey: string | any
  let dfdType : string | any
  const toast =useInfoMsg()
  const [columns,setColumns]=useState<any>([])
  const [allCode, setAllCode] = React.useState();
  const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0,
  })
  const routes = useRouter()
  const [allData, setAllData] = React.useState([]);
  const [allDataObject, setAllDataObject] = React.useState([]);
  const [showProfileAsModalOpen, setShowProfileAsModalOpen] = React.useState(false);
  const [showElementAsPopupOpen, setShowElementAsPopupOpen] = React.useState(false);
  const keyset:any=i18n.keyset("language") 
    const [needLockingAndRule, setNeedLockingAndRule] = useState({
      lockMode: 'Single',
      ttl: ''
    })
  const [DFkeyAndRule, setDFkeyAndRule] = React.useState({
    isRulePresent:false,
    dfKey:"",
    dfdType:""
  })
 /////////////
   //another screen
  const {parent1d56d, setparent1d56d}= useContext(TotalContext) as TotalContextProps  
  const {parent1d56dProps, setparent1d56dProps}= useContext(TotalContext) as TotalContextProps  
  const {container72d6d, setcontainer72d6d}= useContext(TotalContext) as TotalContextProps  
  const {container72d6dProps, setcontainer72d6dProps}= useContext(TotalContext) as TotalContextProps  
  const {dynamic9403b, setdynamic9403b}= useContext(TotalContext) as TotalContextProps  
  const {dynamic9403bProps, setdynamic9403bProps}= useContext(TotalContext) as TotalContextProps  
  const {tableecom7ef45, settableecom7ef45}= useContext(TotalContext) as TotalContextProps  
  const {tableecom7ef45Props, settableecom7ef45Props}= useContext(TotalContext) as TotalContextProps  
  const {t_id8da71, sett_id8da71}= useContext(TotalContext) as TotalContextProps  
  const {t_name3f53e, sett_name3f53e}= useContext(TotalContext) as TotalContextProps  
  const {trs_statusd040b, settrs_statusd040b}= useContext(TotalContext) as TotalContextProps  
  const {companycodef6591, setcompanycodef6591}= useContext(TotalContext) as TotalContextProps  
  const {view761fb, setview761fb}= useContext(TotalContext) as TotalContextProps  
  //////////////

  function getValueByPath(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  // Utility to get nested value
  function getValueByPathForNested(obj: any, path: string): any {
    const keys = path.replace(/\[(\w+)\]/g, '.$1').split('.');
    return keys.reduce((acc, key) => acc?.[key], obj);
  }

  // Clean the mapper path
  function extractPath(sourcekey: string): string {
    const rawPath = sourcekey.split('|').pop() ?? '';
    // remove items.properties. since your actual data has direct keys
    return rawPath
      .replace(/items\.properties\./g, '')
      .replace(/items\./g, '')
      .replace(/properties\./g, '');
  }

  const GetTableDetails = async () => {
    mapperData = [
  {
    "elementname": "t_id",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:CG:AFGK:TG1:AFK:cardDoc:AFVK:v1|2719e448cf68401f84f1440401b49235|properties.t_id",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1|8b20aa67889c4c29914e60391497ef45|eca9fa0626c2498ea960f9e52488da71"
  },
  {
    "elementname": "t_name",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:CG:AFGK:TG1:AFK:cardDoc:AFVK:v1|2719e448cf68401f84f1440401b49235|properties.t_name",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1|8b20aa67889c4c29914e60391497ef45|cde67a62f34c4bfeaf3e84628253f53e"
  },
  {
    "elementname": "trs_status",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:CG:AFGK:TG1:AFK:cardDoc:AFVK:v1|2719e448cf68401f84f1440401b49235|properties.trs_status",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1|8b20aa67889c4c29914e60391497ef45|e0c46c47d7a047d4b19424d919bd040b"
  },
  {
    "elementname": "companycode",
    "sourcekey": "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:CG:AFGK:TG1:AFK:cardDoc:AFVK:v1|2719e448cf68401f84f1440401b49235|properties.companycode",
    "targetkey": "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1|8b20aa67889c4c29914e60391497ef45|2e6f5652992a404598005bde27cf6591"
  }
];
    schemaDataDFO = [
  {
    "nodeId": "fd1c0f65e4cd4c27b4e6644f7724e4a7",
    "nodeName": "apinode",
    "nodeType": "apinode",
    "schema": {
      "description": "Read all the records from the ecom table",
      "operationId": "ecomController_findAll",
      "parameters": [],
      "responses": {
        "200": {
          "description": "",
          "content": {
            "application/json": {
              "schema": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "t_id": {
                      "type": "number",
                      "example": "number"
                    },
                    "t_logourl": {
                      "type": "string",
                      "example": "string"
                    },
                    "t_name": {
                      "type": "string",
                      "example": "string"
                    },
                    "t_plan": {
                      "type": "string",
                      "example": "string"
                    },
                    "t_industry": {
                      "type": "string",
                      "example": "string"
                    },
                    "t_employees": {
                      "type": "number",
                      "example": "number"
                    },
                    "t_location": {
                      "type": "string",
                      "example": "string"
                    },
                    "t_revenue": {
                      "type": "number",
                      "example": "number"
                    },
                    "t_tags": {
                      "example": "string[]",
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "companycode": {
                      "type": "number",
                      "example": "number"
                    },
                    "trs_creator_email": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_created_date": {
                      "format": "date-time",
                      "type": "string",
                      "example": "datetime"
                    },
                    "trs_created_by": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_modified_date": {
                      "format": "date-time",
                      "type": "string",
                      "example": "datetime"
                    },
                    "trs_modified_by": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_status": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_next_status": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_process_id": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_access_profile": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_org_grp_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_org_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_role_grp_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_role_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_ps_grp_code": {
                      "type": "string",
                      "example": "string"
                    },
                    "trs_ps_code": {
                      "type": "string",
                      "example": "string"
                    }
                  },
                  "required": [
                    "t_id",
                    "t_logourl",
                    "t_name",
                    "t_plan",
                    "t_industry",
                    "t_employees",
                    "t_location",
                    "t_revenue",
                    "t_tags",
                    "companycode",
                    "trs_creator_email",
                    "trs_created_date",
                    "trs_created_by",
                    "trs_modified_date",
                    "trs_modified_by",
                    "trs_status",
                    "trs_next_status",
                    "trs_process_id",
                    "trs_access_profile",
                    "trs_org_grp_code",
                    "trs_org_code",
                    "trs_role_grp_code",
                    "trs_role_code",
                    "trs_ps_grp_code",
                    "trs_ps_code"
                  ]
                }
              }
            }
          }
        }
      },
      "security": [
        {
          "JWT-auth": []
        }
      ],
      "summary": "Read all the records",
      "tags": [
        "ERD API"
      ]
    }
  },
  {
    "nodeId": "2719e448cf68401f84f1440401b49235",
    "nodeName": "datasetschemanode",
    "nodeType": "datasetschemanode",
    "schema": {
      "$schema": "http://json-schema.org/draft-07/schema#",
      "title": "Generated schema for Root",
      "type": "object",
      "properties": {
        "t_id": {
          "type": "string"
        },
        "t_logourl": {
          "type": "string"
        },
        "t_name": {
          "type": "string"
        },
        "t_plan": {
          "type": "string"
        },
        "t_industry": {
          "type": "string"
        },
        "t_employees": {
          "type": "string"
        },
        "t_location": {
          "type": "string"
        },
        "t_revenue": {
          "type": "string"
        },
        "t_tags": {
          "type": "array"
        },
        "companycode": {
          "type": "string"
        },
        "trs_creator_email": {
          "type": "string"
        },
        "trs_created_date": {
          "type": "string"
        },
        "trs_created_by": {
          "type": "string"
        },
        "trs_modified_date": {
          "type": "string"
        },
        "trs_modified_by": {
          "type": "string"
        },
        "trs_status": {
          "type": "string"
        },
        "trs_next_status": {
          "type": "string"
        },
        "trs_process_id": {
          "type": "string"
        },
        "trs_access_profile": {
          "type": "string"
        },
        "trs_org_grp_code": {
          "type": "string"
        },
        "trs_org_code": {
          "type": "string"
        },
        "trs_role_grp_code": {
          "type": "string"
        },
        "trs_role_code": {
          "type": "string"
        },
        "trs_ps_grp_code": {
          "type": "string"
        },
        "trs_ps_code": {
          "type": "string"
        }
      },
      "required": [
        "t_id",
        "t_logourl",
        "t_name",
        "t_plan",
        "t_industry",
        "t_employees",
        "t_location",
        "t_revenue",
        "t_tags",
        "companycode",
        "trs_creator_email",
        "trs_created_date",
        "trs_created_by",
        "trs_modified_date",
        "trs_modified_by",
        "trs_status",
        "trs_next_status",
        "trs_process_id",
        "trs_access_profile",
        "trs_org_grp_code",
        "trs_org_code",
        "trs_role_grp_code",
        "trs_role_code",
        "trs_ps_grp_code",
        "trs_ps_code"
      ]
    }
  }
];
    mappperNodeId = "2719e448cf68401f84f1440401b49235";
    let schemaData:any = {}
    if(schemaDataDFO  && mappperNodeId){
      schemaDataDFO?.map((ele:any)=>{
        if(ele.nodeId==mappperNodeId){
          if (ele?.nodeType == 'datasetnode' || ele?.nodeType == 'datasetschemanode'){
          if (ele?.schema?.type == "object") {
              schemaData = ele?.schema?.properties;
          }else if (ele?.schema?.type == "array") {
              schemaData = ele?.schema?.items?.properties;
          }                            
          }else if (ele?.nodeType == 'apinode') {
          if (ele?.schema?.responses["200"].content["application/json"].schema?.type == "object") {
              schemaData = ele?.schema?.responses["200"].content["application/json"].schema?.properties;
          }else if (ele?.schema?.responses["200"].content["application/json"].schema?.type == "array") {
              schemaData = ele?.schema?.responses["200"].content["application/json"].schema?.items?.properties;
          }
          }else if (ele?.nodeType == 'dbnode') {
          let temp:any = {}
          ele?.schema.map((cols:any)=>{
              temp[cols.name]={type:cols.type}
          })
          schemaData = temp;
          } 
        }
      })
    }
    let altertColumns:any=[];
    let allowesColumns:any=[];
    defaultColumns.map((cols:any)=>{
      let temp:any = cols
      {
        if(securityData[accessProfile].allowedControls.includes(cols.id))
        {
          allowesColumns.push(temp)
        }
      }
    })
    setColumns(allowesColumns); 
    for (let i = 0; i < allowesColumns.length; i++) {
      for (let j = 0; j < mapperData.length; j++) {
        if (allowesColumns[i].id === mapperData[j]?.elementname.toLowerCase()) {
          let nodeId = mapperData[j]?.sourcekey.split("|")[1];
          let path = mapperData[j]?.sourcekey.split("|")[2];
          for (let k = 0; k < schemaDataDFO.length; k++) {
            if (schemaDataDFO[k].nodeId === nodeId) {                    
              altertColumns.push({...allowesColumns[i],type:getValueByPath(schemaDataDFO[k], path) || 'string'})
            }                 
          }
        }
      }            
    }
    altertColumns=altertColumns.filter((ele:any)=>ele?.type!= '__ActionDetails__')
    const translatedColumnsData = altertColumns.map((col:any) => ({
      ...col,
      name: keyset(col?.name), 
      }));
    setTranslatedColumns(translatedColumnsData)
    // for pagination data page ,count and dfkey
    setPaginationData((pre: any) => ({
      ...pre,
      page: 1,
      pageSize: 5
    }))

    setDFkeyAndRule((pre:any)=>({
      ...pre,
        isRulePresent:false,
        dfKey:"CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:CG:AFGK:TG1:AFK:cardDoc:AFVK:v1:",
        dfdType:""
    }))

    dfKey = "CK:CT003:FNGK:AF:FNK:DF-DFD:CATK:CG:AFGK:TG1:AFK:cardDoc:AFVK:v1:"
    dfdType =""
    
    // for locking data ttl ,mode and rule
    setNeedLockingAndRule((pre: any) => ({
      ...pre,
      lockMode:"Single",
      ttl :0
    }))
    
    fetchData(1,5,{},{dfKey,dfdType},false,false)
  }

  const [SearchParams,setSearchParams] = useState<any>({})

    const setLockMode=async(ids:any)=>{
    /// settableEcom7ef45Props
    let postIds: any = []
    let processIds: any = []
    let selectedData:any=[]
    if(needLockingAndRule.lockMode=='Single'){
      // its for ui level selected list show for single select
      if (ids.length == 0) {
        let keys:any
        settableecom7ef45Props((pre:any)=>({...pre, selectedIds:[]}))
        
        return
      }

      tableecom7ef45.filter((item:any,id:number)=>{
        if (ids[ids.length - 1] == id.toString()){
          selectedData?.push(allData[id])
          postIds.push(item.t_id)
          processIds.push(item?.trs_process_id)
        }
      })
      /////////
      //////////
      settableecom7ef45Props((pre:any)=>({...pre, selectedIds:[ids[ids.length-1]]}))      
    }
    else if(needLockingAndRule.lockMode==='Multi'){
      // its for ui level selected list show for multi select
      tableecom7ef45.filter((item:any,id:number)=>{
        if (ids.includes(id.toString())){
          selectedData?.push(allData[id])
          postIds.push(item.t_id) 
          processIds.push(item?.trs_process_id)
        } 
      })
      settableecom7ef45Props((pre:any)=>({...pre, selectedIds:ids}))
    }
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      let itsAlreadyThere: boolean = false
      selectedPaginationData.map((item: any) => {
        if (item.page == paginationData.page) {
          itsAlreadyThere = true
        }
      })
      if (itsAlreadyThere) {
        for (let i = 0; i < checkedData.length; i++) {
          if (checkedData[i].page == paginationData.page) {
            checkedData[i].data = ids
            break
          }
        }
      } else {
        checkedData = [
          ...checkedData,
          {
            page: paginationData.page,
            data: ids
          }
        ]
      }
    } else {
      checkedData.push({
        page: paginationData.page,
        data: ids
      })
    }
    setSelectedPaginationData(checkedData)

    setLockedData({
      ...lockedData,
      processIds: processIds,
      data:selectedData,
      primaryKeys: postIds,
      lockMode: needLockingAndRule,
      ttl: needLockingAndRule.ttl
    })

  }
  const [selectedPaginationData, setSelectedPaginationData] = useState<any[]>(
      []
    )
  const [settings, setSettings] = useState<any>();
  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>{
    let searchParams:any = nullFilter(SearchParams);
    settableecom7ef45Props((pre:any)=>({...pre, selectedIds:[]}))
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          settableecom7ef45Props((pre:any)=>({...pre, selectedIds:checkedData[i].data}))
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false)
  }
  const [filterValue, setFilterValue] = useState('')
  const [filterColumn, setFilterColumn] = useState(columns[0]?.id)

  async function fetchData(page:any = 1, pageSize:any = 10, searchParams = {},dfKey:any,isRulePresent:any=false,isOnLoad = false) {
    if(isRulePresent==undefined)
      isRulePresent=DFkeyAndRule?.isRulePresent||false
 
    let dstKey=dfKey?.dfKey
    dstKey=dstKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
    try {

      let api_pagination: any
      if (isRulePresent==false) {
        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          page: parseInt(page),
          count: parseInt(pageSize),
          searchFilter: searchParams
        }
        if(encryptionFlagCont) {
        api_paginationBody["dpdKey"] = encryptionDpd
        api_paginationBody["method"] = encryptionMethod
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
        if (api_pagination?.data?.error == true) {
          toast(api_pagination?.data?.errorDetails?.message, 'danger')
          return
        }
        setAllData(api_pagination?.data?.records)
        setPaginationData(prevState => ({
          ...prevState,
          total: api_pagination.data.totalRecords
        }))
        if (api_pagination.data.records.length == 0 && api_pagination.data.totalRecords != 0) {
          api_paginationBody.page =  page-1
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
        setAllData(api_pagination?.data?.records)
            setPaginationData(prevState => ({
          ...prevState,
          page: page-1,
          total: api_pagination.data.totalRecords
        }))
        }
        if(api_pagination?.data?.records.length==0){ 
          settableecom7ef45([])
          setAllDataObject([])
          return
        }
      } else {
        const api_paginationBody: api_paginationDto = {
          key: dstKey,
          page: parseInt(page),
          count: parseInt(pageSize),
          filterDetails: {
            ufKey:'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1:UO', 
            nodeId: '8b20aa67889c4c29914e60391497ef45',
            elementId: '8b20aa67889c4c29914e60391497ef45'
          },
          searchFilter: searchParams
        }
        if(encryptionFlagCont) {
        api_paginationBody["dpdKey"] = encryptionDpd
        api_paginationBody["method"] = encryptionMethod
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
        if (api_pagination?.data?.error == true) {
          toast(api_pagination?.data?.errorDetails?.message, 'danger')
          return
        }
        setAllData(api_pagination?.data?.records)
        setPaginationData(prevState => ({
          ...prevState,
          total: api_pagination.data.totalRecords
        }))
        if (api_pagination.data.records.length == 0 && api_pagination.data.totalRecords != 0) {
          api_paginationBody.page =  page-1
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
        setAllData(api_pagination?.data?.records)
            setPaginationData(prevState => ({
          ...prevState,
          page: page-1,
          total: api_pagination.data.totalRecords
        }))
        }
        if(api_pagination?.data?.records.length==0){ 
          settableecom7ef45([])
          setAllDataObject([])
          return
        }
      }
      if (api_pagination?.data?.records.length > 0) {
        const mappedResult: Record<string, any>[] = api_pagination?.data?.records.map((emp:any) => {
        const result: Record<string, any> = {};

        mapperData.forEach((m:any) => {
          const path = extractPath(m.sourcekey);
          const value = getValueByPathForNested(emp, path);
          result[m.elementname] = value;
        });

        result.trs_next_status = emp.trs_next_status;
        result.trs_status = emp.trs_status;
        result.trs_process_id = emp.trs_process_id;
        result.trs_access_profile = emp.trs_access_profile;
        result.trs_org_grp_code = emp.trs_org_grp_code;
        result.trs_org_code = emp.trs_org_code;
        result.trs_role_grp_code = emp.trs_role_grp_code;
        result.trs_role_code = emp.trs_role_code;
        result.trs_ps_grp_code = emp.trs_ps_grp_code;
        result.trs_ps_code = emp.trs_ps_code;

        return result;
        });
        let uf_paginationDataFilter: any = {};
        uf_paginationDataFilter["data"] = mappedResult;
      // const uf_paginationDataFilterBody: uf_paginationDataFilterDto = {
      //   data: api_pagination.data.records,
      //   key: 'CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG1:AFK:Company:AFVK:v1',
      //   "dfdType":dfKey?.dfdType,
      //   "primaryKey":"t_id"
      // }
      // if(encryptionFlagCont) {
      // uf_paginationDataFilterBody["dpdKey"] = encryptionDpd
      // uf_paginationDataFilterBody["method"] = encryptionMethod
      // }
      // const uf_paginationDataFilter = await AxiosService.post(
      //   '/UF/PaginationDataFilter',
      //   uf_paginationDataFilterBody,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Bearer ${token}`
      //     }
      //   }
      // )
      if (uf_paginationDataFilter.data.length >= 0&&Array.isArray(uf_paginationDataFilter.data)) {
        let filtertedData:any=structuredClone(uf_paginationDataFilter.data)||[]
        settableecom7ef45(uf_paginationDataFilter.data||[])
        defaultColumns.map((items:any)=>{
          if(items?.isColourIndicator==true)
          {
            for(let i=0;i<filtertedData.length;i++){
              filtertedData[i]={...filtertedData[i],[items?.id]:colurIndicator(items?.colourIndicator,filtertedData[i][items?.id])}
            }
          }
        })
        for (let i = 0; i < filtertedData.length; i++) {     
          let JSONType:any=filtertedData[i] || {}
          Object.keys(JSONType).map((key: any) => {
              if(typeof JSONType[key] === 'object' && JSONType[key] !== null && !colourIndicatorCols?.includes(key)) {
                  JSONType[key] =  <JsonView
                    theme="atom"
                    enableClipboard={true}
                    src={JSONType[key]}
                    style={{ fontSize: "0.833vw" }}
                    collapsed={true}
                  />
              }
          })
          filtertedData[i] = JSONType
        }
        setAllDataObject(filtertedData)
        return
      }
      }
    } catch (err: any) {
      toast(err?.response?.data?.errorDetails?.message, 'danger')
    }
  }
  const RowAction = ({item,index}: RenderRowActionsProps<any>) => {
    let filteredData:any={}
    if(allData.length!=0)
    {
      filteredData=allData[index]||{}
    }
    return <React.Fragment>
       <div className="flex gap-2">
        <Buttonview mainData={filteredData} setRefetch={setRefetch} encryptionFlagCompData={encryptionFlagCompData}/>
      </div>
    </React.Fragment>;
  };

  const colurIndicator = (keyValue:any=[], comingValue:any) => {

    let customeUI: JSX.Element | null = null;
    for (let i = 0; i < keyValue.length; i++) {
      if (keyValue[i]?.key == comingValue) {
        customeUI = (
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: keyValue[i]?.colorCode }}
          />
        );
        break;
      }
    }

    return customeUI;
  };

  useEffect(() => {
    GetTableDetails()
  }, [])

  async function UpdatedDataHandle() { 
    let te_refreshBody: te_refreshDto = {
        key: DFkeyAndRule?.dfKey,
        upId: upId,
        refreshFlag: "Y",
        count:11,
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

    fetchData(paginationData.page , paginationData.pageSize,{},DFkeyAndRule,DFkeyAndRule?.isRulePresent,true)
  }
  const [isHaveSearch,setisHaveSearch]=useState<any>(false)
  useImperativeHandle(ref, () => ({
    isHaveSearch,
    setSearchParams,
    handleSearch
  }));
  
  useEffect(() => {
    if(paginationData?.page != 0 && paginationData?.pageSize != 0 && DFkeyAndRule?.dfKey!='')
    UpdatedDataHandle()
    setLockedData((pre:any)=>({...pre, data:[]}))
    settableecom7ef45Props((pre:any)=>({...pre, selectedIds:[]}))
    setSelectedPaginationData([])
    setAllDataObject([])
  }, [tableecom7ef45Props?.refresh])

    async function handleSearch(SearchParams:any)
    {
      SearchParams=nullFilter(SearchParams)
      if(Object.keys(SearchParams).length==0)
      {
        setisHaveSearch(false)
      }else
      {
        setisHaveSearch(true)
      }
      let searchParams:any = nullFilter(SearchParams)
      await fetchData(1,10,searchParams,DFkeyAndRule,DFkeyAndRule?.isRulePresent,false)
    }

  const handlePrimaryTable = () => {
    let findData = tableecom7ef45Props?.selectedIds[tableecom7ef45Props?.selectedIds?.length-1]
    if(Array.isArray(tableecom7ef45) && tableecom7ef45.length>0)
    {
      let data = tableecom7ef45[findData]
      setPrimaryTableData({
        ...primaryTableData,
        primaryKey: "t_id",
        value: data["t_id"],
        parentData: data
      })
    }
  }

  useEffect(() => {
    if (tableecom7ef45Props?.selectedIds?.length != 0) handlePrimaryTable()
  }, [tableecom7ef45Props?.selectedIds])



  const getRowActions = () => {
  return [
    {
      text: 'Print',
      handler: () => {},
    },
    {
      text: 'Remove',
      handler: () => {},
      theme: 'danger',
    },
  ];
};
  function searchModal() {
    return (
      <div>
        <div
          className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out'
          onClick={() => setOpen(false)}
          style={{ opacity: open ? 1 : 0 }}
        />

        <div
          className='fixed inset-0 z-50 flex transform items-center justify-center p-4 transition-all duration-300 ease-in-out'
          style={{
            opacity: open ? 1 : 0,
            transform: open
              ? 'translateY(0) scale(1)'
              : 'translateY(-50px) scale(0.95)'
          }}
        >
          <div
            className='max-h-[80vh] w-full max-w-md transform overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 ease-in-out'
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className='animate-slide-down flex items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 p-6'>
              <h2 className='text-lg font-semibold text-gray-900'>Filter</h2>
              <button
                onClick={() => setOpen(false)}
                className='rounded-full p-2 transition-all duration-200 ease-in-out hover:scale-110 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95'
                aria-label='Close modal'
              >
                <span className='text-xl font-bold leading-none text-gray-500'>
                  &times;
                </span>{' '}
              </button>
            </div>

            <div className='flex flex-col gap-4 p-6 sm:p-8'>

              {translatedColumns.map((item: any, index: any) => {
                if (item?.isSearch === true) {
                  return (
                    <div
                      key={index}
                      className='animate-slide-in flex w-full flex-col gap-2' // Added slide-in animation per item
                      style={{
                        animationDelay: `${index * 0.1}s`, // Staggered animation for inputs
                        animation: open
                          ? 'slideIn 0.3s ease-out forwards'
                          : 'none'
                      }}
                    >
                      <label className='text-sm font-medium capitalize text-gray-700'>
                        {item.name}
                      </label>
                      {item?.type === 'date' || item?.type === 'Date' ? (
                        <DatePicker
                          placeholder={item.name}
                          className='w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-all duration-200 hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      ) : (
                        <TextInput
                          view='clear'
                          placeholder={item.name}
                          type={item.type}
                          onChange={(e: any) =>
                            setSearchParams({
                              ...SearchParams,
                              [item.id]:
                                item.type === 'number'
                                  ? +e.target.value
                                  : e.target.value
                            })
                          }
                          hasClear={true}
                          value={SearchParams?.[item?.id] || ''}
                          className='w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm transition-all duration-200 hover:shadow-md focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                      )}
                    </div>
                  )
                }
                return null
              })}
            </div>

            <div className='animate-slide-up flex flex-col justify-center gap-3 rounded-b-xl border-t border-gray-200 bg-gray-50 p-6 sm:flex-row'>
              <Button
                pin='circle-circle'
                className='flex-1 transform rounded-lg bg-gray-500 px-6 py-2 font-medium text-white shadow-md transition-all duration-200 ease-in-out hover:bg-gray-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-95 sm:w-auto'
                onClick={() => {
                  setOpen(false)
                  setSearchParams({})
                  handleSearch({})
                }}
                view='action' // Assuming Button supports variant; otherwise, override with classes
              >
                Clear
              </Button>
              <Button
                pin='circle-circle'
                className='flex-1 transform rounded-lg bg-blue-600 px-6 py-2 font-medium text-white shadow-md transition-all duration-200 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 sm:w-auto'
                onClick={() => {
                  setOpen(false)
                  handleSearch(SearchParams)
                }}
              >
                Apply
              </Button>
            </div>

            <style jsx>{`
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-slide-in {
                animation: slideIn 0.3s ease-out forwards;
              }
              @keyframes slideDown {
                from {
                  opacity: 0;
                  transform: translateY(-10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-slide-down {
                animation: slideDown 0.3s ease-out forwards;
              }
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(10px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .animate-slide-up {
                animation: slideUp 0.3s ease-out forwards;
              }
            `}</style>
          </div>
        </div>
      </div>
    )
  }

  if (tableecom7ef45?.isHidden) {
    return <></>
  }
  return(
    <div className="col-start-1 col-end-13 gap-">
      <Row space={3}>
        <Col>
          <Flex direction='column' >
            <Modal 
                  open={open} 
                  onClose={() => setOpen(false)} 
                  className="fixed inset-0 z-50 overflow-y-auto"
                >
              {searchModal()}
              </Modal>
            <MyTable
              className=""
              data={Array.isArray(allDataObject) ? allDataObject : []}
              columns={translatedColumns}
              edgePadding={true}
              selectedIds={tableecom7ef45Props?.selectedIds}  
              onSelectionChange={setLockMode} 
              settings={settings}
              updateSettings={setSettings}
              renderRowActions={RowAction}
              wordWrap={true}
            />
              {paginationData?.page != null && paginationData?.pageSize != null && paginationData?.total != null && Array.isArray(allDataObject) && allDataObject.length>0 ?
              <Pagination
              className='flex w-full items-center justify-center'
              page={paginationData.page}
              pageSize={paginationData.pageSize}
              pageSizeOptions={[5, 10, 20, 50, 100]}
              total={paginationData.total}
              onUpdate={handleUpdate}
              showInput={true}
              size='l'
            />:null}
          </Flex>
        </Col>
      </Row>
    </div>
  )
}

export default TabletableEcom
