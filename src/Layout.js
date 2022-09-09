import "./Layout.css"

const Layout = ({data, previousLink, nextLink, requestNewPage, viewIndex, processData, loading}) => {

  const nextPage = () => {
    if(viewIndex.current === 1){
      viewIndex.current = 2;
      processData()
    }else{
      requestNewPage(nextLink)
    }
    
  }
  const prevPage = () => {
    
    if(viewIndex.current === 2){
      viewIndex.current = 1;
      processData()
    }else{
      requestNewPage(previousLink)
    }
  }

  // console.log(data)
  

  return (
    <div>
      <div className ="align">
      <table>
        <caption>paginated random data of app users</caption>
        <thead>
            <tr>
                <td># No.</td>
                <td>Gender</td>
                <td>Age</td>
            </tr>
        </thead>
        <tbody>
        {loading ? ( <h2 className="cntr">Loading...</h2> ) : ( 
        <>
         { data.map((item, id) => (
            <tr key={id}>
                <td>{item.row} </td>
                <td>{item.gender} </td>
                <td>{item.age} </td>
            </tr>
        ))}
        </>
        )}
        </tbody>
    </table>
    <div className="btn-group">
        {
          (((previousLink !== undefined) || (viewIndex.current === 2) ) && <button data-prevbtn onClick={prevPage}>Previous</button>)
        }

        {
          ((nextLink !== undefined) && <button data-nextbtn onClick={nextPage}>Next</button>)
        }
        
        <label data-pageview></label>
    </div>
    </div>
    </div>
  )
}

export default Layout