
'use client'
import { useContext, useEffect, useState, useRef } from 'react';
import { codeExecution } from '@/app/utils/codeExecution';
import { getCookie } from '@/app/components/cookieMgment';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { AxiosService } from '@/app/components/axiosService';
import { te_refreshDto } from "@/app/interfaces/interfaces";
import { useInfoMsg } from "@/app/components/infoMsgHandler";
import { useGlobal } from '@/context/GlobalContext'
import { Tooltip } from '@/components/Tooltip';
import { HeaderPosition, TooltipProps as TooltipPropsType } from "@/types/global";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip as TooltipDisplay } from 'recharts';
import { Text } from "@/components/Text";
import { Card } from '@/components/Card';

type ContentAlign = "left" | "center" | "right";

interface PieChartspieChartCompProps {
  encryptionFlagCompData: any;
  fillContainer?: boolean;
  contentAlign?: ContentAlign;
  needTooltip?: boolean;
  tooltipProps?: TooltipPropsType;
  headerText?: string;
  headerPosition?: HeaderPosition;
}

export default function PieChartspiechart({ 
  encryptionFlagCompData,
  fillContainer = true,
  contentAlign = "center",
  headerText="Header",
  headerPosition = "top"}: PieChartspieChartCompProps) {
  const { theme, direction, branding } = useGlobal();
  const token: string = getCookie('token');
  const { globalState, setGlobalState } = useContext(TotalContext) as TotalContextProps
  const { accessProfile, setAccessProfile } = useContext(TotalContext) as TotalContextProps
  const [data,setData] = useState<any>([]);
  const encryptionFlagCont: boolean = encryptionFlagCompData.flag || false ;
  let encryptionDpd: string = "";
  encryptionDpd = encryptionDpd !=='' ? encryptionDpd: encryptionFlagCompData.dpd;
  let encryptionMethod: string = "";
  encryptionMethod  = encryptionMethod !=='' ? encryptionMethod: encryptionFlagCompData.method;
  const prevRefreshRef = useRef(false);
  const toast:any=useInfoMsg();
  const getFillClasses = () => {
    if (!fillContainer) return "";
    return "w-full h-full";
  };

  const getContentAlignClasses = () => {
    switch (contentAlign) {
      case "left":
        return "justify-start items-start";
      case "right":
        return "justify-end items-end";
      case "center":
      default:
        return "justify-center items-center";
    }
  };
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
  let expenseData: any[];
  let title : String = "";
  let showCurrencySign : String = "";
  
  interface ExpenseData {
    name: string
    [key: string]: string | number
  }
  const handleMapperDetails=async()=>{
    try{
      let te_refreshBody:te_refreshDto={
      key: ""+":",
      refreshFlag: "Y",
      count: 10 ,
      page: 1
    }
    if (encryptionFlagCont) {
      te_refreshBody["dpdKey"] = encryptionDpd;
      te_refreshBody["method"] = encryptionMethod;
    }
    const te_refreshData:any=await AxiosService.post("/te/eventEmitter",te_refreshBody,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if(te_refreshData?.data?.error == true){
      toast(te_refreshData?.data?.errorDetails?.message, 'danger')
    }else{
      set(te_refreshData?.data?.dataset?.data || [])
    }
    let code:any=``;
      if (code == '') {
        //toast(code?.data?.errorDetails?.message, 'danger')
        //return
      } else if (code != '') {
          let codeStates: any = {}
          codeStates['firstgroup']  = firstgroupc08a7,
          codeStates['setfirstgroup'] = setfirstgroupc08a7,
          codeStates['secondgroup']  = secondgroup311a5,
          codeStates['setsecondgroup'] = setsecondgroup311a5,
        codeExecution(code,codeStates)
      }
      setData(te_refreshData?.data?.dataset?.data) 
      if(Array.isArray(te_refreshData?.data?.dataset?.data)){
        return
      }else{
        set(te_refreshData?.data?.dataset?.data || [])
      }
    }catch(err){
      console.log(err)
    }
  }
  
  expenseData = data.map(({ process_id, ...rest }: any) => rest)

  const parsedExpenseData: ExpenseData[] = expenseData.map(item => {
    const parsedItem: ExpenseData = { name: String(item.name) }
    Object.keys(item).forEach(key => {
      if (key !== 'name') {
        item[key] = item[key] === null ? '0' : item[key]
        const cleanedValue = String(item[key]).replace(/,/g, "")
        parsedItem[key] = parseFloat(cleanedValue as string) // Convert string to number
      }
    })
    return parsedItem
  })

  let totalExpenses = parsedExpenseData.reduce((acc, item) => {
    const { name, ...rest } = item // Exclude the 'name' key
    const sum = Object.values(rest as Record<string, number>).reduce(
      (sum, value) => sum + value,
      0
    ) // Sum remaining values
    return acc + sum
  }, 0)
  const formattedTotalExpenses = totalExpenses.toLocaleString('en-IN')
useEffect(() => {
  if (prevRefreshRef.current) {
    handleMapperDetails()
  }else 
  prevRefreshRef.current= true
},[piechart4e57f?.refresh])


  const colors = [
    '#FF9F40',
    '#FF6B6B',
    '#36A2EB',
    '#4CAF50',
    '#9C27B0',
    '#00BCD4'
  ]
    title  = "Pie Chart"
    showCurrencySign = "₹"
  const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name } = payload[0].payload
    const selectedData = expenseData.find((item) => item.name === name)
    if (selectedData) {
      return (
        <div className='bg-white p-2 border border-gray-300 rounded shadow'>
          <p className='font-bold'>{name}</p>
          {Object.keys(selectedData)
            .filter((key) => key !== 'name')
            .map((key) => (
              <p key={key}>
                {key}: {showCurrencySign}{selectedData[key]}
              </p>
            ))}
        </div>
      )
    }
  }
    return null
  }
  const pieChartData = parsedExpenseData.map((item) => ({
  name: item.name,
  value: Object.keys(item)
    .filter((key) => key !== 'name')
    .reduce((acc, key) => acc + (item[key] as number), 0),
  }))

  if (piechart4e57f?.isHidden) {
    return <></>
  }

  const isDark = theme === "dark" || theme === "dark-hc";
  const chartElement = (
    <Tooltip
        title={"Tooltip"}
        placement={"top-start"}
    >
    <div className="w-full h-full">
     {/*<Card className='w-full h-full space-y-2 '>*/}
        <h3 className='text-base font-semibold'>{title}</h3>
        {parsedExpenseData.length > 0 ?
        <ResponsiveContainer width='100%' height='80%'>
            <PieChart>
              <Pie
                data={pieChartData}
                cx='50%'
                cy='50%'
                innerRadius='60%'
                outerRadius='80%'
                paddingAngle={2}
                dataKey='value'
                startAngle={90}
                endAngle={-270}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={"cell-"+index}fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <TooltipDisplay content={<CustomTooltip />} />
              <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "12px" }}
              formatter={(value, entry) => {
                const formattedValue = Number(entry?.payload?.value).toLocaleString("en-IN");
                return (
                  <span style={{ color: entry.color }}>
                    {value} - {showCurrencySign}{formattedValue}
                  </span>
                );
              }}
              />   
              
              <text
                x='50%'
                y='50%'
                textAnchor='middle'
                dominantBaseline='middle'
                fill={isDark ? "#fff" : "#000"}'
                fontSize='16'
              >
                Total: {showCurrencySign}{formattedTotalExpenses}
              </text>                
            </PieChart>
          </ResponsiveContainer>
          :<p className='text-center text-gray-500'> No data available</p>}
        {/*</Card>*/}
      </div>
    </Tooltip>  )
  const renderWithHeader = (element: React.ReactNode) => {
    if (!headerText) {
      return (
        <div className={`${fillContainer ? "flex w-full h-full" : "inline-flex"} ${getContentAlignClasses()} ${getFillClasses()}`}>
          {element}
        </div>
      );
    }
    const headerClasses = `font-semibold mb-2 ${
      isDark ? "text-gray-300" : "text-gray-700"
    }`;

    const headerStyle = { fontSize: "var(--font-size)" };
    switch (headerPosition) {
      case "top":
        return (
          <div className={`${fillContainer ? "flex" : "inline-flex"} items-start${getFillClasses()}`}>
            <div className={headerClasses} style={headerStyle}>{headerText}</div>
            <div className={fillContainer ? "flex-1 min-h-0" : ""}>{element}</div>
          </div>
        );
      case "bottom":
        return (
          <div className={`${fillContainer ? "flex" : "inline-flex"} items-start${getFillClasses()}`}>
            <div className={fillContainer ? "flex-1 min-h-0" : ""}>{element}</div>
            <div className={headerClasses+ " mt-2 mb-0"} style={headerStyle}>{headerText}</div>
          </div>
        );
      case "left":
        return (
          <div className={`${fillContainer ? "flex" : "inline-flex"} items-start${getFillClasses()}gap-4`}>
            <div className={headerClasses+ " mb-0 whitespace-nowrap flex-shrink-0"} style={headerStyle}>
              {headerText}
            </div>
            <div className={fillContainer ? "flex-1 min-w-0 h-full" : ""}>{element}</div>
          </div>
        );
      case "right":
        return (
          <div className={`${fillContainer ? "flex" : "inline-flex"} items-start${getFillClasses()}gap-4`}>
            <div className={fillContainer ? "flex-1 min-w-0 h-full" : ""}>{element}</div>
            <div className={headerClasses+ " mb-0 whitespace-nowrap flex-shrink-0"} style={headerStyle}>
              {headerText}
            </div>
          </div>
        );
    }
  };

  const finalElement = (
    <div      className={`${fillContainer ? "w-full h-full" : ""}`}
      style={{gridColumn: `15 / 21`,gridRow: `21 / 65`, gap:``, height: `100%`, overflow: 'auto'}} >
      {renderWithHeader(chartElement)}
    </div>
  );
  return <>{finalElement}</>;
}
