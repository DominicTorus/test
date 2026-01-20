'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InspectIQ from '@/app/utils/InspectIQ.png';
import { Tooltip } from '@/components';
import CodeFiletest   from './customWCodeFiletest'   
     

const CustomWidgetcustomW = ({encryptionFlagCompData}:any) => {
  return (
    <div className="" style={{gridColumn: `4 / 9`,gridRow: `129 / 164`, gap:``, height: `100%`, overflow: 'auto'}} >
      <Tooltip title="CustomCOde" placement="top-start">
      <CodeFiletest />
      </Tooltip>
    </div>
  )
}

export default CustomWidgetcustomW ;
