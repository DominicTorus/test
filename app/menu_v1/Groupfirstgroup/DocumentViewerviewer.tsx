'use client'
import React, { useContext, useEffect, useState } from "react";
import i18n from "@/app/components/i18n";
import {Text} from "@gravity-ui/uikit";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { TotalContext, TotalContextProps } from "@/app/globalContext";
import DocViewer from "@/app/TorusComponents/Documentviewer";
import { AxiosService } from "@/app/components/axiosService";
import { deleteAllCookies,getCookie } from '@/app/components/cookieMgment';
import { codeExecution } from "@/app/utils/codeExecution";
import imageNotFound from '@/app/assets/imageNotFound.png';

const DocumentViewerviewer = ({checkToAdd,setCheckToAdd,refetch,setRefetch,encryptionFlagCompData}:any) => {
  const token:string = getCookie('token'); 
  const {disableParam, setDisableParam} = useContext(TotalContext) as TotalContextProps;
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps;
  const {accessProfile, setAccessProfile} = useContext(TotalContext) as TotalContextProps
  const [allCode,setAllCode]=useState<any>("");
  let customCode:any;
  const handleCustomCode=async () => {
    let code:any=allCode||''
    if (code != '') {
      let codeStates: any = {};
      codeStates['firstgroup']  = firstgroupc4acb,
      codeStates['setfirstgroup'] = setfirstgroupc4acb,
      customCode = codeExecution(code,codeStates);
    }
  }

   const handleMapper=async () => {
    try{     
      const orchestrationData: any = await AxiosService.post(
        '/UF/Orchestration',
        {
          key: "CK:CT003:FNGK:AF:FNK:UF-UFW:CATK:CG:AFGK:TG2:AFK:AllComponents:AFVK:v1",
          componentId: "5909e18973e149f19bb5db9d38fc4acb",
          controlId: "1b4adc7fafba4fd5b912eda89782e45c",
          isTable: false,
          from:"ButtonViewer",
          accessProfile:accessProfile
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      if(orchestrationData?.data?.error == true){
        return
      }
      setAllCode(orchestrationData?.data?.code);
    }catch(err){
        console.log(err);
    }
  }
  useEffect(()=>{
    handleMapper();
  },[])
  const keyset:any=i18n.keyset("language");
  const toast:any=useInfoMsg();
  const [open, setOpen] = React.useState(false);
  const [url, setUrl] = useState<string>('');
  const [documentType, setDocumentType] = useState('');
  const [otherFileFormat, setOtherFileFormat] = useState(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  /////////////
   //another screen
  const {firstgroupc4acb, setfirstgroupc4acb}= useContext(TotalContext) as TotalContextProps; 
  const {firstgroupc4acbProps, setfirstgroupc4acbProps}= useContext(TotalContext) as TotalContextProps; 
  const {textinput2cc5d, settextinput2cc5d}= useContext(TotalContext) as TotalContextProps; 
  const {uploade78d7, setuploade78d7}= useContext(TotalContext) as TotalContextProps; 
  const {textarea87afb, settextarea87afb}= useContext(TotalContext) as TotalContextProps; 
  const {radiof9609, setradiof9609}= useContext(TotalContext) as TotalContextProps; 
  const {radiogroup5ad4f, setradiogroup5ad4f}= useContext(TotalContext) as TotalContextProps; 
  const {switcha515a, setswitcha515a}= useContext(TotalContext) as TotalContextProps; 
  const {pininputf6753, setpininputf6753}= useContext(TotalContext) as TotalContextProps; 
  const {save67a1f, setsave67a1f}= useContext(TotalContext) as TotalContextProps; 
  const {radiobutton6d7d6, setradiobutton6d7d6}= useContext(TotalContext) as TotalContextProps; 
  const {checkbox1c08f, setcheckbox1c08f}= useContext(TotalContext) as TotalContextProps; 
  const {signature75ba3, setsignature75ba3}= useContext(TotalContext) as TotalContextProps; 
  const {viewer2e45c, setviewer2e45c}= useContext(TotalContext) as TotalContextProps; 
  const {card63ac3, setcard63ac3}= useContext(TotalContext) as TotalContextProps; 
  const {timepicker40a6b, settimepicker40a6b}= useContext(TotalContext) as TotalContextProps; 
  const {slider6c8f7, setslider6c8f7}= useContext(TotalContext) as TotalContextProps; 
  const {qrcode772a6, setqrcode772a6}= useContext(TotalContext) as TotalContextProps; 
  const {image54de2, setimage54de2}= useContext(TotalContext) as TotalContextProps; 
  const {dropdown7f41a, setdropdown7f41a}= useContext(TotalContext) as TotalContextProps; 
  const {icon71de8, seticon71de8}= useContext(TotalContext) as TotalContextProps; 
  const {text5d0f8, settext5d0f8}= useContext(TotalContext) as TotalContextProps; 
  const {label9bd6f, setlabel9bd6f}= useContext(TotalContext) as TotalContextProps; 
  const {listec3b4, setlistec3b4}= useContext(TotalContext) as TotalContextProps; 
  const {datepickerbe904, setdatepickerbe904}= useContext(TotalContext) as TotalContextProps; 
  const {jsonviewerfbb2e, setjsonviewerfbb2e}= useContext(TotalContext) as TotalContextProps; 
  const {avatar24aed, setavatar24aed}= useContext(TotalContext) as TotalContextProps; 
  const {companycard071eb, setcompanycard071eb}= useContext(TotalContext) as TotalContextProps; 
  const {progressd7ccf, setprogressd7ccf}= useContext(TotalContext) as TotalContextProps; 
  const {texttospeech63351, settexttospeech63351}= useContext(TotalContext) as TotalContextProps; 
  const {speechtotext5f5c9, setspeechtotext5f5c9}= useContext(TotalContext) as TotalContextProps; 
  const {tabsb7d72, settabsb7d72}= useContext(TotalContext) as TotalContextProps; 
  //////////////
  const baseUrl = process.env.NEXT_PUBLIC_FTP_OUTPUT_HOST;
  const fetchData = async () => {
    let url: string | null = null
    if (!firstgroupc4acb?.viewer) {
      setFileUrl(null);
      return;
    }
    try {
      setLoading(true);
      let downloadFileBody :any =  { id: firstgroupc4acb?.viewer,context:"viewer",enableEncryption:true };
      if (encryptionFlagCont) {
          downloadFileBody["dpdKey"] = encryptionDpd;
          downloadFileBody["method"] = encryptionMethod;
      } 
      if(downloadFileBody?.id?.startsWith(baseUrl) ){
        const response = await AxiosService.post(
          '/UF/getDFS',downloadFileBody,
          {
            responseType: 'blob',
            headers: { 'Content-Type': 'application/json' }
          }
        )

        const blob = new Blob([response.data], {
          type: response.headers['content-type']
        })
        url = window.URL.createObjectURL(blob)
      }else{
        const response = await AxiosService.post(
          'UF/downloadFile',
          downloadFileBody,
          {
            responseType: 'blob',
            headers: { 'Content-Type': 'application/json' }
          }
        )
        
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        url = URL.createObjectURL(blob);
      }
      setFileUrl(url);
    } catch (err) {
      setFileUrl(null);
    } finally {
      setLoading(false);
    }
    handleCustomCode()
  }

  useEffect(() => {
    fetchData();
  }, [firstgroupc4acb?.viewer])
  
  if (viewer2e45c?.isHidden) {
    return <></>
  }
  if (loading) {
    return (
      <div style={{gridColumn: `1 / 3`,gridRow: `69 / 88`, gap:``}}>
        Loading...
      </div>
    )
  }

  if (!fileUrl)
  return (
    <div
      className=""
      style={{ gridColumn: `1 / 3`, gridRow: `69 / 88`, gap:`` }}
    >
    <div className="items-center justify-center text-center bg-gray-50 rounded-xl border border-red-500 shadow-sm p-2">
      <Text className="text-lg font-semibold text-gray-700">No Document Found</Text>
      <p className="text-sm text-gray-500">
        The attachment or document you are looking for is unavailable or not uploaded yet.
      </p>
    </div>
    </div>
  );

  return (
    <div 
      style={{gridColumn: `1 / 3`,gridRow: `69 / 88`, gap:``, height: `100%`, overflow: 'auto'}} >  
      <DocViewer 
        url={fileUrl || ''}
        queryParams="HL=NL"
        viewer="url"
        viewerUrl={""}
        googleCheckInterval={500}
        googleMaxChecks={5}
        overrideLocalhost="null" 
        googleCheckContentLoaded={true}
        className="w-full h-full " 
      />
    </div>
  );
}

export default DocumentViewerviewer
