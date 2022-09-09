import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Layout from "./Layout";

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState([])
  const [activeData, setActiveData] = useState([])
  const [nextLink, setnextLink] = useState('')
  const [previousLink, setpreviousLink] = useState('')
  const [loading, setLoading] = useState(true);
  // const [viewIndex, setViewIndex] = useState(1)
  const viewIndex = useRef(1)
  const dataRef = useRef(null)

  const processData = async()=>{
    const activeRecords: any = (Object.entries(dataRef.current));

    // get paging data
    const pagingData = (activeRecords[((activeRecords.length) - 1)])[1];
    setnextLink(pagingData.next)
    setpreviousLink(pagingData.previous)

    // get data and re-adjust to 

    if(activeRecords.length === 3){

      // assuming it has a next or previous
      if(viewIndex.current === 1){

        // console.log( (activeRecords[0])[1] )
        setActiveData( (activeRecords[0])[1] )
      }else{
        setActiveData( (activeRecords[1])[1] )
      }
    }else{

      // assuming it only a next or previous
      setActiveData( (activeRecords[0])[1] )
    }
    
  }

  const requestNewPage = async(url = "")=>{
    try{

      const res = await axios.get(url || ('https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=1'))
      
      setData((res.data.results)[0]);
      setLoading(false);
      dataRef.current = (res.data.results)[0]
      viewIndex.current = 1

      processData()
      
      // console.log(res.data.results)
                
    }catch(e){
      console.log(e)
      alert('There was an error while retrieving the data')
    }
  }

    useEffect(() => {
      requestNewPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
          <Layout
            data={activeData}
            nextLink={nextLink}
            previousLink={previousLink}
            requestNewPage={requestNewPage}
            viewIndex={viewIndex}
            processData={processData}
            loading={loading}
          />
        </div>
  )
};

export default App;
