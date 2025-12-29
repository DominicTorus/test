'use client'
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import SignatureCanvas from 'react-signature-canvas';
import { Button,Text } from '@gravity-ui/uikit';
import i18n from '@/app/components/i18n';

const Signaturesignature = ({checkToAdd,setCheckToAdd,refetch,setRefetch}:any) => {  
  const sigCanvas = useRef<SignatureCanvas>(null)
  const keyset: any = i18n.keyset('language')
    /////////////
   //another screen
  const {firstgroupc4acb, setfirstgroupc4acb}= useContext(TotalContext) as TotalContextProps  
  const {firstgroupc4acbProps, setfirstgroupc4acbProps}= useContext(TotalContext) as TotalContextProps  
  const {textinput2cc5d, settextinput2cc5d}= useContext(TotalContext) as TotalContextProps  
  const {uploade78d7, setuploade78d7}= useContext(TotalContext) as TotalContextProps  
  const {textarea87afb, settextarea87afb}= useContext(TotalContext) as TotalContextProps  
  const {radiof9609, setradiof9609}= useContext(TotalContext) as TotalContextProps  
  const {radiogroup5ad4f, setradiogroup5ad4f}= useContext(TotalContext) as TotalContextProps  
  const {switcha515a, setswitcha515a}= useContext(TotalContext) as TotalContextProps  
  const {pininputf6753, setpininputf6753}= useContext(TotalContext) as TotalContextProps  
  const {save67a1f, setsave67a1f}= useContext(TotalContext) as TotalContextProps  
  const {radiobutton6d7d6, setradiobutton6d7d6}= useContext(TotalContext) as TotalContextProps  
  const {checkbox1c08f, setcheckbox1c08f}= useContext(TotalContext) as TotalContextProps  
  const {signature75ba3, setsignature75ba3}= useContext(TotalContext) as TotalContextProps  
  const {viewer2e45c, setviewer2e45c}= useContext(TotalContext) as TotalContextProps  
  const {card63ac3, setcard63ac3}= useContext(TotalContext) as TotalContextProps  
  const {timepicker40a6b, settimepicker40a6b}= useContext(TotalContext) as TotalContextProps  
  const {slider6c8f7, setslider6c8f7}= useContext(TotalContext) as TotalContextProps  
  const {qrcode772a6, setqrcode772a6}= useContext(TotalContext) as TotalContextProps  
  const {image54de2, setimage54de2}= useContext(TotalContext) as TotalContextProps  
  const {dropdown7f41a, setdropdown7f41a}= useContext(TotalContext) as TotalContextProps  
  const {icon71de8, seticon71de8}= useContext(TotalContext) as TotalContextProps  
  const {text5d0f8, settext5d0f8}= useContext(TotalContext) as TotalContextProps  
  const {label9bd6f, setlabel9bd6f}= useContext(TotalContext) as TotalContextProps  
  const {listec3b4, setlistec3b4}= useContext(TotalContext) as TotalContextProps  
  const {datepickerbe904, setdatepickerbe904}= useContext(TotalContext) as TotalContextProps  
  const {jsonviewerfbb2e, setjsonviewerfbb2e}= useContext(TotalContext) as TotalContextProps  
  const {avatar24aed, setavatar24aed}= useContext(TotalContext) as TotalContextProps  
  const {companycard071eb, setcompanycard071eb}= useContext(TotalContext) as TotalContextProps  
  const {progressd7ccf, setprogressd7ccf}= useContext(TotalContext) as TotalContextProps  
  const {texttospeech63351, settexttospeech63351}= useContext(TotalContext) as TotalContextProps  
  const {speechtotext5f5c9, setspeechtotext5f5c9}= useContext(TotalContext) as TotalContextProps  
  const {tabsb7d72, settabsb7d72}= useContext(TotalContext) as TotalContextProps  
  //////////////

  async function convertUrlToFile(dataUrl: string): Promise<{ file: File, url: string } | null> {
    try {
      const [header, base64] = dataUrl.split(',');
      const mimeMatch = header.match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/png';
      const binary = atob(base64);
      const array = Uint8Array.from(binary, char => char.charCodeAt(0));
      const blob = new Blob([array], { type: mime });

      const file = new File([blob], 'signature.png', { type: mime });
      const url = URL.createObjectURL(file);

      return { file, url };
    } catch (error) {
      console.error('Error converting data URL to file:', error);
      return null;
    }
  }

  const handleClick = async () => {
    if (sigCanvas.current?.isEmpty()) {
      alert('Signature is empty!')
      return
    }
    const dataUrl = sigCanvas.current!.toDataURL('image/png')
    const result = await convertUrlToFile(dataUrl)

    console.log('File URL: dataUrl', result)
    setfirstgroupc4acb((prev: any) => ({ ...prev, signature: [result] }))
  }

  const handleClear = () => {
    sigCanvas.current?.clear()
  }

  if (signature75ba3?.isHidden) {
    return <></>
  }
  useEffect(() => {
    if (typeof firstgroupc4acb?.signature == 'object' && firstgroupc4acb?.signature?.length == 0 || firstgroupc4acb?.signature=="" ) {
      sigCanvas?.current?.clear();
    }
  }, [firstgroupc4acb?.signature]);
 
  
  return (
    <div 
      className="flex flex-col  " 
      style={{gridColumn: `4 / 6`,gridRow: `68 / 83`, gap:``, height: `100%`, overflow: 'auto'}} >
    <Text>Sign</Text>
    <div>    
    <h1 className="text-xl font-semibold mb-4">sign</h1> 
    <SignatureCanvas
      penColor='green'
      ref={sigCanvas}
      minWidth={3}
      canvasProps={{
        style: {
          height:"300px",
          width:"300px",
          border: `2px solid #333`,
          borderRadius: `4px`
        }
      }}
      onEnd={handleClick}
    />
    <Button onClick={handleClear}>{keyset('Clear')}</Button>
    </div>
  </div>
  )
}

export default Signaturesignature
