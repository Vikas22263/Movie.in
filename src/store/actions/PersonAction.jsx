import axios from "../../utils/Axois"
import {loadperson} from "../reducers/personSlice"


export const asyncpersonHandler=(id)=>async(dispatch,getState)=>{
try {
     const detail=await axios.get(`/person/${id}`);
     const externalid=await axios.get(`/person/${id}/external_ids`);
     const combineCredit=await axios.get(`/person/${id}/combined_credits`);
     const tvCredits=await axios.get(`/person/${id}/tv_credits`);
     const movieCredits=await axios.get(`/person/${id}/movie_credits`);
  
     const ultimateData={
        detail:detail.data,
        externalid:externalid.data,
        combineCredit:combineCredit.data,
        tvCredits:tvCredits.data,
        movieCredits:movieCredits.data
     

     }
 
     dispatch(loadperson(ultimateData))
} catch (error) {
    console.log(error);
}
}