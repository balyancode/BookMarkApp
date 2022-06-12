import {  Button, Card, Empty, Input } from 'antd'
import React, { useState ,useEffect,useCallback,useRef} from 'react'
import { addLinkInDatabase, deleteALinkInFirebase, signOutUser, updateLinkTitleInDatabase,getUserLinksFromFirebase } from '../../library/firebase'
import {useNavigate} from "react-router-dom"
import Profile from './Profile'
import TaskCard from './TaskCard'
import { isWebsiteLinkValid } from '../../utils/HelperFunctions'
import Loader from '../../Components/Loader'


const Home = () => {

  const [link,setLink] = useState("")
  const [links,SetLinks] = useState([])
  const [selectedlink,setSelectedLink] = useState({})
  // const [showprofile,setShowProfile] =useState(false)
  const [validationError,setValidationError] =useState({})
  const  [isLoading,setIsloading] = useState(true)
  const [isEditEnabled , setIsEditEnabled] =useState(false)


  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"));
  const inputRef = useRef(null);

  const getUserLinks = React.useCallback(async () => {
    const results = await getUserLinksFromFirebase(user.uid);
    if (results.length) {
      SetLinks([...results]);
    }
    setIsloading(false)
  
  }, [user.uid]);

  useEffect(() => {
    getUserLinks();
  }, [getUserLinks]);

  useEffect(()=>{
    if(link.length){
      const isLinkValid = isWebsiteLinkValid(link)
      setValidationError({
        ...validationError,
        linkError: isLinkValid?"":"Enter a Valid Link"
      })
    }else{
      setValidationError({
        ...validationError
      })
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[link])

  // const isValidLink=()=>{
  //   if(!link.length){return setValidationError('Enter Valid')} 
  
  //   return true 
  // }

  const onEditClickHandler=(link)=>{
    setIsEditEnabled(true)
    setSelectedLink(link);
    setLink(link.title);
    SetLinks(links.filter((linkItem) => linkItem.id !== link.id));
  }


  const onSaveChangesClickHandler = () => {
    updateLinkTitleInDatabase(user.uid,selectedlink.id,link)
    SetLinks([{ ...selectedlink, title: link }, ...links]);
    setIsEditEnabled(false);
    setLink("");
    setSelectedLink({});
  };

 const  onCLickLogout =()=>{
  signOutUser().then((data)=>{
    localStorage.removeItem("user")
      navigate("/")
  })
 }
 const onAddClickHandler =()=>{
    // const valid = isValidLink()
  if(link.length&&!validationError.linkError)
  {
   const linkData = {
     id:links.length+1,
     title:link
   }
   SetLinks([linkData,...links])
    addLinkInDatabase(user.uid,linkData)
    setLink(" ")
  }
  }
  const onCancelSaveChanges = () => {
    SetLinks([{ ...selectedlink }, ...links]);
    setIsEditEnabled(false);
    setLink("");
    setSelectedLink({});
  };

 const deleteALink = async(id) => {
  await deleteALinkInFirebase(user.uid, id);
  SetLinks(links.filter((link) => link.id !== id));
};

const focusOnNewLinkInput = () => {
  inputRef.current.focus();
};
  return (
    <div>
      <Card hoverable  style={{width:"100%"}}  >
        <div className='flex' style={{justifyContent:"space-between",alignItems:"center"}}>
        <h1 className='montserratBold' style={{margin:"0px",padding:"0px"}}>Bookmark App</h1>
          <div  className='flex' style={{margin:"10px",flexDirection:"column"}} >
            <div>
          <Input style={{width:"50vh",height:"35px"}}
          ref={inputRef}
          status={ 
            validationError.linkError && validationError.linkError.length
              ? "error"
              : " "
          }
          value={link} onChange={(e)=>setLink(e.target.value)}/>
           <Button type='primary' style={{marginLeft:"10px"}}onClick={()=>onAddClickHandler()}>Add</Button>
     
     {
       isEditEnabled?<Button type='primary' 
       style={{marginLeft:"10px"}}onClick={()=>onSaveChangesClickHandler()}>Save Changes</Button>:null
     }
     {
       isEditEnabled && !validationError.linkError ?<Button type='primary' style={{marginLeft:"10px"}} onClick={onCancelSaveChanges}>cancel</Button>:null
     }
          </div>

             <h4 className="errorText" style={{margin:0 , padding:0}}>
                {validationError.linkError &&
                validationError.linkError.length ? (
                  <p>{validationError.linkError}</p>
                ):null }
                </h4>


       
        </div>
        {/* <Button type='primary' onClick={()=>{setShowProfile(prevState=>!prevState);console.log(showprofile)}}>Show Profile</Button>   */}
      <Profile name={user} onCLickLogout={onCLickLogout}/>
      </div>
    </Card>
                    
          {isLoading?<Loader/>:links.length?links.map((data)=>{
      return <TaskCard data={data}
      deleteALink={deleteALink}
      onEditClickHandler={onEditClickHandler}
      onSaveChangesClickHandler={onSaveChangesClickHandler}
      />
      } ):(
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <p>
              No Link added yet!{" "}
              <a onClick={focusOnNewLinkInput}> add now</a>
            </p>
          }
        />
      )}
     </div>
  )
}

export default Home
