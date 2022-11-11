import axios from 'axios';

export const createUser = async ({
   uid,
   firstName,
   lastName,
   email
}) => {
   const result= await axios({
      method:'post',
      url:`${import.meta.env.VITE_API_URL}/api/users`,
      data:{
         uid,
         name:firstName,
         lastName,
         email
      }
   })
   return result.data
}

export const getUserUid = async (uid) => {
   const resultUser= await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${uid}`)
   return resultUser.data
}

