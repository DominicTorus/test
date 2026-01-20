


"use client"
import React from 'react';
import { getCookie } from './components/cookieMgment';
export interface TotalContextProps {
  currentToken: any 
  setCurrentToken: React.Dispatch<React.SetStateAction<any>>
  digroup04aa5: any 
  setdigroup04aa5: React.Dispatch<React.SetStateAction<any>>
  digroup04aa5Props: any 
  setdigroup04aa5Props: React.Dispatch<React.SetStateAction<any>>
  dyactions87a65: any 
  setdyactions87a65: React.Dispatch<React.SetStateAction<any>>
  dyactions87a65Props: any 
  setdyactions87a65Props: React.Dispatch<React.SetStateAction<any>>
  firstgroup12d3b: any 
  setfirstgroup12d3b: React.Dispatch<React.SetStateAction<any>>
  firstgroup12d3bProps: any 
  setfirstgroup12d3bProps: React.Dispatch<React.SetStateAction<any>>
  dyinputbae0f: any,
  setdyinputbae0f:React.Dispatch<React.SetStateAction<any>>
  dyinputbae0fProps: any 
  setdyinputbae0fProps: React.Dispatch<React.SetStateAction<any>>
  rejectbd33d: any,
  setrejectbd33d:React.Dispatch<React.SetStateAction<any>>
  rejectbd33dProps: any 
  setrejectbd33dProps: React.Dispatch<React.SetStateAction<any>>
  approvef19e7: any,
  setapprovef19e7:React.Dispatch<React.SetStateAction<any>>
  approvef19e7Props: any 
  setapprovef19e7Props: React.Dispatch<React.SetStateAction<any>>
  return36894: any,
  setreturn36894:React.Dispatch<React.SetStateAction<any>>
  return36894Props: any 
  setreturn36894Props: React.Dispatch<React.SetStateAction<any>>
  deletebad33: any,
  setdeletebad33:React.Dispatch<React.SetStateAction<any>>
  deletebad33Props: any 
  setdeletebad33Props: React.Dispatch<React.SetStateAction<any>>
  modifya17b9: any,
  setmodifya17b9:React.Dispatch<React.SetStateAction<any>>
  modifya17b9Props: any 
  setmodifya17b9Props: React.Dispatch<React.SetStateAction<any>>
  save69d9c: any,
  setsave69d9c:React.Dispatch<React.SetStateAction<any>>
  save69d9cProps: any 
  setsave69d9cProps: React.Dispatch<React.SetStateAction<any>>
  submit3122e: any,
  setsubmit3122e:React.Dispatch<React.SetStateAction<any>>
  submit3122eProps: any 
  setsubmit3122eProps: React.Dispatch<React.SetStateAction<any>>
  nameb5548: any,
  setnameb5548:React.Dispatch<React.SetStateAction<any>>
  nameb5548Props: any 
  setnameb5548Props: React.Dispatch<React.SetStateAction<any>>
  amount887e7: any,
  setamount887e7:React.Dispatch<React.SetStateAction<any>>
  amount887e7Props: any 
  setamount887e7Props: React.Dispatch<React.SetStateAction<any>>
  submit0245e: any,
  setsubmit0245e:React.Dispatch<React.SetStateAction<any>>
  submit0245eProps: any 
  setsubmit0245eProps: React.Dispatch<React.SetStateAction<any>>

////// screen states 
  dynamicinputs_v1Props: any 
  setdynamicinputs_v1Props: React.Dispatch<React.SetStateAction<any>>
  secondscreeen_v1Props: any 
  setsecondscreeen_v1Props: React.Dispatch<React.SetStateAction<any>>

///////// dfd

  refetch: any,
  setRefetch: React.Dispatch<React.SetStateAction<any>>
  searchParam: string,
  setSearchParam: React.Dispatch<React.SetStateAction<string>>
  disableParam: any,
  setDisableParam: React.Dispatch<React.SetStateAction<any>>
  globalState: any,
  setGlobalState: React.Dispatch<React.SetStateAction<any>>
  // for all textInput validation
  validate: any,
  setValidate: React.Dispatch<React.SetStateAction<any>>

  //its used for validate once again on button click
  validateRefetch: any,
  setValidateRefetch: React.Dispatch<React.SetStateAction<any>>
  accessProfile:any,
  setAccessProfile:React.Dispatch<React.SetStateAction<any>>
  memoryVariables:any
  setMemoryVariables:React.Dispatch<React.SetStateAction<any>>
  property:any
  setProperty:React.Dispatch<React.SetStateAction<any>>
  triggerRefresh: () => void,
  refresh: any ,
  setRefresh: React.Dispatch<React.SetStateAction<any>>
  lockedData: any,
  setLockedData: React.Dispatch<React.SetStateAction<any>>
  paginationDetails: any,
  setpaginationDetails: React.Dispatch<React.SetStateAction<any>>
  eventEmitterData:any,
  setEventEmitterData:React.Dispatch<React.SetStateAction<any>>
  userDetails:any,
  setUserDetails:React.Dispatch<React.SetStateAction<any>>
  encAppFalg:any,
  setEncAppFalg:React.Dispatch<React.SetStateAction<any>>
}

export const TotalContext = React.createContext<TotalContextProps | {}>({})

const GlobalContext = ({children} : {children: React.ReactNode}) => {
    const [currentToken, setCurrentToken ] = React.useState<any>({}) 
      //////////
        const [digroup04aa5, setdigroup04aa5 ] = React.useState<any>({}) 
    const [digroup04aa5Props, setdigroup04aa5Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[]
      }) 
        const [dyactions87a65, setdyactions87a65 ] = React.useState<any>({}) 
    const [dyactions87a65Props, setdyactions87a65Props ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[]
      }) 
        const [firstgroup12d3b, setfirstgroup12d3b ] = React.useState<any>({}) 
    const [firstgroup12d3bProps, setfirstgroup12d3bProps ] = React.useState<any>({
      validation:false,
      required:false,
      refetch:false,
      refresh:false,
      isDisabled: false,
      presetValues: '',
      isHidden: false,
      selectedIds:[]
      }) 
   const [dyinputbae0f,setdyinputbae0f] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [rejectbd33d,setrejectbd33d] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [approvef19e7,setapprovef19e7] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [return36894,setreturn36894] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [deletebad33,setdeletebad33] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [modifya17b9,setmodifya17b9] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [save69d9c,setsave69d9c] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [submit3122e,setsubmit3122e] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [nameb5548,setnameb5548] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [amount887e7,setamount887e7] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
   const [submit0245e,setsubmit0245e] = React.useState<any>({
    isDisabled: false,
    presetValues: '',
    isHidden: false,
    refetch:false,
    refresh:false,
    }) 
    ///////////
    const [refresh, setRefresh] = React.useState<any>({       dynamicjsonformDyInputbae0f:false,
       buttonRejectbd33d:false,
       buttonApprovef19e7:false,
       buttonReturn36894:false,
       buttonDeletebad33:false,
       buttonModifya17b9:false,
       buttonSave69d9c:false,
       buttonsubmit3122e:false,
       textinputnameb5548:false,
       textinputamount887e7:false,
       buttonsubmit0245e:false,
       groupDIGroup04aa5:false,
       groupDyactions87a65:false,
       groupfirstgroup12d3b:false,
      })

  ////// screen states 
   const [dynamicinputs_v1Props,setdynamicinputs_v1Props] = React.useState<any>([])
   const [secondscreeen_v1Props,setsecondscreeen_v1Props] = React.useState<any>([])

///////// dfd
    const [searchParam , setSearchParam] = React.useState<string>("")
    const [disableParam , setDisableParam] = React.useState<any>({})
    const [globalState , setGlobalState] = React.useState<any>({})
    const [refetch, setRefetch] = React.useState<any>(false)
    const [validate, setValidate] = React.useState<any>({});
    const [validateRefetch, setValidateRefetch] = React.useState<any>({
      value:false,
      init:0
    })
    const [accessProfile, setAccessProfile] = React.useState<any>([])
    const [property, setProperty] = React.useState<any>({})
    const [memoryVariables, setMemoryVariables] = React.useState<any>({})
    const [lockedData, setLockedData] = React.useState<any>({})
    const [paginationDetails, setpaginationDetails] = React.useState<any>({})

    const [eventEmitterData,setEventEmitterData] = React.useState<any>([])
    const [userDetails , setUserDetails] = React.useState<any>({})
    const [encAppFalg , setEncAppFalg] = React.useState<any>({})
    const theme = getCookie('cfg_theme')
    
    
  return (
    <TotalContext.Provider 
      value={
      {
      //
        currentToken,
        setCurrentToken,
        digroup04aa5, 
        setdigroup04aa5,
        digroup04aa5Props, 
        setdigroup04aa5Props,
        dyactions87a65, 
        setdyactions87a65,
        dyactions87a65Props, 
        setdyactions87a65Props,
        firstgroup12d3b, 
        setfirstgroup12d3b,
        firstgroup12d3bProps, 
        setfirstgroup12d3bProps,
        dyinputbae0f,
        setdyinputbae0f, 
        rejectbd33d,
        setrejectbd33d, 
        approvef19e7,
        setapprovef19e7, 
        return36894,
        setreturn36894, 
        deletebad33,
        setdeletebad33, 
        modifya17b9,
        setmodifya17b9, 
        save69d9c,
        setsave69d9c, 
        submit3122e,
        setsubmit3122e, 
        nameb5548,
        setnameb5548, 
        amount887e7,
        setamount887e7, 
        submit0245e,
        setsubmit0245e, 
        ////// screen states 
          dynamicinputs_v1Props,
          setdynamicinputs_v1Props,
          secondscreeen_v1Props,
          setsecondscreeen_v1Props,
        //////////

        ///////// dfd
        refetch,
        setRefetch,
        searchParam,
        setSearchParam,
        disableParam,
        setDisableParam,
        globalState,
        setGlobalState,
        validate,
        setValidate,
        validateRefetch,
        setValidateRefetch,
        accessProfile,
        setAccessProfile,
        property,
        setProperty,
        setRefresh,
        refresh,
        memoryVariables,
        setMemoryVariables,
        lockedData,
        setLockedData,
        paginationDetails,
        setpaginationDetails,
        eventEmitterData,
        setEventEmitterData,
        userDetails,
        setUserDetails,
        encAppFalg,
        setEncAppFalg
        }}
      >
      {children}
    </TotalContext.Provider>
  )
}

export default GlobalContext