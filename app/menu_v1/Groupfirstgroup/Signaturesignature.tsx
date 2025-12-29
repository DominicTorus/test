'use client'
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Signature, SignatureRef } from '@/components/Signature';
import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import i18n from '@/app/components/i18n';

const Signaturesignature = ({checkToAdd,setCheckToAdd,refetch,setRefetch}:any) => {  
  const sigCanvas = useRef<SignatureRef>(null);
  const keyset: any = i18n.keyset('language');
    /////////////
   //another screen
  const {firstgroupc08a7, setfirstgroupc08a7}= useContext(TotalContext) as TotalContextProps;
  const {firstgroupc08a7Props, setfirstgroupc08a7Props}= useContext(TotalContext) as TotalContextProps;
  const {button6c543, setbutton6c543}= useContext(TotalContext) as TotalContextProps;
  const {avatard99b3, setavatard99b3}= useContext(TotalContext) as TotalContextProps;
  const {radiogroupcf04e, setradiogroupcf04e}= useContext(TotalContext) as TotalContextProps;
  const {datepickerbe7c3, setdatepickerbe7c3}= useContext(TotalContext) as TotalContextProps;
  const {checkbox2289f, setcheckbox2289f}= useContext(TotalContext) as TotalContextProps;
  const {dropdown0e57d, setdropdown0e57d}= useContext(TotalContext) as TotalContextProps;
  const {upload2cc02, setupload2cc02}= useContext(TotalContext) as TotalContextProps;
  const {label9be35, setlabel9be35}= useContext(TotalContext) as TotalContextProps;
  const {card498e2, setcard498e2}= useContext(TotalContext) as TotalContextProps;
  const {imageeee6c, setimageeee6c}= useContext(TotalContext) as TotalContextProps;
  const {textinput56a48, settextinput56a48}= useContext(TotalContext) as TotalContextProps;
  const {icon0a30c, seticon0a30c}= useContext(TotalContext) as TotalContextProps;
  const {liste965e, setliste965e}= useContext(TotalContext) as TotalContextProps;
  const {pininput92978, setpininput92978}= useContext(TotalContext) as TotalContextProps;
  const {progress53986, setprogress53986}= useContext(TotalContext) as TotalContextProps;
  const {qrcoded45d1, setqrcoded45d1}= useContext(TotalContext) as TotalContextProps;
  const {radiobutton92d8e, setradiobutton92d8e}= useContext(TotalContext) as TotalContextProps;
  const {radio65f38, setradio65f38}= useContext(TotalContext) as TotalContextProps;
  const {speechtotextf8edf, setspeechtotextf8edf}= useContext(TotalContext) as TotalContextProps;
  const {texttospeech35a79, settexttospeech35a79}= useContext(TotalContext) as TotalContextProps;
  const {textf0149, settextf0149}= useContext(TotalContext) as TotalContextProps;
  const {switch4a6e4, setswitch4a6e4}= useContext(TotalContext) as TotalContextProps;
  const {textareaa5a38, settextareaa5a38}= useContext(TotalContext) as TotalContextProps;
  const {timepicker8a8fa, settimepicker8a8fa}= useContext(TotalContext) as TotalContextProps;
  const {signature63e12, setsignature63e12}= useContext(TotalContext) as TotalContextProps;
  const {sliderde96f, setsliderde96f}= useContext(TotalContext) as TotalContextProps;
  const {secondgroup311a5, setsecondgroup311a5}= useContext(TotalContext) as TotalContextProps;
  const {secondgroup311a5Props, setsecondgroup311a5Props}= useContext(TotalContext) as TotalContextProps;
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
    setfirstgroupc08a7((prev: any) => ({ ...prev, signature: [result] }))
  }

  const handleClear = () => {
    sigCanvas.current?.clear()
  }
  if (signature63e12?.isHidden) {
    return <></>
  }
  useEffect(() => {
    if (typeof firstgroupc08a7?.signature == 'object' && firstgroupc08a7?.signature?.length == 0 || firstgroupc08a7?.signature=="" ) {
      sigCanvas?.current?.clear();
    }
  }, [firstgroupc08a7?.signature]);
  return (
    <div 
      style={{gridColumn: `2 / 6`,gridRow: `321 / 348`, gap:``, height: `100%`, overflow: 'auto'}} >
   
    <Signature
      className=""
      penColor='green'
      ref={sigCanvas}
      needTooltip={true}  
      tooltipProps={{title:"Tooltip",placement:"top-start"}}
      headerPosition='top'
      headerText="Header"
      onEnd={handleClick}
      needClear={true}
      clearButtonText="Clear" // Optional, defaults to "Clear"
    />
  </div>
  )
}

export default Signaturesignature
