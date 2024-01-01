import axios from 'axios'
const URL = "http://localhost:5000/api/v1/"





export async function getData () {
  try {
    const value = await localStorage.getItem('@storage_Key')
    if (value !== null) {
      console.log(value)
      return value
    }
  } catch (e) {
    console.log(e, "errpr")
  }
}

export async function LoginToAccount(email,password){
  try {
    const response = await axios.post(URL+"auth/login",{
      email:email,
      password:password
    })
    await localStorage.setItem('@storage_Key', response.data.token)
    return response.data
  } catch (error) {
    return error.response.data
  }

}
export async function SignUpToAccount(first_name,last_name,email,password){
  try {
    const response = await axios.post(URL+"auth/register",{
      email:email,
      password:password,
      first_name:first_name,
      last_name:last_name
    })
    return response.data
  } catch (error) {
    return error.response.data
  }

}
export async function ForgetPasswordAccount(email){
  try {
    const response = await axios.post(URL+"auth/recover-password",{
      email:email
    })
    return response.data
  } catch (error) {
    return error.response.data
  }

}
export async function ActivateForgetPasswordAccount(userid){
  try {
    const response = await axios.post(URL+"auth/activate-password-link",{
      userid:userid
    })
    return response.data
  } catch (error) {
    return error.response.data
  }

}
export async function ResetPasswordAccount(userid,password){
  try {
    const response = await axios.put(URL+"auth/reset-password",{
      _id:userid,
      password:password
    })
    return response.data
  } catch (error) {
    return error.response.data
  }

}
export async function GetOTPAccount(email){
  try {
    const response = await axios.post(URL+"auth/get-otp",{
      email:email
    })
    return response.data
  } catch (error) {
    return error.response.data
  }

}
export async function VerifyOTPAccount(email,otp){
  try {
    const response = await axios.post(URL+"auth/activate-account",{
      email:email,
      otp:otp
    })
    return response.data
  } catch (error) {
    return error.response.data
  }

}
export async function GetCategory(){
  try {
    const response = await axios.get(URL+"category/get-category")
    return response.data
  } catch (error) {
    return error.response.data
  }

}
export async function GetRecommended(){
  try {
    const response = await axios.get(URL+"recommend/get-recommendation")
    return response.data
  } catch (error) {
    return error.response.data
  }

}
// jobs
export async function AddJob(userid,title,desc,price,category){
  try {
    const response = await axios.post(URL+"jobs/add-job",{
      userId:userid,
      title:title,
      desc:desc,
      price:price,
      category:category
     
    })
    return response.data
  } catch (error) {
    return error.response.data
  }

}
export async function GetJobs(){
  try {
    const response = await axios.get(URL+"jobs/get-jobs")
    return response.data
  } catch (error) {
    return error.response.data
  }

}
export async function AcceptJob(userid,jobid){
  console.log(userid,jobid,"iddd")
  try {
    const response = await axios.put(URL+"jobs/accept-job",{
      jobholder:userid,
      _id:jobid
     
    })
    return response.data
  } catch (error) {
    return error.response.data
  }

}
export async function CompleteJob(jobid){
  console.log(jobid,"iddd")
  try {
    const response = await axios.put(URL+"jobs/complete-job",{
      _id:jobid
     
    })
    return response.data
  } catch (error) {
    return error.response.data
  }

}

export async function AddReviewOwner(Rating,comment,jobid){
  try {
    const response = await axios.post(URL+"reviews/add-review",{
      JobOwnerComment:comment,
      JobOwnerRating:Rating,
      jobId: jobid

     
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error.response.data)

    return error.response.data
  }

}
export async function AddReviewDoer(Rating,comment,jobid){
  try {
    const response = await axios.post(URL+"reviews/add-review",{
      JobDoerComment:comment,
      JobDoerRating:Rating,
      jobId: jobid

     
    })
    return response.data
  } catch (error) {
    return error.response.data
  }

}

export async function SocialLogin (fname,lname,email){
try{
  const response = await axios.post(URL+"auth/social-login",{
    first_name:fname,
    last_name:lname,
    email: email

   
  })
  await localStorage.setItem('@storage_Key', response.data.token)
  return response.data
} catch (error) {
  return error.response.data
}
}