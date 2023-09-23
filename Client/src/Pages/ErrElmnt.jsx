

const ErrElmnt = (list) => {
  return (
    <div className='w-50 mx-auto' style={{minHeight : '100vh'}}>
        <div className='w-100 text-center'>
        <h1 className='text-danger' style={{fontSize : '60px'}}>ERR : 404</h1>
        <p>Cant find this Page maybe you are not loged in yet</p>
        </div>
        <br />
        <div className="w-50 mx-auto text-left">
        <h3><strong>Tips may help :</strong></h3>
        <br />
        {list.list != 'isAuth' 
        ? 
        <>
        <h5 >please login and try again </h5>
        </>
    
        :
        
        <>
        <h5>-/ Check your connection : maybe ur connection is Off </h5>
        <h5>-/ check the url you entred maybe its wrong</h5>
        </>
        }
        
        </div>
        </div>
  )
}

export default ErrElmnt