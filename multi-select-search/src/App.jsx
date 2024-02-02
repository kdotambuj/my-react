import { useEffect, useState, useTransition } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pill from './components/Pill'

function App() {
  const [searchText,setSearchText] = useState('')
  const [suggestedUsers,setSuggestedUsers] = useState([])
  const [selectedUsers,setSelectedUsers] = useState([])
  const [selectedUserSet,setSelectedUserSet] = useState(new Set())


  const fetchUsers = async ()=>{
    const data = await fetch(`https://dummyjson.com/users/search?q=${searchText}`)
    const json = await data.json()

    setSuggestedUsers(json.users)
  }

  useEffect(()=>{fetchUsers()},
  [searchText])

  console.log(selectedUsers);

  const handleSelect= (user)=>{
        setSelectedUsers([...selectedUsers,user])
        setSearchText('')
        setSelectedUserSet(new Set([...selectedUserSet,user.email]))
        setSuggestedUsers([])
  }

  const deletePill = (user)=>{

        setSelectedUsers(selectedUsers.filter((u)=>u.id!==user.id))
        
        const updatedEmails = new Set(selectedUsers)
        updatedEmails.delete(user.email)
        setSelectedUserSet(updatedEmails)

  }

  return (
    
      
      <div className=' flex flex-col items-center  gap-10 relative  '>
        <p className='text-2xl font-semibold '>Multi Select Search </p>

        <div className="search-container items-center flex border-[1px] border-black rounded-full">
             <div className="flex p-2 gap-2 rounded-full ">
                  {selectedUsers.map((user,index)=><Pill key={user.email} color={index%6} text={`${user.firstName} ${user.lastName}`} image={user.image} onClick={()=>{deletePill(user)}} />)}
              </div>
        <input className='outline-none rounded-full  w-[400px] h-[40px]' value={searchText} onChange={(e)=>{setSearchText(e.target.value)}} placeholder='Search'></input>

        </div>
      
        {suggestedUsers.length!==0 && searchText!=='' && (
        <div className='flex flex-col h-[250px] w-[200px] absolute mt-[120px] ml-[12.5rem]  overflow-y-scroll border-[1px] border-black'>
          {
            suggestedUsers?.map((user,index)=>(
              !selectedUserSet.has(user.email)?
              (<div onClick={()=>{handleSelect(user)}} key={user?.email} className='flex px-2 py-1.5 cursor-pointer  hover:bg-gray-300 border-black border-b-[1px] border-r-[1px]'>
                <img className='w-[30px] h-[30px] rounded-full ' src={user?.image} alt="UserImage" />
                <p>{user?.firstName} {user?.lastName}</p>
              </div>):<></>
            ))
          }
        </div>)}
      </div>
       
  )
}

export default App
