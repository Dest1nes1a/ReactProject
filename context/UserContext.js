import React from "react"

// userStoreContext อารมณ์ 1 Component ที่สร้างไว้ใช้งาน
export const userStoreContext = React.createContext();

const UserStoreProvider = ({children})=>{
    
    const [profile,setProfile] = React.useState(null);
    //กำหนดตัวแปร userStore เพื่อเก็บข้อมูล Profile ทั้งหมด
    const userStore = {
        profile : profile,
        updateProfile : (profile)=> setProfile(profile)
    }

    return(
        <userStoreContext.Provider value = {userStore}>
            {children}
        </userStoreContext.Provider>
    )
} 

export default UserStoreProvider;