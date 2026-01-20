'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import InspectIQ from '@/app/utils/InspectIQ.png';
import { Tooltip } from '@/components';
import CodeFiletest2   from './widget2CodeFiletest2'   
     

const CustomWidgetwidget2 = ({encryptionFlagCompData}:any) => {
  return (
    <div className="" style={{gridColumn: `12 / 16`,gridRow: `132 / 165`, gap:``, height: `100%`, overflow: 'auto'}} >
      <CodeFiletest2 />
    </div>
  )
}

export default CustomWidgetwidget2 ;
